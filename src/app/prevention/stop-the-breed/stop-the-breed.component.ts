import { Component, OnInit, ViewChild } from '@angular/core';
import * as raphaelJS from 'raphael';
import { MatDialog } from '@angular/material';
import { backgroundConfig } from './game-config';
import { elementConfig } from './game-config';
import { SharedDataService } from '../../services/shared.data.service';
import { LanguageService } from '../../services/language.service';
import { DashboardService } from '../../services/dashboard.service';
import { InfokitService } from '../../services/infokit.service';
import { PerformanceDisplayService } from '../../services/performance-display.service';
import { ActivatedRoute } from '@angular/router';
import { LeaderBoardService } from '../../services/leaderBoard.service';

@Component({
  selector: 'app-stop-the-breed',
  templateUrl: './stop-the-breed.component.html',
  styleUrls: ['./stop-the-breed.component.scss']
})
export class StopTheBreedComponent implements OnInit {

  @ViewChild('gameArea') gameArea;

  language: any;
  alerts: any;
  activityComplete = false;
  completed = false;

  private readonly CANVAS_WIDTH = 1380;
  private readonly CANVAS_HEIGHT = 773;
  elementConfig = elementConfig;
  backgroundConfig = backgroundConfig;


  paper: RaphaelPaper;
  glow: RaphaelSet;
  count = 5;
  private readonly LEVELS = ['level1', 'level2'];
  private level: string;
  private levelNumber;

  readonly CURR_STAGE = 8;
  private readonly ACTIVITY = 'stopBreed';


  constructor(public dialog: MatDialog, public sharedDataService: SharedDataService,
              private _langService: LanguageService, private _dashboardService: DashboardService,
              private _infokitService: InfokitService, private _performanceService: PerformanceDisplayService, private _route: ActivatedRoute,
              private _leaderBoardService: LeaderBoardService) {
  }


  objectClicked(): void {
    this.count--;
    if (this.count === 0) {
      this.sharedDataService.customSuccessAlert(this.alerts.activitySuccessMsg, this.alerts.activitySuccessTitle);
      this._dashboardService.updateProgressStatus({stage: 4, activity: 1})
        .subscribe(res => res);
      this.activityComplete = true;
      if (!this.completed) {
        if (this.levelNumber === 1) {
          this._performanceService.openDialog(this.CURR_STAGE);
        }
      }
      this._dashboardService.updateActivityLevel({activity: this.ACTIVITY, level: this.levelNumber}).subscribe(() => {});
      this._leaderBoardService.updateLeaderBoard({activity: this.ACTIVITY, level: this.level});
      this._infokitService.activateinfokit('stop_Breed').subscribe( () => {});
    }
  }

  ngOnInit() {
    this._langService.loadLanguage().subscribe(response => {
      this.language = response.pcprepkit.stages.prevention.stopTheBreed;
      this.alerts = response.pcprepkit.common.alerts;
    });

    this._dashboardService.getProgressStatus().subscribe(res => {
      this.completed = this.sharedDataService.checkProgress(4, 1, res);
    });

    this._route.params.subscribe( params => {
      this.level =   this.LEVELS[ params.level - 1];
      this.levelNumber = parseInt( params.level, 10);
    });

    // The paper element of Raphael where the game canvas has been set up
    this.paper = Raphael(this.gameArea.nativeElement, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
    const bgItem = this.backgroundConfig;
    const currentLevel = this.level;
    this.paper.image(bgItem[currentLevel].imageURL, bgItem[currentLevel].positionX, bgItem[currentLevel].positionY, bgItem[currentLevel].width, bgItem[currentLevel].height);

    this.elementConfig[this.level].forEach((el) => {
      const item = el.item;
      const element: RaphaelElement = this.paper.image(item.imageURL, item.positionX, item.positionY, item.width, item.height);

      element.click(() => {
        this.objectClicked();
        const messageTitle = this.language.alerts.title + el.name;
        const messageBody = '<img src = "' + item.messageImageURL + '" width=80% height=auto><br><br>' + item.messageText;
        this.sharedDataService.customAlert(messageTitle, messageBody, 'success');
        element.hide();
      });

      element.hover(() => {
        this.glow = element.glow({width: 5, opacity: 0.7, color: 'red'});
        this.gameArea.nativeElement.style.cursor = 'pointer';
      }, () => {
        this.glow.remove();
        this.gameArea.nativeElement.style.cursor = 'default';
      });

    });

  }
}


