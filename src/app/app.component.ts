import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SharedDataService } from './services/shared.data.service'

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
    constructor(private _router: Router, private _sharedData: SharedDataService) {
        this._router.events.pairwise().subscribe((e) => {
            this.loggedIn = (e && localStorage.getItem(AppComponent._localStorageKey)) ? true : false;
        });
    }

    /**
     * Call toggle function in shared data service
     */
    toggle() {
        this._sharedData.toggle();
    }
}
