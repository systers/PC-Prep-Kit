import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { DashboardService } from '../../services/dashboard.service';
import { LanguageService } from '../../services/language.service';
import { InfokitService } from '../../services/infokit.service';
import { SharedDataService } from '../../services/shared.data.service';

@Component({
    selector: 'app-pcpolicy',
    templateUrl: './pcpolicy.component.html',
    styleUrls: ['./pcpolicy.component.scss']
})

export class PcpolicyComponent implements OnInit {
    language: any;
    email: String;
    private _status: object = {stage: 1, activity: 2};
    public completed = true;

    constructor(private _dashboardService: DashboardService, private _langService: LanguageService, public toastr: ToastsManager, vcr: ViewContainerRef, private _infokitService: InfokitService, private _sharedData: SharedDataService) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
        this._dashboardService.getUserInfo().subscribe(response => {
            this.email = response.user.email;
        });

        this._langService.loadLanguage().subscribe(response => {
            this.language = response.pcprepkit.stages.introduction.pcpolicy;
        });
    }

    mail() {
        this._dashboardService.mailpcpolicy().subscribe(response => {
            this.toastr.success('Please Check your Mail', 'Success!');
            this._infokitService.activateinfokit('pc_policy').subscribe(res => {});
            this._dashboardService.updateProgressStatus(this._status).subscribe(res => {});
        });
    }
}
