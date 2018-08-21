import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { Event, Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-activityindicator',
    templateUrl: './activityindicator.component.html',
    styleUrls: ['./activityindicator.component.scss']
})

export class ActivityindicatorComponent implements OnInit {
    // Sets the Position of Activity Indicator When Side bar is toggled.
    private static _localStorageKey = 'pcprepkitUser';
    public position = 'col-md-3 col-md-offset-1 col-xs-3';
    activityProgress: number;
    activity: number;
    stage: number;

    // Sets the coloring of the Indicator, each array element represents one Indicator
    indicatorClass = ['indblack', 'indblack', 'indblack'];

    /**
     * DashboardService API for the latest Activity Completed
     * Router helps with the current Activty information
     */
    constructor(private _dashboardService: DashboardService, private _router: Router) {}

    // Getting the latest Activity
    ngOnInit() {
      this._router.events.subscribe( event => {
        if (event instanceof NavigationEnd) {
            this.indicatorClass = ['indblack', 'indblack', 'indblack'];
        }
        if (localStorage.getItem(ActivityindicatorComponent._localStorageKey)) {
          this._dashboardService.getProgressStatus().subscribe(response => {
              this.activity = response.activity;
              this.stage = response.stage;
              this.findRoute();
          }, err => {
              this._router.navigate(['/login']);
          });
        }
      });
    }

    /**
     * updateInd receives current activity information from the findRoute function
     * and updates the activity Indicator colors
     * @param  {integer} currentActivty Current activity Infromation
    */
    updateInd(currentStage) {
        if (currentStage < this.stage) {
            this.activityProgress = 3;
        } else if (currentStage === this.stage) {
            this.activityProgress = this.activity;
        } else {
            this.activityProgress = 0;
        }
        for (let i = 0; i < this.activityProgress; i++) {
            this.indicatorClass[i] = 'indgreen';
        }
    }

    /**
     * Finds the current Activity Using the Router URL
     * Calls updateInd to update the Indicator based on the current Activity
     */
    findRoute() {
        const module = this._router.url.split('/')[1];
        const stages = ['introduction', 'malaria-101', 'meds-n-labels'];
        const idx = stages.indexOf(module);
        if (idx > -1) {
            this.updateInd(idx + 1);
        }
    }

    /**
     * Toggle the Activity Indicator When the sidebar is Toggled by changing the gird system
     * Add offset to move the indictors right, remove offset to move the indicators back to center.
     */
    activityToggle() {
        this.position = (this.position === 'col-md-3 col-md-offset-1 col-xs-3') ? 'col-xs-3' : 'col-md-3 col-md-offset-1 col-xs-3';
    }
}
