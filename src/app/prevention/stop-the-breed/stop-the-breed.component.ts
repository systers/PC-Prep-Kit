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

  canvasWidth = 1380;
  canvasHeight = 773;
  elementConfig = elementConfig;
  backgroundConfig = backgroundConfig;


  paper: RaphaelPaper;
  glow: RaphaelSet;
  count = 5;

  constructor(public dialog: MatDialog, public sharedDataService: SharedDataService,
              private _langService: LanguageService, private _dashboardService: DashboardService,
              private _infokitService: InfokitService, private _performanceService: PerformanceDisplayService) {
  }


  objectClicked(): void {
    this.count--;
    if (this.count === 0) {
      this.sharedDataService.customSuccessAlert(this.alerts.activitySuccessMsg, this.alerts.activitySuccessTitle);
      this._dashboardService.updateProgressStatus({stage: 4, activity: 2})
        .subscribe(res => res);
      this.activityComplete = true;
      if (!this.completed) { this._performanceService.openDialog(8); }

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

    // The paper element of Raphael where the game canvas has been set up
    this.paper = Raphael(this.gameArea.nativeElement, this.canvasWidth, this.canvasHeight);
    const bgItem = this.backgroundConfig;
    this.paper.image(bgItem.imageURL, bgItem.positionX, bgItem.positionY, bgItem.width, bgItem.height);

    this.elementConfig.forEach((el) => {
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


