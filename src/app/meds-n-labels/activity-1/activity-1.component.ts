import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Coordinates } from './coordinate-structure';
import { MatchingInfo } from './matching.info';
import { DashboardService } from '../../services/dashboard.service';
import { SharedDataService } from '../../services/shared.data.service';
import { LanguageService } from '../../services/language.service';
import { InfokitService } from '../../services/infokit.service';
import { PerformanceDisplayService } from '../../services/performance-display.service';
import { ActivatedRoute } from '@angular/router';
import { LeaderBoardService } from '../../services/leaderBoard.service';

@Component({
    selector: 'app-matchmeds',
    templateUrl: './activity-1.component.html',
    styleUrls: ['./activity-1.component.scss']
})


export class MatchmedsComponent implements OnInit {
    // HTML Element for DOM Manipulations
    @ViewChild('canv') canv;
    canvasElement: HTMLCanvasElement;
    cx: CanvasRenderingContext2D;
    canvasTop: number;
    canvasLeft: number;

    height = 600;
    width = 75;
    windowWidth = window.innerWidth;
    completed = false;
    activityComplete = false;
    private _status: object = {stage: 3, activity: 1};
    public alerts: any;
    language: any;
    headingBase = '';
    headingLevel = '';

    // Number of Elements for Matching
    numElements = MatchingInfo.numElements;
    medicines = MatchingInfo.medicines;

    display: Array<string>;
    // Counter for Keeping track of Element number
    count = 0 ;
    // Start and End Points of a Line
    start: Coordinates[] = [];
    end: Coordinates[] = [];
    // Temporaty Start and End Points to Handle Incomplete Drwaings
    tempStart: Coordinates = {x: 0, y: 0};
    tempEnd: Coordinates = {x: 0, y: 0};
    // A flag to check if mouse is clicked through out the drawing
    clicked = false;

    // Canvas Position Information
    private readonly RADIUS = 10;
    private readonly DIAMETER = this.RADIUS * 2;
    private readonly LINE_WIDTH = 5;
    private readonly SPACING = this.RADIUS;
    private readonly GAP = 7 * (this.RADIUS + this.SPACING);

    private readonly OFFSET = 0;
    startPos = this.OFFSET + this.LINE_WIDTH;
    endPos: number;

    correctAns: Array<number>;
    givenAns = new Array(this.numElements).fill(0);

    private level: string;
    private levelNumber: number;
    private readonly LEVELS = ['level1', 'level2'];
    readonly CURR_STAGE = 6;
    readonly ACTIVITY = 'matchMeds';

    private readonly COLOR_ORANGE = '#DC5034';
    private readonly COLOR_BLUE = '#466bc1';




    constructor(private _langService: LanguageService,  private _dashboardService: DashboardService, private _sharedData: SharedDataService, vcr: ViewContainerRef, private _infokitService: InfokitService,
                private _performanceService: PerformanceDisplayService, private _leaderBoardService: LeaderBoardService, private _route: ActivatedRoute) {}

    ngOnInit() {
        this._dashboardService.getProgressStatus().subscribe(response => {
            this.completed = this._sharedData.checkProgress(3, 1, response);
        });

        this._route.params.subscribe( params => {
          this.level = this.LEVELS[ params.level - 1];
          this.levelNumber =  parseInt(params.level, 10);
          this.display = MatchingInfo[this.level];
          this.correctAns = MatchingInfo.ans[this.level];
          this.shuffleArrays([this.correctAns, this.medicines]);
        });

        this._langService.loadLanguage().subscribe(response => {
            this.language = response.pcprepkit.stages.medsNLabels.matchMeds;
            this.headingBase = this.language.headingBase;
            this.headingLevel = this.language.headingsLevel[this.level];
            this.alerts = response.pcprepkit.common.alerts;
        });

        this._dashboardService.getProgressStatus().subscribe(response => {
            this.completed = this._sharedData.checkProgress(3, 1, response);
        });

        this._langService.loadLanguage().subscribe(response => {
            this.alerts = response.pcprepkit.common.alerts;
        });

        /**
        * Check Window Size and Change Width
        */
        this.checkWindowSize(this.windowWidth);
        this.endPos = this.width - this.RADIUS - this.LINE_WIDTH;

        /**
        * Initializing Start and End Coordinates to origin.
        */
        for (let i = 0; i < this.numElements; i++) {
            this.start.push({x: 0, y: 0});
            this.end.push({x: 0, y: 0});
        }

        /**
        * Canvas Element and Line Style
        */
        this.canvasElement =  this.canv.nativeElement;
        this.cx = this.canvasElement.getContext('2d');
        this.canvasElement.height = this.height;
        this.canvasElement.width = this.width;

        // Getting Canvas Info
        this.updateCanvasCord();

        // Painting the canvas with Elements
        this.paintCanvasElements();
    }

