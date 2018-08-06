import { interval as observableInterval } from 'rxjs';

import { tap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { DIAGNOSIS } from './diagnosis-detail';
import { SharedDataService } from '../../services/shared.data.service';
import { LanguageService } from '../../services/language.service';
import { BadgeService } from '../../services/BadgeService/badge.service';
import { PerformanceDisplayService } from '../../services/performance-display.service';
import { LeaderBoardService } from '../../services/leaderBoard.service';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'app-activity-2',
    templateUrl: './activity-2.component.html',
    styleUrls: ['../meds-n-labels.component.scss']
})
export class MemoryGameComponent implements OnInit {

    private _clicks = 0;    // counts how may picks have been made in each turn
    private _firstchoice;   // stores index of first card selected
    private _secondchoice;  // stores index of second card selected
    private _obs;
    private _subscription;
    private _matches = 0;
    private _status: Object;
    private BASE_IMAGE_PATH = '../../assets/img/Memory-game/';
    public readonly CURR_STAGE = 7;
    private readonly BADGE_NUMBER = 3;
    private readonly ACTIVITY = 'memoryGame';


    public position: string;
    public isMatchArr: boolean[] = [];
    public backcard = this.BASE_IMAGE_PATH + 'logo.png'; // shows back of card when turned over
    public activityComplete = false;
    public completed = false;
    public language: any;
    public alerts: any;
    public adjustLeft = false;

    private _faces = [
                'area-1.png',
                'area-1.png',
                'blood-test.png',
                'blood-test.png',
                'enlarged-liver-1.png',
                'enlarged-liver-1.png',
                'enlarged-spleen-1.png',
                'enlarged-spleen-1.png',
                'other-tests.png',
                'other-tests.png',
                'rapid-diagnostic-test-1.png',
                'rapid-diagnostic-test-1.png',
                'symptoms-1.png',
                'symptoms-1.png',
                'virus-1.png',
                'virus-1.png',
                'pcr.png',
                'pcr.png',
                'serology-1.png',
                'serology-1.png',
                'drug-resistance-1.png',
                'drug-resistance-1.png',
                'malaria-parasite-1.png',
                'malaria-parasite-1.png'
            ];
    public LEVEL_CONFIG = [
      {cardsCount: 16, rowCount: 4, columnCount: 4},
      {cardsCount: 20, rowCount: 5, columnCount: 4},
      {cardsCount: 24, rowCount: 4, columnCount: 6}
    ];
    private readonly LEVELS = ['level1', 'level2', 'level3'];
    public currentLevel: any;
    public levelNumber: number;
    private readonly FINAL_LEVEL = 3;

    constructor(private _langService: LanguageService, private _dashboardService: DashboardService, private _sharedData: SharedDataService,
                private _performanceService: PerformanceDisplayService, private _badgeService: BadgeService, private _route: ActivatedRoute, private _leaderBoardService: LeaderBoardService
    ) {
            this._sharedData.position.subscribe(
            value => {
                this.position = value;
            }
        );

    }

    ngOnInit() {
        this._dashboardService.getProgressStatus().subscribe(response => {
            this.completed = this._sharedData.checkProgress(3, 2, response);
        });
        this._langService.loadLanguage().subscribe(response => {
            this.language = response.pcprepkit.stages.medsNLabels.memoryGame;
            this.alerts = response.pcprepkit.common.alerts;
        });
        this._route.params.subscribe( params => {
        this.currentLevel = this.LEVEL_CONFIG[ params.level - 1];
        this.levelNumber =  parseInt(params.level, 10);
          if (this.levelNumber === this.FINAL_LEVEL) {
            this.adjustLeft = true
          }
        });
        this._faces.splice(this.currentLevel.cardsCount);
        this.shuffle(this._faces);
        this.createBoolArr();
    }

    /**
     * Utility function used in activity indicator
     * @param {Number} number Number of activities in a stage - 3 (default)
     */
    createRange(number) {
        const items: number[] = [];
        for (let i = 1; i <= number; i++) {
            items.push(i);
        }
        return items;
    }

    /**
     * Utility function to create a boolean array that prevents clicking on a card that was already matched
     */
    createBoolArr() {
        for (let i = 1; i <= this.currentLevel.cardsCount; i++) {
            this.isMatchArr.push(true);
        }
        return this.isMatchArr;
    }

    /**
     * Shuffle the array
     * @param {Array} array the array containing the face images
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

    getImgElement(card) {
        return document.getElementById(card).getElementsByTagName('img')[0];
    }

    /**
     * Flip card on click
     * @param {Number} card The index of the clicked element
     */
    choose(card) {
            if (this._clicks === 2) {
                return;
            }
            this.getImgElement(card).src = this.BASE_IMAGE_PATH + this._faces[card];
            if (this._clicks === 0) {
                this._firstchoice = card;
                this._clicks = 1;
            } else if (this._firstchoice !== card) {
                this._clicks = 2;
                this._secondchoice = card;
                this._obs = observableInterval(500).pipe(
                            tap(i => this.check()));
                this._subscription = this._obs.subscribe();
            }
        }

    /**
     * Check if a match is made
     */
    check() {
        this._subscription.unsubscribe();
        this._clicks = 0;
        if (this._faces[this._secondchoice] === this._faces[this._firstchoice]) {
            const medName = this._faces[this._secondchoice]; // or this.faces[this._firstchoice]
            const med = medName.substr(0, medName.lastIndexOf('.'));
            for (let i = 0; i < DIAGNOSIS.length; i++) {
                if (DIAGNOSIS[i].name === med) {
                    this._sharedData.customAlert(this.language.alerts.title, DIAGNOSIS[i].desc, 'success');
                    this.isMatchArr[this._secondchoice] = false;
                    this.isMatchArr[this._firstchoice] = false;
                    break;
                }
            }
            this._matches++;
            if (this._matches === this.currentLevel.cardsCount / 2) {
                this._sharedData.customSuccessAlert(this.alerts.activitySuccessMsg, this.alerts.activitySuccessTitle);
                this._status = {stage: 3, activity: 2};
                this._dashboardService.updateProgressStatus(this._status).subscribe(response => {});
                this.activityComplete = true;
                if (!this.completed) {
                  this._leaderBoardService.updateLeaderBoard({activity: this.ACTIVITY, level: this.LEVELS[this.levelNumber - 1]});
                  this._dashboardService.updateActivityLevel({activity: this.ACTIVITY, level: this.levelNumber}).subscribe(() => {});
                  if (this.levelNumber === 1) {
                    this._badgeService.updateBadgeNumber(this.BADGE_NUMBER).subscribe(res => res);
                    this._performanceService.openDialog(this.CURR_STAGE);
                  }
                }
            }
            return;
        }
        this.getImgElement(this._firstchoice).src = this.backcard;
        this.getImgElement(this._secondchoice).src = this.backcard;
    }
}
