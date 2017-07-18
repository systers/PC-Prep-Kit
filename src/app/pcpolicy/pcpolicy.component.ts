import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-pcpolicy',
  templateUrl: './pcpolicy.component.html',
  styleUrls: ['./pcpolicy.component.scss']
})

export class PcpolicyComponent implements OnInit {
    email: String;
    public position = 'col-md-10 col-md-offset-2';

    constructor(private _dashboardService: DashboardService) { }

    ngOnInit() {
        this._dashboardService.getUserInfo().subscribe(response => {
            this.email = response.user.email;
        });
    }

    toggle() {
        this.position = (this.position === 'col-md-10 col-md-offset-2') ? 'col-md-12 pc_policy_body' : 'col-md-10 col-md-offset-2';
    }

    mail() {
        this._dashboardService.mailpcpolicy().subscribe(response => {
            // initiate pop up
        });
    }
}
