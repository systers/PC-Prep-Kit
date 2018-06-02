import { interval as observableInterval } from 'rxjs';

import { tap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { SharedDataService } from '../../services/shared.data.service';
import { LanguageService } from '../../services/language.service';

@Component({
    selector: 'app-highlight',
    templateUrl: './activity-1.component.html',
    styleUrls: ['../introduction.component.scss']
})
export class HighlightActivityComponent implements OnInit {

    private _selectedText = '';
    private _obs;
    private _subscription;
    private _status: object;
    private _activity: number;
    private _stage: number;
    public activityComplete = false;
    public language: any;
    public alerts: any;
    public completed = false;

    constructor(private _langService: LanguageService, private _dashboardService: DashboardService,  private _sharedData: SharedDataService) {

    }

    /**
     * Handle activity setup (Displaying activity information, checking user's progress and checking completing of activity)
     */
    ngOnInit() {
        this._langService.loadLanguage().subscribe(response => {
            this.language = response.pcprepkit.stages.introduction.highlightActivity;
            this.alerts = response.pcprepkit.common.alerts;
            this._sharedData.customAlert(this.language.alerts.info, '', 'warning');
        });
        this._dashboardService.getProgressStatus().subscribe(response => {
            this.completed = this._sharedData.checkProgress(1, 1, response);
        });
        this._obs = observableInterval(500).pipe(
                       tap(i => this.select()));
        this._subscription = this._obs.subscribe();
    }

    /**
     * Check if the definition has been highlighted or not and display appropriate messages on completing
     */
    select() {
        let text = '';
        const content = this.language.descriptions.bodyContent3;
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
                this._sharedData.customSuccessAlert(this.alerts.activitySuccessMsg, this.alerts.activitySuccessTitle);
            } else {
                this._dashboardService.updateProgressStatus(this._status).subscribe(response => {
                });
                this._sharedData.customSuccessAlert(this.alerts.activitySuccessMsg, this.alerts.activitySuccessTitle);
                this.activityComplete = true;
            }
        }
    }
}
