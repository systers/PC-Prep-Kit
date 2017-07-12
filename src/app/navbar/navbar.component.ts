import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { NavbarService } from '../services/navbar.service';

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

    @Output() togglePosition = new EventEmitter<any>();
    public state= 'out';
    constructor(private _navbarService: NavbarService) { }

    ngOnInit() {
        this._navbarService.getUserName().subscribe(response => {
            this.username = response.username;
        });
    }

    toggle() {
        this.state = (this.state === 'out') ? 'in' : 'out';
        this.togglePosition.emit();
    }
}
