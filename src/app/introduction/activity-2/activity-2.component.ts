import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { LanguageService } from '../../services/language.service';
import { InfokitService } from '../../services/infokit.service';
import { SharedDataService } from '../../services/shared.data.service';
import { ToastrService } from 'ngx-toastr';
import { LeaderBoardService } from '../../services/leaderBoard.service';

@Component({
    selector: 'app-pcpolicy',
    templateUrl: './activity-2.component.html',
    styleUrls: ['./activity-2.component.scss']
})

export class PcpolicyComponent implements OnInit {
    language: any;
    email: String;
    private _status: object = {stage: 1, activity: 2};
    public completed = false;
    private readonly ACTIVITY = 'pcPolicy';


    constructor(private _dashboardService: DashboardService, private _langService: LanguageService, public toastr: ToastrService,  private _infokitService: InfokitService, private _sharedData: SharedDataService,
                private _leaderBoardService: LeaderBoardService) {}

    ngOnInit() {
        this._dashboardService.getUserInfo().subscribe(response => {
            this.email = response.user.email;
        });

      this._dashboardService.getProgressStatus().subscribe(response => {
        this.completed = this._sharedData.checkProgress(1, 2, response);
        if (!this.completed) {
          this._dashboardService.updateProgressStatus(this._status).subscribe(() => {});
          this._leaderBoardService.updateLeaderBoard({activity: this.ACTIVITY, level: 'level1'});
          this.completed = true;
        }
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
