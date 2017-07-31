import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { Observable } from 'rxjs/Rx';
import swal from 'sweetalert2';
import { DIAGNOSIS } from './diagnosis-detail';
import { SharedDataService } from '../../services/shared.data.service';

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
    private _activity: number;
    private _stage: number;
    private _baseImgPath = '../../assets/img/Memory-game/';

    public position: string;
    public isMatchArr: boolean[] = [];
    public backcard = this._baseImgPath + 'logo.png'; // shows back of card when turned over
    public activityComplete = false;

    private _faces = [
                'area-1.png',
                'blood-test.png',
                'enlarged-liver-1.png',
                'blood-test.png',
                'enlarged-spleen-1.png',
                'other-tests.png',
                'enlarged-liver-1.png',
                'rapid-diagnostic-test-1.png',
                'other-tests.png',
                'symptoms-1.png',
                'symptoms-1.png',
                'enlarged-spleen-1.png',
                'area-1.png',
                'virus-1.png',
                'rapid-diagnostic-test-1.png',
                'virus-1.png',
            ];

    constructor(private _dashboardService: DashboardService, private _sharedData: SharedDataService) {
            this._sharedData.position.subscribe(
            value => {
                this.position = value;
            }
        );
    }

    ngOnInit() {
        this.checkProgress();
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
        for (let i = 1; i <= 16; i++) {
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
            } else {
                this.getImgElement(card).src = this._baseImgPath + this._faces[card];
                if (this._clicks === 0) {
                    this._firstchoice = card;
                    this._clicks = 1;
                } else if (this._firstchoice !== card) {
                    this._clicks = 2;
                    this._secondchoice = card;
                    this._obs = Observable.interval(500)
                            .do(i => this.check());
                    this._subscription = this._obs.subscribe();
                }
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
                    this.successMatchAlert(DIAGNOSIS[i].desc);
                    this.isMatchArr[this._secondchoice] = false;
                    this.isMatchArr[this._firstchoice] = false;
                    break;
                }
            }
            this._matches++;
            if (this._matches === 8) {
                this.successAlert();
                this._status = {stage: 3, activity: 2};
                this._dashboardService.updateProgressStatus(this._status).subscribe(response => {});
                this.activityComplete = true;
            }
        } else {
            this.getImgElement(this._firstchoice).src = this.backcard;
            this.getImgElement(this._secondchoice).src = this.backcard;
            return;
        }
    }

    /**
     * Alert message on a successful match
     * @param {String} medName The name of the medication
     * @param {String} msg     The side effect message to be displayed
     */
    successMatchAlert(msg) {
        swal(
            'Congratulations!<br>You matched a pair',
            msg,
            'success'
        );
    }

    /**
     * Alert on completing the activity
     */
    successAlert() {
        swal(
            'Good job!',
            'You completed this activity!',
            'success'
        );
    }

    checkProgress() {
        this._dashboardService.getProgressStatus().subscribe(response => {
            this._activity = response.activity;
            this._stage = response.stage;
            if (this._stage >= 3 && this._activity >= 2) {
                this.activityComplete = true;
            }
        });
    }
}
