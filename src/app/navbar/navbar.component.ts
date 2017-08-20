import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Observable } from 'rxjs/Rx';
import { NavbarService } from '../services/navbar.service';
import { LanguageService } from '../services/language.service';
import { DashboardService } from '../services/dashboard.service';

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
    ]
})

export class NavbarComponent implements OnInit {
    username: String;
    language: any;
    @Output() togglePosition = new EventEmitter<any>();
    @Output() infoPop = new EventEmitter<any>();
    public state= 'out';
    private _obs;
    private _subscription;
    private static _localStorageKey = 'pcprepkitUser';
    public proPic: any;
    constructor(private _dashboardService: DashboardService, private _navbarService: NavbarService, private _langService: LanguageService) { }

    ngOnInit() {
        this._obs = Observable.interval(500)
                       .do(i => this.getUserName());
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
                const encodedData = btoa(response);
                this.proPic = 'assets/img/uploads/' + encodedData + '.jpeg';
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
}

