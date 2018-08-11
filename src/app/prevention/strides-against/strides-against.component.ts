import { Component, OnInit, ViewChild } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { MatDialog } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';
import { Observable } from 'rxjs/Observable';
import { SharedDataService } from '../../services/shared.data.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { BackgroundConfig, ManConfig, ObjectsConfig, positionConfig } from './game-config';
import { DashboardService } from '../../services/dashboard.service';
import { PositionElement } from './models/elements';
import { Item, LevelItems } from './models/Item';
import { InfokitService } from '../../services/infokit.service';
import { BadgeService } from '../../services/BadgeService/badge.service';
import { CertificateService } from '../../certificate/certificate.component';
import { PerformanceDisplayService } from '../../services/performance-display.service';
import { ActivatedRoute } from '@angular/router';
import { LeaderBoardService } from '../../services/leaderBoard.service';

export class PaperConfig {
  imageIndex: number;
  imagePositionIndex: number;
}

@Component({
  selector: 'app-strides-against',
  templateUrl: './strides-against.component.html',
  styleUrls: ['./strides-against.component.scss']
})
export class StridesAgainstComponent implements OnInit {
  // Initialising game area
  @ViewChild('gameArea') gameArea;
  paper: RaphaelPaper;
  man: RaphaelElement;

  language: any;
  alerts: any;
  pos = 0;
  question: string;
  result: any;

  completed = false;
  activityComplete = false;

  // Stores the objects
  elements: RaphaelElement[] = [];

  answer: boolean;

  // Configs:
  BackgroundConfig = BackgroundConfig;
  ObjectsConfig: Array<Item>;
  ManConfig = ManConfig;
  randomPosition: Array<PositionElement> = []; // After randomizing the original position config
  positionConfig = positionConfig;

  randomObjectConfig: Array<Item> = []; // After randomizing the original  objects config
  paperConfig: Array<PaperConfig> = [];
  sortedPosition: Array<PositionElement>;

  // Changing this would change the no. of objects in the game
  countImage: number;
  xMoveSign = 1; // Positive for moving in positive direction and vice versa
  levelNumber: number;
  level: string;
  levels = ['level1', 'level2'];
  private readonly OBJECT_COUNT_CONFIG = [5, 7];

  readonly CURR_STAGE = 9;
  private readonly BADGE_NUMBER = 4;
  private readonly ACTIVITY = 'strideAgainst';



  constructor(public languageService: LanguageService, public dialog: MatDialog, public sharedDataService: SharedDataService,
              public router: Router, public dashboardService: DashboardService, private infokitService: InfokitService,
              private _performanceService: PerformanceDisplayService, private _badgeService: BadgeService, private _certificateService: CertificateService,
              private _leaderBoardService: LeaderBoardService, private _route: ActivatedRoute) {
  }

  /**
   * Returns a random ordered Array
   * @param  {array} array which needs to be randomized
   */
  randomArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  /**
   * Called after the man has moved linearly to the desired position
   */
  handleQuestion(): void {
    let currentImage = 0;
    let index = this.pos - 1; // Finding which object eventually landed at the first position and so on...
    for (let i = 0; i < this.countImage; i++) {
      if (this.paperConfig[i].imagePositionIndex === this.sortedPosition[index].index) {
        currentImage = i;
        break;
      }
    }
    index = currentImage;
    this.elements[index].hide(); // Hiding the objects upon Man's arrival
    this.question = this.ObjectsConfig[index].element.question;
    const answer = this.ObjectsConfig[index].element.answer;
    const image = this.ObjectsConfig[index].element.messageImageURL;
    const message = this.ObjectsConfig[index].element.messageBody;
    const dashboardLinkMessage = this.language.game.messages.dashboardLink;
    const messageSuccessBody = '<img src = "' + image + '" width=auto height=200px><br><br>' + message;
    const messageFailBody = '<img src = "' + image + '" width=auto height=200px><br><br>' + message + '' +
      '<br><br><a href="/"> ' + dashboardLinkMessage + ' </a>';

    this.openDialog().subscribe(res => {
      if (this.result === answer) {
        swal(this.language.game.alerts.correct.title, messageSuccessBody, 'success');
      } else {
        this.man.animate({transform: 'r90'}, 2000, 'linear', () => {
          swal({
            type: 'error',
            title: this.language.game.alerts.incorrect.title,
            html: messageFailBody,
            confirmButtonText: this.language.game.messages.confirmButton,
          }).then(() => location.reload());
          this.man.toBack();
        })
      }
    });
  }

