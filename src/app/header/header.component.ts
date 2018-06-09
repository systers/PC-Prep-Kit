import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MaterialModule } from '../material.module';
import { LanguageService } from '../services/language.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    providers: [MaterialModule]
})

export class HeaderComponent implements OnInit {
    language: any;
    @Output() toggleNavbar = new EventEmitter<any>();
    @Output() openEditProfile = new EventEmitter<any> ();

    navbartoggle() {
        this.toggleNavbar.emit();
    }

    constructor(private _authService: AuthService, private _router: Router,  private _langService: LanguageService) { }

    ngOnInit() {
        this._langService.loadLanguage().subscribe(response => {
            this.language = response.pcprepkit.common.header;
        });
     }

    logout() {
        this._authService.logout().subscribe(data => {
            if (!data.loggedOut) {
                this._router.navigate(['/login']);
            }
        });
    }

    editProfile(): void {
      this.openEditProfile.emit();
    }
}
