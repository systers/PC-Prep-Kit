import { Component, OnInit, Output, EventEmitter, ViewChild, Renderer } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import swal from 'sweetalert2';
import { DashboardService } from '../services/dashboard.service';
import 'webrtc-adapter';
import { webcamEnum } from './webcamEnum';
import { SharedDataService } from '../services/shared.data.service';

@Component({
    selector: 'app-activity3',
    templateUrl: './picture-puzzle.component.html',
    styleUrls: ['./introduction.component.scss']
})
export class PicturePuzzleComponent implements OnInit {

    // "#video" is the name of the template variable in the video element
    @ViewChild('video') video: any;

    private PUZZLE_DIFFICULTY = 4;
    private PUZZLE_HOVER_TINT = '#009900';

    private _canvas;
    private _stage;
    private _img;
    private _newImg;
    private _pieces;
    private _puzzleWidth;
    private _puzzleHeight;
    private _pieceWidth;
    private _pieceHeight;
    private _currentPiece;
    private _currentDropPiece;
    private _mouse;
    private _video;
    private _mousemoveListener: any;
    private _mouseupListener: any;
    private _mousedownListener: any;
    private _width = 480;
    private _height = 360
    private _status: object;
    private _activity: number;

    public webcamStates = webcamEnum;
    public webcamState: number = this.webcamStates.PAGE_LOAD;
    public loaded = false;
    public imageLoaded = false;
    public imageSrc = '';
    public webcamButtonText = '';
    public webcamStream;
    public puzzleState = 'Start puzzle';
    public activityComplete = false;
    public position: string;
    public filesToUpload: Array<File> = [];

    constructor(private _http: Http, private _dashboardService: DashboardService, private _renderer: Renderer, private _sharedData: SharedDataService) {
        this._sharedData.position.subscribe(
            value => {
                this.position = value;
            }
        );
    }

