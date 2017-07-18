import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    providers: [DashboardService]
})
export class DashboardComponent implements OnInit {

    user: Object = {};
    email: String;

    constructor(private _authService: AuthService, private _dashboardService: DashboardService, private _router: Router) { }

    ngOnInit() {
        // Retrieve user info from the API
        this._dashboardService.getUserInfo().subscribe(response => {
            this.user = response;
            this.email = response.user.email;
        }, err => {
            this._router.navigate(['/login']);
        });
    }

    logout() {
        this._authService.logout().subscribe(
            data => {
                if (!data.loggedOut) {
                    this._router.navigate(['/login']);
                }
            });
    }
}
