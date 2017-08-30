import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { DashboardService } from '../../services/dashboard.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { SharedDataService } from '../../services/shared.data.service';
import { LanguageService } from '../../services/language.service';

@Component({
    selector: 'app-life-cycle',
    templateUrl: './activity-1-2.component.html',
    styleUrls: ['../malaria-101.component.scss']
})
export class MalariaLifeCycleComponent implements OnInit {

    private obs;
    private subscription;
    private _status: object = {stage: 2, activity: 1};
    private currArrState = [];
    public activityComplete = false;
    public completed = false;
    public language: any;
    public alerts: any;
    public solnArr = ['red-blood-cells.png',
                       'character-1.png',
                       'mosquito.png',
                       'mosquito.png',
                       'character-2.png',
                       'plasmodium.png']
    public labelsArr;

    constructor(private _langService: LanguageService, private _dashboardService: DashboardService, private _sharedData: SharedDataService, public toastr: ToastsManager, vcr: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vcr);
        this._dashboardService.getProgressStatus().subscribe(response => {
            this.completed = this._sharedData.checkProgress(2, 1, response);
        });
    }

    ngOnInit() {
        this._langService.loadLanguage().subscribe(response => {
            this.language = response.pcprepkit.stages.malaria101.lifecycle;
            this.alerts = response.pcprepkit.common.alerts;
            this.labelsArr = this.language.labels;
            this._sharedData.customAlert(this.language.alerts.info, '', 'warning');
        });
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

    allowDrop(ev) {
        ev.preventDefault();
    }

    drag(ev) {
        ev.dataTransfer.setData('text', ev.target.id);
        if (this.isInRange(ev.target.parentNode.id)) {
            delete this.currArrState[Number(ev.target.parentNode.id)];
        }
    }

    isInRange(elementId) {
        return elementId > 0 && elementId <= 6;
    }

    drop(ev) {
        ev.preventDefault();
        const data = document.getElementById(ev.dataTransfer.getData('text'));
        const srcParent = data.parentNode;
        const tgt = ev.currentTarget.firstElementChild;

        if (tgt) {
            ev.currentTarget.replaceChild(data, tgt);
            srcParent.appendChild(tgt);
            let firstSrc = ev.currentTarget.firstElementChild.src;
            let secondSrc = tgt.src;
            firstSrc = firstSrc.substr(firstSrc.lastIndexOf('/') + 1);
            secondSrc = secondSrc.substr(secondSrc.lastIndexOf('/') + 1);
            if (this.isInRange(ev.currentTarget.id) && this.isInRange(tgt.parentNode.id)) {
                this.currArrState[Number(ev.currentTarget.id)] = firstSrc;
                this.currArrState[Number(tgt.parentNode.id)] = secondSrc;
            }

        } else {
            ev.currentTarget.appendChild(data);
            let firstSrc = ev.currentTarget.firstElementChild.src;
            firstSrc = firstSrc.substr(firstSrc.lastIndexOf('/') + 1);
            if (this.isInRange(ev.currentTarget.id)) {
                this.currArrState[Number(ev.currentTarget.id)] = firstSrc;
            }
        }

        let isWrongPos = false;
        let arrLength = 0;
        for (let i = 0; i < this.solnArr.length; i++) {
            if (this.currArrState[i + 1] !== undefined) {
                arrLength++;
            }
            if (this.currArrState[i + 1] !== this.solnArr[i]) {
                isWrongPos = true;
            }
        }

        if (!isWrongPos && arrLength === 6) {
            this.activityComplete = true;
            this._sharedData.customSuccessAlert(this.alerts.activitySuccessMsg, this.alerts.activitySuccessTitle);
            this._dashboardService.updateProgressStatus(this._status).subscribe(response => {});
        } else if (arrLength === 6) {
            this._sharedData.customErrorAlert(this.alerts.activityFailMsg, this.alerts.activityFailTitle);
        }
    }
}