  /**
   * Opens Dialog for asking questions when called
   */
  openDialog(): Observable<boolean> {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        question: this.question,
      },
      position: {
        top: '21%',
        left: '36%'
      },
      disableClose: true,
      autoFocus: true,
      width: '482px'
    });
    dialogRef.afterClosed().subscribe(res => this.result = res);
    return dialogRef.afterClosed();
  }

  /**
   * Function for moving the man
   * @param  {number} current Initial position of the man.
   * @param  {number} final   Final position of the man.
   */
  moveMan(current: number, final: number): void {
    if (((8 - current) * (8 - final) <= 0 || (16 - current) * (16 - final) <= 0 || (24 - current) * (24 - final) <= 0)) {
      const factor = Math.floor(final / 8);

      const x = ((8 * factor) - current) * 86 * this.xMoveSign;
      this.man.animate({transform: '...t' + x + ',0'}, 1000, 'linear', () => {
        this.man.animate({transform: '...t0,' + '88'}, 1000, 'linear', () => {
          this.xMoveSign *= -1;
          const xAfterY = (final - (8 * factor) - 1) * (86) * this.xMoveSign;
          this.man.animate({transform: '...t' + xAfterY + ',0'}, 1000, 'linear', () => {
            this.handleQuestion();
          });
        })
      });

    } else {
      const x = (final - current) * (86) * this.xMoveSign;
      this.man.animate({transform: '...t' + x + ',0'}, 1000, 'linear', () => {
        if (!(this.pos === this.OBJECT_COUNT_CONFIG[this.levelNumber - 1])) {
          this.handleQuestion();
        } else {
          this.sharedDataService.customSuccessAlert(this.language.game.alerts.correct.finish.body, this.language.game.alerts.correct.finish.title);
          this.dashboardService.updateProgressStatus({stage: 4, activity: 2})
            .subscribe(res => res);
          this.activityComplete = true;
          if (!this.completed) {
            if (this.levelNumber === 1) {
              this._performanceService.openDialog(this.CURR_STAGE);
              this._badgeService.updateBadgeNumber(this.BADGE_NUMBER).subscribe(res => res);
              this._certificateService.openCertificate();
            }
            this._leaderBoardService.updateLeaderBoard({activity: this.ACTIVITY, level: this.level});
            this.dashboardService.updateActivityLevel({activity: 'strideAgainst', level: this.levelNumber}).subscribe(() => {});

          }
          this.infokitService.activateinfokit('stride_Against').subscribe( () => {});
        }
      });
    }
  }

  /**
   * Callback function called upon user clicking on the man
   */
  afterClick(): void {
    const moveIndex = this.pos;
    const currPosition = (this.pos) ? this.sortedPosition[moveIndex - 1].positionIndex : 1;
    const nextPosition = (this.pos === this.countImage) ? 32 : this.sortedPosition[moveIndex].positionIndex;
    this.moveMan(currPosition, nextPosition);
    if (!(this.pos === this.countImage)) {
      this.pos++;
    }
  }


  ngOnInit() {
    /*Extracting the level parameter from the route*/
    this._route.params.subscribe( params => {
      this.level = this.levels[ params.level - 1];
      this.levelNumber =  parseInt(params.level, 10);
      this.ObjectsConfig = ObjectsConfig[this.level];
      this.countImage = this.OBJECT_COUNT_CONFIG[this.levelNumber - 1];
    });
    /*
    * Here before feeding the positions defined in our config file, we'll filter them first such that when the game starts, no
    * row is completely empty
    */
    const PositionArray = []; // filtered array from the original Position Config from config file
    for (let i = 0; i <= 3; i++) {
      let subArray = this.positionConfig.filter(position => position.positionIndex >= (1 + 8 * i) && position.positionIndex <= (8 + 8 * i));
      if (this.levelNumber === 1) {
        subArray = (i === 1) ? this.randomArray(subArray).slice(0, 2) : this.randomArray(subArray).slice(0, 1);
      } else {
        subArray = (i === 1 || i === 0 || i === 2) ? this.randomArray(subArray).slice(0, 2) : this.randomArray(subArray).slice(0, 1);
      }
      PositionArray.push(...subArray);
    }
    this.randomPosition = this.randomArray(PositionArray);
    this.randomObjectConfig = this.randomArray(this.ObjectsConfig).slice(0, this.countImage);
    this.sortedPosition = this.randomPosition.slice().sort((a, b) => a.index - b.index);
    this.languageService.loadLanguage().subscribe(response => {
      this.language = response.pcprepkit.stages.prevention.stridesAgainst;
    });

    this.dashboardService.getProgressStatus().subscribe(res => {
      this.completed = this.sharedDataService.checkProgress(4, 2, res);
    });

    this.paper = Raphael(this.gameArea.nativeElement, 800, 450);
    // Setting Background
    const bgItem = this.BackgroundConfig;
    this.paper.image(bgItem.imageURL, bgItem.imageX, bgItem.imageY, bgItem.imageWidth, bgItem.imageHeight);
    // Positioning Man
    const manItem = this.ManConfig;
    this.man = this.paper.image(manItem.imageURL, manItem.imageX, manItem.imageY, manItem.imageWidth, manItem.imageHeight);
    // Positioning objects in different positions
    this.randomObjectConfig.forEach((el, i) => {
      const item = el.element;
      const imageIndex = el.index;
      const imagePositionIndex = this.randomPosition[i].index;
      this.paperConfig.push({imageIndex: imageIndex, imagePositionIndex: imagePositionIndex});
      const position = this.randomPosition[i].position;
      this.elements.push(this.paper.image(item.imageURL, position.imageX, position.imageY, item.imageWidth, item.imageHeight));
    });
    this.man.click(() => {
      this.afterClick();

    });
    this.man.hover(() => {
      this.gameArea.nativeElement.style.cursor = 'pointer';
    }, () => {
      this.gameArea.nativeElement.style.cursor = 'default';
    });
  }
}




