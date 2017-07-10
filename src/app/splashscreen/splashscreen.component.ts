import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splashscreen',
  templateUrl: './splashscreen.component.html',
  styleUrls: ['./splashscreen.component.scss']
})
export class SplashscreenComponent {

  wid = 0 ;
  intervalId;
  constructor(private router: Router) {
    this.start();
  }

  start() {
      this.intervalId = setInterval(() => {
      this.wid = this.wid + 5 ;
      if ( this.wid > 100) {
        this.stop();
      }
    }, 70);
  }

  stop() {
    clearInterval(this.intervalId);
    this.router.navigate(['login']);
  }

}
