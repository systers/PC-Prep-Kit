import { Component, Input, OnInit } from '@angular/core';
import { Activity, ActivityConfig } from '../ActivityConfig';
import { Router } from '@angular/router';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-level-navigate',
  templateUrl: './level-navigate.component.html',
  styleUrls: ['./level-navigate.component.scss']
})
export class LevelNavigateComponent implements OnInit {

  public levelsURL = [];
  @Input() levelInfo;
  private activity: Activity;
  private levels: number;
  private baseURL: string;
  public userCurrentLevel: number;
  public language: any;

  constructor(private _router: Router, private _languageService: LanguageService) {
    this._languageService.loadLanguage().subscribe(res => this.language = res.pcprepkit.common.levelNavigation)
  }


  ngOnInit() {
    this.activity = ActivityConfig[this.levelInfo - 1];
    this.levels = this.activity.levels;
    this.baseURL = this.activity.url;
    for (let i = 1; i <= this.levels; i++) {
      this.levelsURL.push(this.baseURL + '/' + i);
    }
    this.userCurrentLevel =  parseInt(this._router.url.substr(this._router.url.length - 1), 10);
  }

}

