import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { Router } from '@angular/router';
import { LanguageService } from '../services/language.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

    activity: String;
    stage: String;
    language: any;

    constructor(private _langService: LanguageService, private _dashboardService: DashboardService, private _router: Router) { }

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
     * Handle router linking to introduction page
     */
    navigateToPage(url) {
        this._router.navigateByUrl(url);
    }

    /**
     * Check if user is logged in or not before loading the menu page
     */
    ngOnInit() {
        this._langService.loadLanguage().subscribe(response => {
            this.language = response.pcprepkit.stages;
        });
        this._dashboardService.getProgressStatus().subscribe(response => {
            this.activity = response.activity;
            this.stage = response.stage;
        }, err => {
            this._router.navigate(['/login']);
        });
    }
}
