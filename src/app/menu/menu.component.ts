import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

    activity: String;
    stage: String;

    constructor(private _dashboardService: DashboardService, private _router: Router) { }

    createRange(number) {
        const items: number[] = [];
        for (let i = 1; i <= number; i++) {
            items.push(i);
        }
        return items;
    }

    ngOnInit() {
        this._dashboardService.getProgressStatus().subscribe(response => {
            this.activity = response.activity;
            this.stage = response.stage;
        }, err => {
            this._router.navigate(['/login']);
        });
    }
}