    /**
     * Draws the Elemets on the Canvas
     */
    paintCanvasElements() {
        for (let i = 0; i < this.numElements; i++) {
            const spacing = this.GAP * i;
            this.setLineStyle(this.COLOR_BLUE, this.LINE_WIDTH);
            this.cx.beginPath();
            this.cx.arc(this.startPos + this.RADIUS, spacing + this.RADIUS + this.LINE_WIDTH, this.RADIUS, 0, 2 * Math.PI);
            this.cx.stroke();
            this.cx.beginPath();
            this.cx.arc(this.endPos , spacing + this.RADIUS + this.LINE_WIDTH, this.RADIUS, 0, 2 * Math.PI);
            this.cx.stroke();
        }
    }

    /**
     * Set the Canvas Lines Style
     * @param  {string} color   Color of the line
     * @param  {number} lineWid Width of the line
     */
    setLineStyle(color, lineWid) {
        this.cx.lineCap = 'round';
        this.cx.strokeStyle = color;
        this.cx.lineWidth = lineWid;
    }

    /**
     * Checks the Size of the window and changes the size of the Canvas
     * @param  {number} wid Width of the screen
     */
    checkWindowSize(wid) {
        /**
        * Default 75
        * >400 - 100
        * >768 - 200
        * >992 - 250
        */
        if (wid > 400 && wid < 768) {
            this.width = 100;
        } else if (wid >= 768 && wid < 992) {
            this.width = 200;
        } else if (wid > 992) {
            this.width = 250;
        }
    }

    /**
     * Gets the Top and Left coordiantes of the Canvas
     */
    updateCanvasCord() {
        this.canvasTop = this.canvasElement.getBoundingClientRect().top;
        this.canvasLeft = this.canvasElement.getBoundingClientRect().left;
    }

    /**
     * The Event gets called when the scren size changes
     * @param  {number} $event Contains screen size information
     */
    onResize($event) {
        this.updateCanvasCord();
        this.checkWindowSize($event.target.innerWidth);
        this.canvasElement.width = this.width;
        this.endPos = this.width - this.RADIUS - this.LINE_WIDTH;
        this.redrawCanvas();
    }

    /**
     * Event gets called when mouse is moved out of the canvasElement, changes clicked variable to false to prevent drawing.
     */
    mouseLeave() {
        this.clicked = false;
    }

    /**
     * Event gets called when mouse is clicked, Starts the mouse drawing.
     * @param  {number} $event Mouse Coordinates
     */
    mouseClick($event) {
        this.setLineStyle(this.COLOR_ORANGE, 10);
        this.cx.beginPath();
        this.tempStart.x = $event.clientX - this.canvasLeft;
        this.tempStart.y = $event.clientY - this.canvasTop;
        this.cx.moveTo(this.tempStart.x, this.tempStart.y);
        this.clicked = true;
    }

    /**
     * Event gets called when mouse is moved, traces mouse path if mouse is clicked,
     * @param  {number} $event Mouse Coordinates
     */
    mousePos($event) {
        if (!this.clicked) {
            return;
        }
        const x1 = $event.clientX - this.canvasLeft;
        const y1 = $event.clientY - this.canvasTop;
        this.cx.lineTo(x1, y1);
        this.cx.stroke();
    }

