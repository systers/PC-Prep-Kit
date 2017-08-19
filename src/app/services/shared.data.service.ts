import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { DashboardService } from './dashboard.service';
import swal from 'sweetalert2';
import 'rxjs/Rx';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class SharedDataService {

    public position: Subject<string> = new BehaviorSubject<string>('col-md-10 col-md-offset-2');
    public navPosition: Subject<string> = new BehaviorSubject<string>('col-md-2 col-md-offset-2');
    private _togglePosition = 'col-md-10 col-md-offset-2';
    private _toggleNavPosition = 'col-md-2 col-md-offset-2';
    constructor(private _dashboardService: DashboardService, public toastr: ToastsManager) {
    }

    /**
     * Toggle navbar
     */
    toggle() {
        this._togglePosition  = (this._togglePosition === 'col-md-10 col-md-offset-2') ? 'col-md-12' : 'col-md-10 col-md-offset-2';
        this.position.next(this._togglePosition);
        this._toggleNavPosition  = (this._toggleNavPosition === 'col-md-2 col-md-offset-2') ? 'col-md-2' : 'col-md-2 col-md-offset-2';
        this.navPosition.next(this._toggleNavPosition);
    }

    /**
     * Check progress of user (If the user has already completed the activity or not)
     */
    checkProgress(currStage, currActivity, response): boolean {
            const activity = response.activity;
            const stage = response.stage;
            if ((stage > currStage) || (stage === currStage && activity >= currActivity)) {
                return true;
            }
            return false;
    }

    customAlert(title, msg, type) {
        swal(
            title,
            msg,
            type
        );
    }

    customSuccessAlert(msg, title) {
        this.toastr.success(msg, title);
    }
    customErrorAlert(msg, title) {
        this.toastr.error(msg, title);
    }
}
