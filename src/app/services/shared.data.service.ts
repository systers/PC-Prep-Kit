import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { DashboardService } from './dashboard.service';
import swal from 'sweetalert2';
import 'rxjs/Rx';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class SharedDataService {

    public position: Subject<string> = new BehaviorSubject<string>('col-md-10 col-md-offset-2');
    public navPosition: Subject<string> = new BehaviorSubject<string>('col-md-2 col-md-offset-2');
    private _togglePosition = 'col-md-10 col-md-offset-2';
    private _toggleNavPosition = 'col-md-2 col-md-offset-2';
    constructor(private _dashboardService: DashboardService, public toastr: ToastrService) {
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
        this.toastr.success(msg, title, {positionClass: 'custom-toastr-class'});
    }
    customErrorAlert(msg, title) {
        this.toastr.error(msg, title, {positionClass: 'custom-toastr-class'});
    }
}
