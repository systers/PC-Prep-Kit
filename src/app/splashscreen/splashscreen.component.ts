import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../services/language.service';
@Component({
  selector: 'app-splashscreen',
  templateUrl: './splashscreen.component.html',
  styleUrls: ['./splashscreen.component.scss']
})

export class SplashscreenComponent implements OnInit {
  language: any;
  wid = 0;
  intervalId;
  constructor(private router: Router, private _langService: LanguageService) {
    this.start();
  }

  ngOnInit () {
    this._langService.loadLanguage().subscribe(response => {
        this.language = response.pcprepkit.common.splashscreen;
    });
  }
  start() {
      this.intervalId = setInterval(() => {
      this.wid = this.wid + 5;
      if (this.wid > 100) {
        this.stop();
      }
    }, 70);
  }

  stop() {
    clearInterval(this.intervalId);
    this.router.navigate(['login']);
  }
}
