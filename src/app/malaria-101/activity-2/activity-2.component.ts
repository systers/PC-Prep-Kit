import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { InfokitService } from '../../services/infokit.service';
import { LanguageService } from '../../services/language.service';
import { DashboardService } from '../../services/dashboard.service';
import { SharedDataService } from '../../services/shared.data.service';

@Component({
    selector: 'app-dragdrop',
    templateUrl: './activity-2.component.html',
    styleUrls: ['./activity-2.component.scss']
})

export class DragdropComponent implements OnInit {
    public dropCheckDo: String;
    public dropCheckDont: String;
    language: any;
    private _status: object = {stage: 2, activity: 2};

    public activityComplete = false;
    /**
     * To change the postion of contents along with Body
     */
    public position= 'col-md-10 col-md-offset-2 introbody';
    public completed = false;
    public alerts: any;

    /**
     * dosAndDonts description with the values,the same order will be displayed
     * The objects which are dragged and dropped into Dos or Don'ts Boxes will be deleted from the list
     */
    dosAndDonts: { description: String, value: String }[] = [
        { description: 'Contaminated water around should be disposed.', value: 'do' },
        { description: 'Play outdoors in shorts and half/without sleeves clothes.', value: 'dont' },
        { description: 'Use mosquito repellent', value: 'do' },
        { description: 'Body should be covered as much as possible', value: 'do' },
        { description: 'travel to malaria spread region during pregnancy.', value: 'dont' },
        { description: 'eat digestible and light foods during malaria fever.', value: 'do' },
        { description: 'Ensure hygiene', value: 'do' },
        { description: 'unscreened doors and windows Open.', value: 'dont' },
        { description: 'Herbal fumigation', value: 'do' },
        { description: 'contaminated blood transfusion', value: 'dont' }
    ];

    /**
     *Empty Array of Objects which populates as the descriptions are dorpped into the Dos/ Donts Box
     */
    do: { description: String, value: String }[]  = [];
    dont: { description: String, value: String }[]  = [];

    box1 = 'do';
    box2 = 'dont';

    ngOnInit() {
      this._langService.loadLanguage().subscribe(response => {
          this.language = response.pcprepkit.stages.malaria101.dragdrop;
          this.alerts = response.pcprepkit.common.alerts;
      });
    }

    /**
     * Checks if the Content is valid before dropping
     * Removes the Object from dosAndDonts Array and fill it in either do or dont array, Check if the dosAndDonts Array is empty
     * @param  {any}    $event Event Object when any Statement object is dragged and dropped
     * @param  {String} $box   The box where the object is supposed to be dropped
     */

    addTobox($event: any, $box: String) {
        this.reset();
        if ($event.dragData.value === $box) {
            $box === 'do' ? this.do.push($event.dragData) : this.dont.push($event.dragData);
            this.dosAndDonts.splice(this.dosAndDonts.indexOf($event.dragData), 1);
            if (!this.dosAndDonts.length) {
                this.onComplete();
            }
        }
     }

    /**
     * Checks if the content is valid to add border to the drop box
     * @param  {any}    $event Event Object when any Statement object is dragged and dropped
     * @param  {String} $box   The box on which the content is dropped
     */
    checkDrop($event: any, $box: String) {
        if ($event.dragData.value !== $box) {
            $box === 'do' ?  this.dropCheckDo = 'wrong-drop' : this.dropCheckDont = 'wrong-drop';
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
        this.activityComplete = true;
        this._sharedData.customSuccessAlert(this.alerts.activitySuccessMsg, this.alerts.activitySuccessTitle);
        this._dashboardService.updateProgressStatus(this._status).subscribe(response => {});
        this._infokitService.activateinfokit('do_dont').subscribe(res => {});
    }

    constructor(private _dashboardService: DashboardService, private _sharedData: SharedDataService, private _infokitService: InfokitService, public toastr: ToastsManager, vcr: ViewContainerRef, private _langService: LanguageService) {
        this.toastr.setRootViewContainerRef(vcr);
        this._dashboardService.getProgressStatus().subscribe(response => {
            this.completed = this._sharedData.checkProgress(2, 2, response);
        });
    }
}
