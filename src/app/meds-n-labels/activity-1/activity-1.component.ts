import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Coordinates } from './coordinate-structure';
import { MatchingInfo } from './matching.info';
import { DashboardService } from '../../services/dashboard.service';
import { SharedDataService } from '../../services/shared.data.service';
import { LanguageService } from '../../services/language.service';
import { InfokitService } from '../../services/infokit.service';
import { PerformanceDisplayService } from '../../services/performance-display.service';
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

    height = 320;
    width = 75;
    windowWidth = window.innerWidth;
    completed = false;
    activityComplete = false;
    private _status: object = {stage: 3, activity: 1};
    public alerts: any;
    language: any;
    headingBase = '';
    headingInfo = '';
    firstComplete = false;

    // Number of Elements for Matching
    numElements = MatchingInfo.numElements;
    medicines = MatchingInfo.medicines;

    display = MatchingInfo.medicinesideeffects;
    // Counter for Keeping track of Element number
    count = 0 ;
    matchingComplete = 0;
    // Start and End Points of a Line
    start: Coordinates[] = [];
    end: Coordinates[] = [];
    // Temporaty Start and End Points to Handle Incomplete Drwaings
    tempStart: Coordinates = {x: 0, y: 0};
    tempEnd: Coordinates = {x: 0, y: 0};
    // A flag to check if mouse is clicked through out the drawing
    clicked = false;

    // Canvas Position Information
    radius = 10;
    diameter = this.radius * 2;
    lineWidth = 5;
    spacing = this.radius;
    gap = 7 * (this.radius + this.spacing);

    offset = 0;
    startPos = this.offset + this.lineWidth;
    endPos: number;

    correctAns = MatchingInfo.match1ans;
    givenAns = [0, 0, 0];
    readonly CURR_STAGE = 6;
    readonly ACTIVITY = 'matchMeds';


    constructor(private _langService: LanguageService,  private _dashboardService: DashboardService, private _sharedData: SharedDataService, vcr: ViewContainerRef, private _infokitService: InfokitService,
                private _performanceService: PerformanceDisplayService, private _leaderBoardService: LeaderBoardService) {}

    ngOnInit() {
        this._dashboardService.getProgressStatus().subscribe(response => {
            this.completed = this._sharedData.checkProgress(3, 1, response);
        });

        this._langService.loadLanguage().subscribe(response => {
            this.language = response.pcprepkit.stages.medsNLabels.matchMeds;
            this.headingBase = this.language.headingBase;
            this.headingInfo = this.language.headingSideeffects;
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
        this.endPos = this.width - this.radius - this.lineWidth;

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
            const spacing = this.gap * i;
            this.setLineStyle('#466bc1', this.lineWidth);
            this.cx.beginPath();
            this.cx.arc(this.startPos + this.radius, spacing + this.radius + this.lineWidth, this.radius, 0, 2 * Math.PI);
            this.cx.stroke();
            this.cx.beginPath();
            this.cx.arc(this.endPos , spacing + this.radius + this.lineWidth, this.radius, 0, 2 * Math.PI);
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
        this.endPos = this.width - this.radius - this.lineWidth;
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
        this.setLineStyle('#9932cc', 10);
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
            this.setLineStyle('#9932cc', 10);
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
                const spacing = this.gap * i;
                if (this.tempStart.x > this.startPos && this.tempStart.x < this.startPos + this.diameter
                  && this.tempStart.y < (this.diameter + spacing) && this.tempStart.y > spacing) {
                    left = i;
                    startValid = true;
                    break;
                }
            }

            for (let i = 0; i < this.numElements; i++) {
                const spacing = this.gap * i;
                if (this.tempEnd.x > this.endPos - this.radius && this.tempEnd.x < this.endPos + this.diameter
                  && this.tempEnd.y < (this.diameter + spacing) && this.tempEnd.y > spacing) {
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
                        if (this.matchingComplete === 0) {
                            this.firstComplete = true;
                        } else {
                            this.completed = true;
                            this.activityComplete = true;
                          if (!this.completed) {
                            this._performanceService.openDialog(this.CURR_STAGE);
                          }
                              this._dashboardService.updateProgressStatus(this._status).subscribe(response => {});
                              this._infokitService.activateinfokit('match_meds').subscribe(res => {});
                              this._leaderBoardService.updateLeaderBoard({activity: this.ACTIVITY, level: 'level1'});
                    }
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

    /**
     * switches from side effects to description
     */
    submit() {
        this.firstComplete = false;
        this.matchingComplete++;
        this.count = 0;
        this.redrawCanvas();
        this.headingInfo = this.language.headingDescription;
        this.correctAns = MatchingInfo.match2ans;
        this.display = MatchingInfo.medicineDescriptions;
    }
}
