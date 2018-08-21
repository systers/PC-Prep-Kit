import { Component, OnInit, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { DashboardService } from '../../services/dashboard.service';
import 'webrtc-adapter';
import { webcamEnum } from './webcamEnum';
import { SharedDataService } from '../../services/shared.data.service';
import { LanguageService } from '../../services/language.service';
import { BadgeService } from '../../services/BadgeService/badge.service';
import { PerformanceDisplayService } from '../../services/performance-display.service';
import { ActivatedRoute } from '@angular/router';
import { LeaderBoardService } from '../../services/leaderBoard.service';

@Component({
    selector: 'app-activity3',
    templateUrl: './activity-3.component.html',
    styleUrls: ['../introduction.component.scss']
})
export class PicturePuzzleComponent implements OnInit {

    // "#video" is the name of the template variable in the video element
    @ViewChild('video') video: any;

    private puzzleDifficulty: number;
    private readonly DIFFICULTY_LIST = [4, 6, 8];
    private readonly LEVELS = ['level1', 'level2', 'level3'];
    private level: number;
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
    private _height = 360;
    private _status: object = {stage: 1, activity: 3};

    public webcamStates = webcamEnum;
    public webcamState: number;
    public loaded = false;
    public imageLoaded = false;
    public imageSrc = '';
    public webcamButtonText = '';
    public webcamStream;
    public puzzleState = 'Start puzzle';
    public activityComplete = false;
    public filesToUpload: Array<File> = [];
    public language: any;
    public completed = false;
    public alerts: any;
    public userData: any;
    public readonly CURR_STAGE = 2;
    private readonly BADGE_NUMBER = 1;
    private readonly ACTIVITY = 'picturePuzzle';


    constructor(private _langService: LanguageService, private _http: HttpClient, private _dashboardService: DashboardService, vcr: ViewContainerRef, private _renderer: Renderer2,
                private _sharedData: SharedDataService, private _performanceService: PerformanceDisplayService, private _badgeService: BadgeService, private _leaderBoardService: LeaderBoardService,
                private _route: ActivatedRoute) {
    }

    changeWebcamState(state, btnText) {
        this.webcamState = state;
        this.webcamButtonText = btnText;
    }

    openWebcam() {
        this.changeWebcamState(this.webcamStates.OPENED, this.language.messages.capture);
        this.imageLoaded = false;
        this._video = this.video.nativeElement;
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                                  .then(stream => {
                                        this._video.src = stream;
                                        this.webcamStream = stream;
                                    })
        }
    }

    snapshot() {
        if (this.webcamStream.stop) {
            this.webcamStream.stop();
        } else {
            this.webcamStream.getTracks().forEach(function(track) { track.stop() })
        }
        this.changeWebcamState(this.webcamStates.CAPTURED, this.language.messages.afterCapture);
        this.onImage();
    }

    ngOnInit() {
        this._dashboardService.getUserInfo().subscribe(response => {
            this.userData = btoa(response.user.email) + '.jpeg';
        });
        this._langService.loadLanguage().subscribe(response => {
            this.language = response.pcprepkit.stages.introduction.picturePuzzle;
            this.alerts = response.pcprepkit.common.alerts;
            this.changeWebcamState(this.webcamStates.PAGE_LOAD, this.language.messages.takePhoto);
        });
        this._dashboardService.getProgressStatus().subscribe(response => {
            this.completed = this._sharedData.checkProgress(1, 3, response);
        });
        this._route.params.subscribe( params => {
          this.puzzleDifficulty = this.DIFFICULTY_LIST[ params.level - 1];
          this.level =  parseInt(params.level, 10);
        })
    }

    upload() {
        if (this.webcamState === this.webcamStates.CAPTURED) {
            const camData = {base64: this._canvas.toDataURL('image/jpeg')}
            this._dashboardService.uploadCamPic(camData).subscribe(response => {
                this._sharedData.customSuccessAlert(this.alerts.activitySuccessMsg, this.alerts.activitySuccessTitle);
            });
        } else {
            const formData: any = new FormData();
            const files: Array<File> = this.filesToUpload;
            formData.append('uploads[]', files, this.userData);
            this._dashboardService.uploadPic(formData).subscribe(response => {
                this._sharedData.customSuccessAlert(this.alerts.activitySuccessMsg, this.alerts.activitySuccessTitle);
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
        this.changeWebcamState(this.webcamStates.PAGE_LOAD, this.language.messages.takePhoto);
        document.getElementById('file').click();
    }

    handleInputChange(e) {
        const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
        const pattern = /image-*/;
        const reader = new FileReader();

        if (!file.type.match(pattern)) {
            this._sharedData.customErrorAlert(this.alerts.activityFailMsg, this.alerts.activityFailTitle);
            return;
        }

        this.filesToUpload = <Array<File>> file;
        this.loaded = false;
        reader.onload = this.handleReaderLoaded.bind(this);
        reader.readAsDataURL(file);
    }

    handleReaderLoaded(e) {
        const reader = e.target;
        this.imageSrc = reader.result;
        this.loaded = true;
        this._img = new Image();
        this._img.src = this.imageSrc;
        this.imageLoaded = true;
        this._renderer.listen(this._img, 'load', (event) => this.onImage());
    }

    onImage() {
        this._pieceWidth = Math.floor(this._width / this.puzzleDifficulty)
        this._pieceHeight = Math.floor(this._height / this.puzzleDifficulty)
        this._puzzleWidth = this._pieceWidth * this.puzzleDifficulty;
        this._puzzleHeight = this._pieceHeight * this.puzzleDifficulty;
        this.setCanvas();
        if (this.webcamState === this.webcamStates.CAPTURED) {
            this._stage.drawImage(this._video, 0, 0, this._width, this._height);
        } else {
            this.initPuzzle();
        }
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
        this._newImg.src = this._canvas.toDataURL('image/jpeg');
        this._renderer.listen(this._newImg, 'load', (event) => this.buildPieces());
    }

    buildPieces() {
        let i;
        let piece;
        let posn = {x: 0, y: 0};
        for (i = 0; i < this.puzzleDifficulty * this.puzzleDifficulty; i++) {
            piece = {};
            piece.sx = posn.x;
            piece.sy = posn.y;
            this._pieces.push(piece);
            posn = this.getPiecePosition(posn);
        }
    }

    shufflePuzzle() {
        let i;
        let piece;
        let posn = {x: 0, y: 0};
        this.puzzleState = this.language.messages.shuffle;
        this._pieces = this.shuffleArray(this._pieces);
        this._stage.clearRect(0, 0, this._puzzleWidth, this._puzzleHeight);
        for (i = 0;  i < this._pieces.length; i++) {
            piece = this._pieces[i];
            piece.xPos = posn.x;
            piece.yPos = posn.y;
            this._stage.drawImage(this._newImg, piece.sx, piece.sy, this._pieceWidth, this._pieceHeight, posn.x, posn.y, this._pieceWidth, this._pieceHeight);
            this._stage.strokeRect(posn.x, posn.y, this._pieceWidth, this._pieceHeight);
            posn = this.getPiecePosition(posn);
        }
        this._mousedownListener = this._renderer.listen(this._canvas, 'mousedown', (event) => this.onPuzzleClick(event));
    }

    getPiecePosition(posn) {
        posn.x += this._pieceWidth;
        if (posn.x >= this._puzzleWidth) {
            posn.x = 0;
            posn.y += this._pieceHeight;
        }
        return posn;
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

    eventHandler(e) {
        if (e.layerX || e.layerX === 0) {
            this._mouse.x = e.layerX - this._canvas.offsetLeft;
            this._mouse.y = e.layerY - this._canvas.offsetTop;
        } else if (e.offsetX || e.offsetX === 0) {
            this._mouse.x = e.offsetX - this._canvas.offsetLeft;
            this._mouse.y = e.offsetY - this._canvas.offsetTop;
        }
    }

    onPuzzleClick(e) {
        this.eventHandler(e);
        this._currentPiece = this.checkPieceClicked();
        if (this._currentPiece != null) {
            this._stage.clearRect(this._currentPiece.xPos, this._currentPiece.yPos, this._pieceWidth, this._pieceHeight);
            this._stage.save();
            this._stage.globalAlpha = .9;
            let mousePos = {x: 0, y: 0};
            mousePos = this.getMousePosition(mousePos);
            this._stage.drawImage(this._newImg, this._currentPiece.sx, this._currentPiece.sy, this._pieceWidth, this._pieceHeight, mousePos.x, mousePos.y, this._pieceWidth, this._pieceHeight);
            this._stage.restore();
            this._mousemoveListener = this._renderer.listen(this._canvas, 'mousemove', (event) => this.updatePuzzle(event));
            this._mouseupListener = this._renderer.listen(this._canvas, 'mouseup', (event) => this.pieceDropped(event));
        }
    }

    getMousePosition(mousePos) {
        mousePos.x = this._mouse.x - (this._pieceWidth / 2);
        mousePos.y = this._mouse.y - (this._pieceHeight / 2);
        return mousePos;
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
        this.eventHandler(e);
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
        let mousePos = {x: 0, y: 0};
        mousePos = this.getMousePosition(mousePos);
        this._stage.drawImage(this._newImg, this._currentPiece.sx, this._currentPiece.sy, this._pieceWidth, this._pieceHeight, mousePos.x, mousePos.y, this._pieceWidth, this._pieceHeight);
        this._stage.restore();
        this._stage.strokeRect(mousePos.x, mousePos.y, this._pieceWidth, this._pieceHeight);
    }

    pieceDropped(e) {
        this._mousemoveListener();
        this._mouseupListener();
        if (this._currentDropPiece !== null) {
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
        this._sharedData.customSuccessAlert(this.alerts.activitySuccessMsg, this.alerts.activitySuccessTitle);
        this._mousedownListener();
        this._mousemoveListener();
        this._mouseupListener();
        this.initPuzzle();
        this.activityComplete = true;
        if (!this.completed) {
          this._leaderBoardService.updateLeaderBoard({activity: this.ACTIVITY, level: this.LEVELS[this.level - 1]});

          this._dashboardService.updateActivityLevel({activity: this.ACTIVITY, level: this.level}).subscribe(() => {});
          if (this.level === 1) {
            this._performanceService.openDialog(this.CURR_STAGE);
            this._badgeService.updateBadgeNumber(this.BADGE_NUMBER).subscribe(res => res);
          }
    }

        }
    }