    openWebcam() {
        this.webcamState = this.webcamStates.OPENED;
        this.webcamButtonText = 'Capture';
        this.imageLoaded = false;
        this._video = this.video.nativeElement;
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                                  .then(stream => {
                                        this._video.src = window.URL.createObjectURL(stream);
                                        this.webcamStream = stream;
                                    })
        }
    }

    snapshot() {
        this.webcamState = this.webcamStates.CAPTURED;
        if (this.webcamStream.stop) {
            this.webcamStream.stop();
        } else {
            this.webcamStream.getTracks().forEach(function(track) { track.stop() })
        }
        this.webcamButtonText = 'Take another photo';
        this._pieceWidth = Math.floor(this._width / this.PUZZLE_DIFFICULTY)
        this._pieceHeight = Math.floor(this._height / this.PUZZLE_DIFFICULTY)
        this._puzzleWidth = this._pieceWidth * this.PUZZLE_DIFFICULTY;
        this._puzzleHeight = this._pieceHeight * this.PUZZLE_DIFFICULTY;
        this.setCanvas();
        this._stage.drawImage(this._video, 0, 0, this._width, this._height);
        this.activityComplete = true;
    }

    ngOnInit() {
        this.webcamButtonText = 'Take Photo';
        this.checkProgress();
    }

    upload() {
        const formData: any = new FormData();
        const files: Array<File> = this.filesToUpload;
        if (this.webcamState === this.webcamStates.CAPTURED) {
            const camData = {base64: this._canvas.toDataURL('image/jpeg')}
            this._http.post('http://localhost:3000/api/uploadCam', camData)
                .map(files => camData)
                .subscribe(files => {
                    swal(
                        'Success!',
                        'Profile picture updated successfully!',
                        'success'
                    );
                 });
        } else {
            formData.append('uploads[]', files, 'profile_picture');
            this._http.post('http://localhost:3000/api/upload', formData)
                .map(files => files.json())
                .subscribe(files => {
                    swal(
                        'Success!',
                        'Profile picture updated successfully!',
                        'success'
                    );
                });
        }
    }

    fireFileButtonClick() {
        if (this.webcamStream) {
            if (this.webcamStream.stop) {
                this.webcamStream.stop();
            } else {
                this.webcamStream.getTracks().forEach(function(track) {track.stop()})
            }
        }
        this.webcamState = this.webcamStates.PAGE_LOAD;
        this.webcamButtonText = 'Take Photo';
        const file = document.getElementById('file').click();
    }

    handleInputChange(e) {
        const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
        const pattern = /image-*/;
        const reader = new FileReader();

        if (!file.type.match(pattern)) {
            alert('invalid format');
            return;
        }

        this.filesToUpload = <Array<File>>file;
        this.loaded = false;
        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsDataURL(file);
    }

    _handleReaderLoaded(e) {
        const reader = e.target;
        this.imageSrc = reader.result;
        this.loaded = true;
        this._img = new Image();
        this._img.src = this.imageSrc;
        this.imageLoaded = true;
        this._renderer.listen(this._img, 'load', (event) => this.onImage(event));
    }

    onImage(e) {
        this._pieceWidth = Math.floor(this._width / this.PUZZLE_DIFFICULTY)
        this._pieceHeight = Math.floor(this._height / this.PUZZLE_DIFFICULTY)
        this._puzzleWidth = this._pieceWidth * this.PUZZLE_DIFFICULTY;
        this._puzzleHeight = this._pieceHeight * this.PUZZLE_DIFFICULTY;
        this.setCanvas();
        this.initPuzzle();
    }

    setCanvas() {
        this._canvas = document.getElementById('canvas');
        this._stage = this._canvas.getContext('2d');
        this._canvas.width = this._puzzleWidth;
        this._canvas.height = this._puzzleHeight;
        this._canvas.style.border = '1px solid black';
    }

    initPuzzle() {
        this._pieces = [];
        this._mouse = {x: 0, y: 0};
        this._currentPiece = null;
        this._currentDropPiece = null;
        this._stage.drawImage(this._img, 0, 0, this._width, this._height);
        this._newImg = new Image();
        this._newImg.src = this._canvas.toDataURL('image/png');
        this._renderer.listen(this._newImg, 'load', (event) => this.buildPieces(event));
    }

    buildPieces(e) {
        let i;
        let piece;
        let xPos = 0;
        let yPos = 0;
        for (i = 0; i < this.PUZZLE_DIFFICULTY * this.PUZZLE_DIFFICULTY; i++) {
            piece = {};
            piece.sx = xPos;
            piece.sy = yPos;
            this._pieces.push(piece);
            xPos += this._pieceWidth;
            if (xPos >= this._puzzleWidth) {
                xPos = 0;
                yPos += this._pieceHeight;
            }
        }
    }

    shufflePuzzle() {
        let i;
        let piece;
        let xPos = 0;
        let yPos = 0;
        this.puzzleState = 'Shuffle';
        this._pieces = this.shuffleArray(this._pieces);
        this._stage.clearRect(0, 0, this._puzzleWidth, this._puzzleHeight);
        for (i = 0;  i < this._pieces.length; i++) {
            piece = this._pieces[i];
            piece.xPos = xPos;
            piece.yPos = yPos;
            this._stage.drawImage(this._newImg, piece.sx, piece.sy, this._pieceWidth, this._pieceHeight, xPos, yPos, this._pieceWidth, this._pieceHeight);
            this._stage.strokeRect(xPos, yPos, this._pieceWidth, this._pieceHeight);
            xPos += this._pieceWidth;
            if (xPos >= this._puzzleWidth) {
                xPos = 0;
                yPos += this._pieceHeight;
            }
        }
        this._mousedownListener = this._renderer.listen(this._canvas, 'mousedown', (event) => this.onPuzzleClick(event));
    }

    shuffleArray(array) {
        let currentIndex = array.length, temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    onPuzzleClick(e) {
        if (e.layerX || e.layerX === 0) {
            this._mouse.x = e.layerX - this._canvas.offsetLeft;
            this._mouse.y = e.layerY - this._canvas.offsetTop;
        } else if (e.offsetX || e.offsetX === 0) {
            this._mouse.x = e.offsetX - this._canvas.offsetLeft;
            this._mouse.y = e.offsetY - this._canvas.offsetTop;
        }
        this._currentPiece = this.checkPieceClicked();
        if (this._currentPiece != null) {
            this._stage.clearRect(this._currentPiece.xPos, this._currentPiece.yPos, this._pieceWidth, this._pieceHeight);
            this._stage.save();
            this._stage.globalAlpha = .9;
            this._stage.drawImage(this._newImg, this._currentPiece.sx, this._currentPiece.sy, this._pieceWidth, this._pieceHeight, this._mouse.x - (this._pieceWidth / 2), this._mouse.y - (this._pieceHeight / 2), this._pieceWidth, this._pieceHeight);
            this._stage.restore();
            this._mousemoveListener = this._renderer.listen(this._canvas, 'mousemove', (event) => this.updatePuzzle(event));
            this._mouseupListener = this._renderer.listen(this._canvas, 'mouseup', (event) => this.pieceDropped(event));
        }
    }

    checkPieceClicked() {
        let i, piece;
        for (i = 0; i < this._pieces.length; i++) {
            piece = this._pieces[i];
            if (this._mouse.x < piece.xPos || this._mouse.x > (piece.xPos + this._pieceWidth) || this._mouse.y < piece.yPos || this._mouse.y > (piece.yPos + this._pieceHeight)) {
                // Piece not at the right place
            } else {
                return piece;
            }
        }
        return null;
    }

    updatePuzzle(e) {
        this._currentDropPiece = null;
        if (e.layerX || e.layerX === 0) {
            this._mouse.x = e.layerX - this._canvas.offsetLeft;
            this._mouse.y = e.layerY - this._canvas.offsetTop;
        } else if (e.offsetX || e.offsetX === 0) {
            this._mouse.x = e.offsetX - this._canvas.offsetLeft;
            this._mouse.y = e.offsetY - this._canvas.offsetTop;
        }
        this._stage.clearRect(0, 0, this._puzzleWidth, this._puzzleHeight);
        let i, piece;
        for (i = 0; i < this._pieces.length; i++) {
            piece = this._pieces[i];
            if (piece === this._currentPiece) {
                continue;
            }
            this._stage.drawImage(this._newImg, piece.sx, piece.sy, this._pieceWidth, this._pieceHeight, piece.xPos, piece.yPos, this._pieceWidth, this._pieceHeight);
            this._stage.strokeRect(piece.xPos, piece.yPos, this._pieceWidth, this._pieceHeight);
            if (this._currentDropPiece == null) {
                if (this._mouse.x < piece.xPos || this._mouse.x > (piece.xPos + this._pieceWidth) || this._mouse.y < piece.yPos || this._mouse.y > (piece.yPos + this._pieceHeight)) {
                    // Game not over
                } else {
                    this._currentDropPiece = piece;
                    this._stage.save();
                    this._stage.globalAlpha = .4;
                    this._stage.fillStyle = this.PUZZLE_HOVER_TINT;
                    this._stage.fillRect(this._currentDropPiece.xPos, this._currentDropPiece.yPos, this._pieceWidth, this._pieceHeight);
                    this._stage.restore();
                }
            }
        }
        this._stage.save();
        this._stage.globalAlpha = .6;
        this._stage.drawImage(this._newImg, this._currentPiece.sx, this._currentPiece.sy, this._pieceWidth, this._pieceHeight, this._mouse.x - (this._pieceWidth / 2), this._mouse.y - (this._pieceHeight / 2), this._pieceWidth, this._pieceHeight);
        this._stage.restore();
        this._stage.strokeRect( this._mouse.x - (this._pieceWidth / 2), this._mouse.y - (this._pieceHeight / 2), this._pieceWidth, this._pieceHeight);
    }

    pieceDropped(e) {
        this._mousemoveListener();
        this._mouseupListener();
        if (this._currentDropPiece != null) {
            const tmp = {xPos: this._currentPiece.xPos, yPos: this._currentPiece.yPos};
            this._currentPiece.xPos = this._currentDropPiece.xPos;
            this._currentPiece.yPos = this._currentDropPiece.yPos;
            this._currentDropPiece.xPos = tmp.xPos;
            this._currentDropPiece.yPos = tmp.yPos;
        }
        this.resetPuzzleAndCheckWin();
    }

    resetPuzzleAndCheckWin() {
        this._stage.clearRect(0, 0, this._puzzleWidth, this._puzzleHeight);
        let gameWin = true;
        let i, piece;
        for (i = 0; i < this._pieces.length; i++) {
            piece = this._pieces[i];
            this._stage.drawImage(this._newImg, piece.sx, piece.sy, this._pieceWidth, this._pieceHeight, piece.xPos, piece.yPos, this._pieceWidth, this._pieceHeight);
            this._stage.strokeRect(piece.xPos, piece.yPos, this._pieceWidth, this._pieceHeight);
            if (piece.xPos !== piece.sx || piece.yPos !== piece.sy) {
                gameWin = false;
            }
        }
        if (gameWin) {
            this.gameOver();
        }
    }

    gameOver() {
        this._dashboardService.updateProgressStatus(this._status).subscribe(response => {});
        swal(
            'Good job!',
            'You completed this activity!',
            'success'
        );
        this._mousedownListener();
        this._mousemoveListener();
        this._mouseupListener();
        this.initPuzzle();
        this.activityComplete = true;
    }

    /**
     * Check progress of user (If the user has already completed the activity or not)
     */
    checkProgress() {
        this._dashboardService.getProgressStatus().subscribe(response => {
            this._activity = response.activity;
            this._stage = response.stage;
            if (this._stage >= 1 && this._activity >= 3) {
                this.activityComplete = true;
            }
        });
    }
}
