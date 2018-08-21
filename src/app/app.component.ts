import { pairwise } from 'rxjs/operators';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from './services/shared.data.service';
import { LeaderBoardService } from './services/leaderBoard.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    private static _localStorageKey = 'pcprepkitUser';
    title = 'PC Prep Kit';
    public position = 'col-md-10 col-md-offset-2';
    public loggedIn = false;
    public isMenuPage = false;

    constructor(private _router: Router, private _sharedData: SharedDataService) {
        /**
         * Check if route changed
         * @param {Event} e Route change event
         */
        this._router.events.pipe(pairwise()).subscribe((e) => {
            this.loggedIn = (e && localStorage.getItem(AppComponent._localStorageKey)) ? true : false;
            // Hide activity indicator if on menu page
            this.isMenuPage = window.location.pathname === '/menu';
        });
    }

    /**
     * Call toggle function
     */
    toggle() {
        this._sharedData.toggle();
    }
}
