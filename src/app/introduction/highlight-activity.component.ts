import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { DashboardService } from '../services/dashboard.service';
import { SharedDataService } from '../services/shared.data.service';

@Component({
    selector: 'app-highlight',
    templateUrl: './highlight-activity.component.html',
    styleUrls: ['./introduction.component.scss']
})
export class HighlightActivityComponent implements OnInit {

    private _selectedText = '';
    private _obs;
    private _subscription;
    private _status: object;
    private _activity: number;
    private _stage: number;
    public activityComplete = false;

    constructor(private _dashboardService: DashboardService, private _sharedData: SharedDataService) { }

    /**
     * Handle activity setup (Displaying activity information, checking user's progress and checking completing of activity)
     */
    ngOnInit() {
        this._sharedData.customAlert('Highlight the definition of malaria to complete this activity', '', 'warning');
        this.activityComplete = this._sharedData.checkProgress(1, 1);
        this._obs = Observable.interval(500)
                       .do(i => this.select());
        this._subscription = this._obs.subscribe();
    }

    /**
     * Check if the definition has been highlighted or not and display appropriate messages on completing
     */
    select() {
        let text = '';
        const content = 'An intermittent and remittent fever caused by a protozoan parasite that invades the red blood cells. The parasite is transmitted by mosquitoes in many tropical and subtropical regions.';
        if (window.getSelection) {
            text = window.getSelection().toString();
        }
        this._selectedText = text;
        this._status = {stage: 1, activity: 1};
        if (this._selectedText === content) {
            const selection = window.getSelection();
            if (selection) {
                selection.removeAllRanges();
                selection.empty();
            }
            if (this.activityComplete) {
                this._sharedData.customAlert('You have already completed this activity!', '', 'warning');
            } else {
                this._dashboardService.updateProgressStatus(this._status).subscribe(response => {
                });
                this._sharedData.customAlert('Good job!', 'You completed this activity!', 'success');
                this.activityComplete = true;
            }
        }
    }
}
