import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LanguageService } from '../services/language.service';
import { BadgeService } from '../services/BadgeService/badge.service';
import { Badge } from '../badge/models/badgeModel';
import { NotifyService } from '../badge/notify';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { BadgeComponent } from '../badge/badge.component';
import { interval } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { BotService } from '../services/BotService/bot.service';
import { LeaderBoardService } from '../services/leaderBoard.service';
import { NavbarService } from '../services/navbar.service';
import { SwUpdate } from '@angular/service-worker';
import swal from 'sweetalert2';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('newBadge', [
      state('beforeAnimation', style({
        opacity: 1
      })),
      state('afterAnimation', style({
        opacity: 1
      })),
      transition('beforeAnimation => afterAnimation', animate('2000ms', keyframes([
        style({transform: ' translateX(+1000px)', offset: 0}),
        style({transform: ' translateX(-1000px)', offset: 0.01}),
        style({transform: ' rotateY(0deg) ', offset: 0.60}),
        style({transform: 'rotateY(360deg) ', offset: 1})
      ])))
    ])
  ]
})

export class HeaderComponent implements OnInit {
  public language: any;
  public badge: Badge;
  public state = 'beforeAnimation';
  public badgeNumber: number;
  @Output() toggleNavbar = new EventEmitter<any>();
  @Output() openEditProfile = new EventEmitter<any>();
  private observable;
  private subscription;

  constructor(private _authService: AuthService, private _router: Router, private _langService: LanguageService, private _badgeService: BadgeService,
              private _notify: NotifyService, private _snackbar: MatSnackBar, private _test: BotService,
              private _leaderBoardService: LeaderBoardService, private _navBarService: NavbarService, private updates: SwUpdate) {
    updates.available.subscribe(event => {
      swal({
        title: this.language.alerts.caching.title,
        type: 'info',
        showCancelButton: true,
        confirmButtonText: this.language.alerts.caching.confirmButtonText,
        cancelButtonText: this.language.alerts.caching.cancelButtonText
      }).then((result) => {
        if (result) {
          updates.activateUpdate().then(() => document.location.reload());
        }
      });
    });
  }

  navbartoggle() {
    this.toggleNavbar.emit();
  }

  ngOnInit() {
    this._langService.loadLanguage().subscribe(response => {
      this.language = response.pcprepkit.common.header;
    });
    this.observable = interval(500)
      .pipe(tap(() => this.loadBadge()));
    this.subscription = this.observable.subscribe();
    this._notify.notifyObservable$.subscribe(res => {
      this.ngOnInit();
      this.state = 'afterAnimation';
    });
  }

  loadBadge() {
    this.subscription.unsubscribe();
    this._badgeService.getBadge().subscribe(response => {
      this.badge = response;
    });
    this._badgeService.getBadgeNumber().subscribe(response => {
      this.badgeNumber = response
    })
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

  checkInitialState($event) {
    if ($event.fromState === 'beforeAnimation') {
      this.openSnackBar();
    }
  }

  openSnackBar() {
    this._snackbar.openFromComponent(BadgeComponent, {
      duration: 5000,
      data: this.badge,
      panelClass: 'badgeBackground',
      verticalPosition: 'top',
    })
  }

  loadLeaderBoard() {
    this._leaderBoardService.getLeaderBoardData(this.badgeNumber).subscribe(res => {
      this._navBarService.getUserInfo().subscribe( response => {
        const data = {
          badge: this.badge,
          leaderBoardData: res,
          userEmail: response.user
        };
        this._leaderBoardService.showLeaderBoard(data);
      });

    });
  }
}

