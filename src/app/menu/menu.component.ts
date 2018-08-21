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

    activity: number;
    stage: any;
    language: any;
    enabled: boolean;
    private readonly PATH_PREFIX = 'assets/img/';
    private readonly DEFAULT_PATH = 'assets/img/unlocked.png';
    private readonly LAST_ACTIVITY = 3;
    private readonly CLASS_INNER_CIRCLE = 'inner-circle';
    private readonly CLASS_UNLOCKED_INNER_CIRCLE = 'unlocked-inner-circle';
    private readonly CLASS_BUT = 'but';
    private readonly CLASS_UNLOCKED_BUTTON = 'unlocked-btn';
    private readonly CLASS_OUTER_CIRCLE = 'outer-circle';
    private readonly CLASS_COMPLETED = 'completed';

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

    // Methods calculateInnerClasses, calculateButtonClasses, calculateButtonBackground, calculateOuterClasses
  /**
   * Adds inner class depending on the progress
   * @param  {number}          stage Stage in the application
   * @param  {string}          className Class which is to be added
   * @return {boolean}         Return boolean
   */
    calculateInnerClasses(stage: number, className: string) {
      return  (this.checkStageStatus(stage)) ? {[className]: true, [this.CLASS_INNER_CIRCLE]: true} : {[this.CLASS_UNLOCKED_INNER_CIRCLE]: true, [this.CLASS_INNER_CIRCLE]: true};
    }

    calculateButtonClasses(stage: number, className: string) {
      return  (this.checkStageStatus(stage)) ? {[className]: true, [this.CLASS_BUT]: true} : {[this.CLASS_UNLOCKED_BUTTON]: true, [this.CLASS_BUT]: true};
    }

    calculateButtonBackground(stage: number, name: string) {
      return  (this.checkStageStatus(stage)) ? this.PATH_PREFIX + name + '.png' : this.DEFAULT_PATH;
    }

    calculateOuterClasses(stage: number, className: string) {
      return  (this.checkStageStatus(stage)) ? {[className]: true, [this.CLASS_OUTER_CIRCLE]: true} : {[this.CLASS_UNLOCKED_BUTTON]: true, [this.CLASS_OUTER_CIRCLE]: true};
    }

  // Method checkStageStatus
  /**
   * Return stage status i.e. whether the stage can be unlocked or not
   * @param  {number}          stage Stage in the application
   * @return {boolean}         Return boolean
   */

    checkStageStatus(stage: number) {
      return (this.stage >= stage || (this.stage === stage - 1 && this.activity === this.LAST_ACTIVITY))
    }

  // Method calculateArcClass
  /**
   * Return arc status i.e. whether the class should be added to the arc or not
   * @param  {number}          stage Stage in the application
   * @param {number}           index Index of the arc i.e. 1st or 2nd or 3rd
   * @return {boolean}         Return boolean
   */

    calculateArcClass(stage: number, index: number) {
      return (this.stage > stage || (this.stage === stage && this.activity >= index + 1)) ? {[this.CLASS_COMPLETED]: true} : {'': true}
    }

  // Method calculateDisplayedActivity
  /**
   * Returns the activity completed in the current stage
   * @param  {number}          stage Stage in the application
   * @return {number}         Activity completed
   */

    calculateDisplayedActivity(stage: number) {
      if (this.stage > stage)  {
        return this.LAST_ACTIVITY;
      } else {
        if (stage > this.stage) {
          return 0;
        } else {
          return this.activity;
        }
      }
    }
}
