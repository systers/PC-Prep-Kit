import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

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

    constructor(private _router: Router) {
        this._router.events.pairwise().subscribe((e) => {
            this.loggedIn = (e && localStorage.getItem(AppComponent._localStorageKey)) ? true : false;
            this.position = (this.loggedIn) ? 'col-md-10 col-md-offset-2' : 'col-md-12';
        });
    }

    /**
     * Call toggle function
     */
    toggle() {
        this.position = (this.position === 'col-md-10 col-md-offset-2') ? 'col-md-12' : 'col-md-10 col-md-offset-2';
    }
}
