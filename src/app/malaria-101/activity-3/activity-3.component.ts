import { interval as observableInterval } from 'rxjs';

import { tap } from 'rxjs/operators';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { SharedDataService } from '../../services/shared.data.service';
import { LanguageService } from '../../services/language.service';
import { BadgeService } from '../../services/BadgeService/badge.service';
import swal from 'sweetalert2';
import { PerformanceDisplayService } from '../../services/performance-display.service';
import { ActivatedRoute } from '@angular/router';

import { LeaderBoardService } from '../../services/leaderBoard.service';

@Component({
    selector: 'app-oddoneout',
    templateUrl: './activity-3.component.html',
    styleUrls: ['../malaria-101.component.scss']
})
export class OddOneOutComponent implements OnInit {

    private _questionNumber;
    private _questionLock;
    private _obs;
    private _subscription;
    private _data;
    private _status: object = {stage: 2, activity: 3};
    private readonly POINTS_PER_CORRECT_ANSWER = 10;
    public readonly CURR_STAGE = 5;
    private readonly BADGE_NUMBER = 2;
    private readonly ACTIVITY = 'oddOneOut';
    private readonly LEVELS = ['level1', 'level2', 'level3'];



    public activityComplete;
    public questionText;
    public score;
    public opt = [];
    public language: any;
    public completed = false;
    public alerts: any;
    public solutions = '';
    public level: number;
    private readonly LEVEL_CONFIG = [4, 6, 8]; // no of questions depending upon the levelNumber
    public noOfQuestions: number;


  constructor(private _langService: LanguageService, private _dashboardService: DashboardService, private _sharedData: SharedDataService,  vcr: ViewContainerRef,
                private _performanceService: PerformanceDisplayService, private _badgeService: BadgeService, private _route: ActivatedRoute, private _leaderBoardService: LeaderBoardService) {

    }

    /**
     * Initialize the odd one out quiz questions:
     * A set of 5 questions will be used
     */
    ngOnInit() {
        this._langService.loadLanguage().subscribe(response => {
            this.language = response.pcprepkit.stages.malaria101.oddOneOut;
            this.alerts = response.pcprepkit.common.alerts;
        });
        this.score = 0;
        this.solutions = '';
        this.activityComplete = false;
        this._questionNumber = 0;
        this._questionLock = false;
        this.opt = [];
        this._dashboardService.getProgressStatus().subscribe(response => {
            this.completed = this._sharedData.checkProgress(2, 3, response);
        });
        this._route.params.subscribe( params => {
          this.noOfQuestions = this.LEVEL_CONFIG[ params.level - 1];
          this.level =  parseInt(params.level, 10);
        });
        this._dashboardService.getJSONData('quiz.json').subscribe(response => {
            this._data = JSON.parse(response.data);
            this._data = this._data[this.LEVELS[this.level - 1]];
            this.shuffle(this._data);
            this.displayQuestion();
        });
    }

    /**
     * Assign the quiz parameters to the respective variables
     */
    displayQuestion() {
        this.questionText = this._data[this._questionNumber].question;
        this.opt.push(this._data[this._questionNumber].option1);
        this.opt.push(this._data[this._questionNumber].option2);
        this.opt.push(this._data[this._questionNumber].option3);
        this.opt.push(this._data[this._questionNumber].option4);
        const ans = this.opt[this._data[this._questionNumber].answer - 1];
        this.solutions += '<strong>Q:</strong> ' + this.questionText + '<br>' + '<strong>Ans:</strong> ' + ans + '<br><br>';
    }

    /**
     * Check if the option selected is right or wrong
     * @param {Object} event Use click event to get the attributes of the current DOM
     */
    optionSelected(event) {
        if (this._questionLock) {
            return;
        }
        this._questionLock = true;
        if (this._data[this._questionNumber].answer === event.target.id) {
            this.score++;
            this._sharedData.customSuccessAlert(this.alerts.activitySuccessMsg, this.alerts.activitySuccessTitle);
        } else {
            this._sharedData.customErrorAlert(this.alerts.activityFailMsg, this.alerts.activityFailTitle);
        }
        this._obs = observableInterval(10).pipe(
                    tap(i => this.changeQuestion() ));
        this._subscription = this._obs.subscribe();
    }
    /**
     * Shuffle the questions and answers
     * @param {Array} array The array that has to be shuffled
     */
    shuffle(array) {
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

    /**
     * Logic to display the next question
     */
    changeQuestion() {
        this._subscription.unsubscribe();
        this._questionNumber++;
        if (this._questionNumber === this.noOfQuestions) {
            this.activityComplete = true;
            this._dashboardService.getActivityScore({activity: this.ACTIVITY}).subscribe( res => {
              const points = this.score * this.POINTS_PER_CORRECT_ANSWER;
              if ((res.score < points)) {
                // ensuring best possible score
                const prevScore = res.score;
                this._dashboardService.updateActivityScore({activity: this.ACTIVITY, score: points}).subscribe(() => {
                  this._leaderBoardService.updateLeaderBoard({activity: this.ACTIVITY, score: points, prevScore: prevScore})
                });
              }
            });
            swal({
              title: this.language.alerts.title,
              html: this.solutions,
              type: 'info',
            }).then( res => { if (!this.completed) {
              this._dashboardService.updateActivityLevel({activity: this.ACTIVITY, level: this.level}).subscribe(() => {});
              if (this.level === 1) {
                this._badgeService.updateBadgeNumber(this.BADGE_NUMBER).subscribe(response => response);
                this._performanceService.openDialog(this.CURR_STAGE);
              }
          }});
            this._dashboardService.updateProgressStatus(this._status).subscribe(response => {});
            return;
        }
        this._questionLock = false;
        this.opt = [];
        this.displayQuestion();
    }

    /**
     * Reset activity on completion
     */
    reload() {
        this.ngOnInit();
    }
}