    /**
     * Event gets called when mouse is Released, Completes the drawing and checks if valid
     * @param  {number} $event Mouse Coordinates
     */
    mouseRelease($event) {
        this.tempEnd.x = $event.clientX - this.canvasLeft;
        this.tempEnd.y = $event.clientY - this.canvasTop;
        this.cx.lineTo(this.tempEnd.x, this.tempEnd.y);
        this.cx.stroke();
        this.clicked = false;
        this.checkStartAndEnd();
    }

    /**
     * Redraws the Canvas
     */
    redrawCanvas() {
        this.cx.clearRect(0, 0, this.width, this.height);

        this.paintCanvasElements();

        for (let i = 0; i < this.count; i ++) {
            this.cx.beginPath();
            this.setLineStyle(this.COLOR_ORANGE, 10);
            this.cx.moveTo(this.start[i].x, this.start[i].y);
            this.cx.lineTo(this.end[i].x, this.end[i].y);
            this.cx.stroke();
        }
    }

    /**
     * Checks If drawing completes on valid start and end points, checks for right matching
     */

    checkStartAndEnd() {
        if (this.count < this.numElements) {
            let startValid = false;
            let endValid = false;
            let left = 0;

            for (let i = 0; i < this.numElements; i++) {
                const spacing = this.GAP * i;
                if (this.tempStart.x > this.startPos && this.tempStart.x < this.startPos + this.DIAMETER
                  && this.tempStart.y < (this.DIAMETER + spacing) && this.tempStart.y > spacing) {
                    left = i;
                    startValid = true;
                    break;
                }
            }

            for (let i = 0; i < this.numElements; i++) {
                const spacing = this.GAP * i;
                if (this.tempEnd.x > this.endPos - this.RADIUS && this.tempEnd.x < this.endPos + this.DIAMETER
                  && this.tempEnd.y < (this.DIAMETER + spacing) && this.tempEnd.y > spacing) {
                    this.givenAns[left] = i + 1;
                    endValid = true;
                    break;
                }
            }

            if (startValid && endValid) {
                this.start[this.count].x = this.tempStart.x;
                this.start[this.count].y = this.tempStart.y;
                this.end[this.count].x = this.tempEnd.x;
                this.end[this.count].y = this.tempEnd.y;
                this.count++;
                if (this.count === this.numElements) {
                    if (this.isEqual()) {
                        this._sharedData.customSuccessAlert(this.alerts.activitySuccessMsg, this.alerts.activitySuccessTitle);
                            this.completed = true;
                            this.activityComplete = true;
                            if (!this.completed) {
                              if (this.levelNumber === 1) {
                                this._performanceService.openDialog(this.CURR_STAGE);
                              }
                            }
                      this._dashboardService.updateProgressStatus(this._status).subscribe(response => {});
                      this._infokitService.activateinfokit('match_meds').subscribe(res => {});
                      this._leaderBoardService.updateLeaderBoard({activity: this.ACTIVITY, level: this.level});
                      this._dashboardService.updateActivityLevel({activity: this.ACTIVITY, level: this.level}).subscribe(() => {});
                    } else {
                        this.redrawCanvas();
                        this._sharedData.customErrorAlert(this.alerts.activityFailMsg, this.alerts.activityFailTitle);
                    }
                }
            }
        }
        this.redrawCanvas();
    }

    /**
     * Checks if the Matchings are Correct
     * @return {boolean} If correct return true else return false
     */
    isEqual() {
        for (let i = 0; i < this.numElements; i++) {
            if (this.correctAns[i] !== this.givenAns[i]) {
                return false;
            }
        }
        return true;
    }

    /**
     * Reset the canvas, Called when reset button clicked
     */
    reset() {
        this.count = 0;
        this.redrawCanvas();
    }

    shuffleArrays(arrays: Array<Array<any>>) {
      let currentIndex = arrays[0].length;
      let temp, randomIndex;
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        for (let i = 0; i < arrays.length; i++) {
          temp = arrays[i][currentIndex];
          arrays[i][currentIndex] = arrays[i][randomIndex];
          arrays[i][randomIndex] = temp;
        }
      }
    }
}
