import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
    @Output() toggleNavbar = new EventEmitter<any>();

    navbartoggle() {
        this.toggleNavbar.emit();
    }

    constructor(private _authService: AuthService, private _router: Router) { }

    logout() {
        this._authService.logout().subscribe(
            data => {
                if (!data.loggedOut) {
                    this._router.navigate(['/login']);
                }
            });
    }
}
