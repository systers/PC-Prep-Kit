import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { InfokitService } from '../../services/infokit.service';
import { LanguageService } from '../../services/language.service';
import { DashboardService } from '../../services/dashboard.service';
import { SharedDataService } from '../../services/shared.data.service';
import { PerformanceDisplayService } from '../../services/performance-display.service';
import { ActivatedRoute } from '@angular/router';
import { LeaderBoardService } from '../../services/leaderBoard.service';

@Component({
    selector: 'app-dragdrop',
    templateUrl: './activity-2.component.html',
    styleUrls: ['./activity-2.component.scss']
})

export class DragdropComponent implements OnInit {
    public dropCheckDo: String;
    public dropCheckDont: String;
    language: any;
    private score = 0;
    private readonly POINTS_PER_CORRECT_ANSWER = 10;
    public readonly CURR_STAGE = 4;
    private readonly ACTIVITY = 'dragAndDrop';
    private readonly DO = 'do';
    private readonly DONT = 'dont';
    public submitEnabled = false;
    public submitted = false;
    public answerDo = '';
    public answerDont = '';
    private Solutions;

    private _status: object = {stage: 2, activity: 2};

    public activityComplete = false;
    /**
     * To change the postion of contents along with Body
     */
    public position= 'col-md-10 col-md-offset-2 introbody';
    public completed = false;
    public alerts: any;
    public readonly LEVEL_CONFIG = [5, 7, 10];
    public noOfDosAndDonts;
    public level: number;

    /**
     * dosAndDonts description with the values,the same order will be displayed
     * The objects which are dragged and dropped into Dos or Don'ts Boxes will be deleted from the list
     */
    dosAndDonts: { description: string, value: string }[] = [
        { description: 'Contaminated water around should be disposed.', value: 'do' },
        { description: 'Play outdoors in shorts and half/without sleeves clothes.', value: 'dont' },
        { description: 'Use mosquito repellent.', value: 'do' },
        { description: 'Body should be covered as much as possible.', value: 'do' },
        { description: 'Travel to malaria spread region during pregnancy.', value: 'dont' },
        { description: 'Eat digestible and light foods during malaria fever.', value: 'do' },
        { description: 'Ensure hygiene.', value: 'do' },
        { description: 'Unscreened doors and windows Open.', value: 'dont' },
        { description: 'Herbal fumigation.', value: 'do' },
        { description: 'Contaminated blood transfusion.', value: 'dont' }
    ];

    /**
     *Empty Array of Objects which populates as the descriptions are dorpped into the Dos/ Donts Box
     */
    do: { description: string, value: string }[]  = [];
    dont: { description: string, value: string }[]  = [];

    box1 = this.DO;
    box2 = this.DONT;

    ngOnInit() {
      this._langService.loadLanguage().subscribe(response => {
          this.language = response.pcprepkit.stages.malaria101.dragdrop;
          this.alerts = response.pcprepkit.common.alerts;
      });
      this._route.params.subscribe( params => {
        this.noOfDosAndDonts = this.LEVEL_CONFIG[ params.level - 1];
        this.level =  parseInt(params.level, 10);
      });
      this.shuffle(this.dosAndDonts);
      this.dosAndDonts.splice(this.noOfDosAndDonts);
      this.dosAndDonts.forEach( (element) => {
        (element.value === this.DO) ? this.answerDo += element.description + ' ' : this.answerDont += element.description + ' ';
      });
      this.Solutions = '<b>Dos</b><br>' + this.answerDo + '<br><b>Don\'ts</b><br>' + this.answerDont;
    }

  /**
   * Shuffle the questions and answers
   * @param {Array} array The array that has to be shuffled
   */
    shuffle(array) {
      let currentIndex = array.length, temporaryValue, randomIndex;
      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    }
    /**
     * Checks if the Content is valid before dropping
     * Removes the Object from dosAndDonts Array and fill it in either do or dont array, Check if the dosAndDonts Array is empty
     * @param  {any}    $event Event Object when any Statement object is dragged and dropped
     * @param  {String} $box   The box where the object is supposed to be dropped
     */

    addTobox($event: any, $box: String) {
      this.reset();
      let cumulativePoints = this.POINTS_PER_CORRECT_ANSWER;
      if ($box === this.DO) {
        this.do.push($event.dragData);
        if (this.dont.indexOf($event.dragData) > -1) {
          this.dont.splice(this.dont.indexOf($event.dragData), 1);
          cumulativePoints *= 2;
        }
      }

      if ($box === this.DONT  ) {
        this.dont.push($event.dragData);
        if (this.do.indexOf($event.dragData) > -1) {
          this.do.splice(this.do.indexOf($event.dragData), 1);
          cumulativePoints *= 2;
        }
      }
      ($event.dragData.value === $box) ? this.score += cumulativePoints : this.score -= cumulativePoints;
      if (this.dosAndDonts.indexOf($event.dragData) > -1) {
        this.dosAndDonts.splice(this.dosAndDonts.indexOf($event.dragData), 1);
      }
      if (!this.dosAndDonts.length && !this.submitted) {
        this.submitEnabled = true;
      }
     }
    reset() {
        this.dropCheckDo = '';
        this.dropCheckDont = '';
    }
    /**
     * Change the Size of the content when Sidebar is toggled
     */
    toggle() {
        this.position = (this.position === 'col-md-10 col-md-offset-2') ? 'col-md-12' : 'col-md-10 col-md-offset-2';
    }

    /**
     * Display the completion Message and Activate Infokit for the activity.
     */
    onComplete() {
      this.submitEnabled = false;
      this.submitted = true;
      this.score = (this.score < 0) ? 0 : this.score;
      this._dashboardService.getActivityScore({activity: this.ACTIVITY}).subscribe( res => {
        if ((res.score < this.score)) {
          // ensuring best possible score
          const prevScore = res.score;
          this._dashboardService.updateActivityScore({activity: this.ACTIVITY, score: this.score}).subscribe(() => {
            this._leaderBoardService.updateLeaderBoard({activity: this.ACTIVITY, score: this.score, prevScore: prevScore})
          });
        }
      });
        this.activityComplete = true;
        this._sharedData.customAlert(this.language.answerMessage, this.Solutions, 'info');
        this._dashboardService.updateProgressStatus(this._status).subscribe(response => {});
        this._infokitService.activateinfokit('do_dont').subscribe(res => {});
        if (!this.completed) {
          this._dashboardService.updateActivityLevel({activity: 'dragAndDrop', level: this.level}).subscribe(() => {});
          if (this.level === 1) {
          this._performanceService.openDialog(this.CURR_STAGE);
          }
        }

    }

    resetQuestions() {
      location.reload();
    }

    getScore() {
      return this.score;
    }

    constructor(private _dashboardService: DashboardService, private _sharedData: SharedDataService, private _infokitService: InfokitService,  vcr: ViewContainerRef, private _langService: LanguageService,
                private _performanceService: PerformanceDisplayService, private _route: ActivatedRoute, private _leaderBoardService: LeaderBoardService
    ) {
        this._dashboardService.getProgressStatus().subscribe(response => {
            this.completed = this._sharedData.checkProgress(2, 2, response);
        });
    }
}
