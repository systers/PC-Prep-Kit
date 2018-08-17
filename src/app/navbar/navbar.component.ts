import { interval as observableInterval } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NavbarService } from '../services/navbar.service';
import { LanguageService } from '../services/language.service';
import { DashboardService } from '../services/dashboard.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { UserUpdateComponent } from '../user-update/user-update.component';
@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    animations: [
        trigger('toggleNav', [
            state('out', style({
                transform: 'translate(0%)'
            })),
            state('in',   style({
                transform: 'translate(-100%)'
            })),
        transition('out => in', animate('100ms ease-in')),
        transition('in => out', animate('100ms ease-out'))
        ])
    ],
})

export class NavbarComponent implements OnInit {
    private static _localStorageKey = 'pcprepkitUser';
    username: String;
    language: any;
    @Output() togglePosition = new EventEmitter<any>();
    @Output() infoPop = new EventEmitter<any>();
    public state= 'out';
    private _obs;
    private _subscription;
    public proPic: any;
    private dialogWidth = '400px';
    constructor(private _dashboardService: DashboardService, private _navbarService: NavbarService, private _langService: LanguageService, private _dialog: MatDialog) { }

    ngOnInit() {
        this._obs = observableInterval(500).pipe(
                       tap(i => this.getUserName()));
        this._subscription = this._obs.subscribe();
        this._langService.loadLanguage().subscribe(response => {
            this.language = response.pcprepkit.common.navbar;
        });
    }

    getUserName() {
        if (localStorage.getItem(NavbarComponent._localStorageKey)) {
            this._subscription.unsubscribe();
            this._navbarService.getUserName().subscribe(response => {
                this.username = response.username;
            });
            this._dashboardService.getUserInfo().subscribe(response => {
                const encodedData = btoa(response.user.email);
                const cacheInvalidator = Date.now();
                this.proPic = 'assets/img/uploads/' + encodedData + '.jpeg?time=' + cacheInvalidator;
            });
        }
    }

    toggle() {
        this.state = (this.state === 'out') ? 'in' : 'out';
        this.togglePosition.emit();
    }

    toggleInfokit() {
        this.infoPop.emit();
    }

    editUser(): void {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        profilePicture: this.proPic,
        username: this.username
      };
      dialogConfig.width = this.dialogWidth;
      const dialogRef = this._dialog.open(UserUpdateComponent, dialogConfig);
      dialogRef.afterClosed( ).subscribe(res => this.ngOnInit());
    }
}


