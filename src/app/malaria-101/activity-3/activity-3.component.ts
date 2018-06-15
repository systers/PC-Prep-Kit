import { interval as observableInterval } from 'rxjs';

import { tap } from 'rxjs/operators';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { SharedDataService } from '../../services/shared.data.service';
import { LanguageService } from '../../services/language.service';
import { BadgeService } from '../../services/BadgeService/badge.service';
import swal from 'sweetalert2';
import { PerformanceDisplayService } from '../../services/performance-display.service';

@Component({
    selector: 'app-oddoneout',
    templateUrl: './activity-3.component.html',
    styleUrls: ['../malaria-101.component.scss']
})
export class OddOneOutComponent implements OnInit {

    private _questionNumber;
    private _questionLock;
    private _numberOfQuestions;
    private _obs;
    private _subscription;
    private _data;
    private _status: object = {stage: 2, activity: 3};

    public activityComplete;
    public questionText;
    public score;
    public opt = [];
    public language: any;
    public completed = false;
    public alerts: any;
    public solutions = '';

    constructor(private _langService: LanguageService, private _dashboardService: DashboardService, private _sharedData: SharedDataService,  vcr: ViewContainerRef,
                private _performanceService: PerformanceDisplayService, private _badgeService: BadgeService) {

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
        this._dashboardService.getJSONData('quiz.json').subscribe(response => {
            this._data = JSON.parse(response.data);
            this.shuffle(this._data.quizlist);
            this.displayQuestion();
        });
    }

    /**
     * Assign the quiz parameters to the respective variables
     */
    displayQuestion() {
        this.questionText = this._data.quizlist[this._questionNumber].question;
        this.opt.push(this._data.quizlist[this._questionNumber].option1);
        this.opt.push(this._data.quizlist[this._questionNumber].option2);
        this.opt.push(this._data.quizlist[this._questionNumber].option3);
        this.opt.push(this._data.quizlist[this._questionNumber].option4);
        const ans = this.opt[this._data.quizlist[this._questionNumber].answer - 1];
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
        if (this._data.quizlist[this._questionNumber].answer === event.target.id) {
            this.score++;
            this._sharedData.customSuccessAlert(this.alerts.activitySuccessMsg, this.alerts.activitySuccessTitle);
        } else {
            this._sharedData.customErrorAlert(this.alerts.activityFailMsg, this.alerts.activityFailTitle);
        }
        this._obs = observableInterval(1000).pipe(
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
        if (this._questionNumber === 5) {
            this.activityComplete = true;
            swal({
              title: this.language.alerts.title,
              html: this.solutions,
              type: 'info',
            }).then( res => { if (!this.completed) {
              const badgeNumber = 2;
              const currStage = 5;
              this._badgeService.updateBadgeNumber(badgeNumber).subscribe(response => response);
              this._performanceService.openDialog(currStage);
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
