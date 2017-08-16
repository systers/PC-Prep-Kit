import { Component, OnInit } from '@angular/core';
import { InfokitService } from '../services/infokit.service';

@Component({
    selector: 'app-infokit',
    templateUrl: './infokit.component.html',
    styleUrls: ['./infokit.component.scss']
})
export class InfokitComponent implements OnInit {
    private static _localStorageKey = 'pcprepkitUser';
    // sets infokit visible/Invisible Default : Invisible
    public infokitState = false;
    public infokitAvailable = false;
    /**
     * sets the Infokit Information to visible/Invisible Default : Invisible.
     * When Infokit Information is Invisible the Infokit Selector is Visible and Vice Versa.
     */
    public showInfo = false;
    // sets the visiblility of the Icons in Infokit Selector
    public infokitActive = [
        {key: 'malaria_def', value: false, def: 'Malaria'},
        {key: 'pc_policy', value: false, def: 'Peace Corps Policy'},
        {key: 'animation', value: false, def: 'Animation'},
        {key: 'do_dont', value: false, def: 'Do\'s and Don\'ts'},
        {key: 'odd_one_out', value: false, def: 'Odd One Out'},
        {key: 'match_meds', value: false, def: 'Side Effects'},
        {key: 'side_effects', value: false, def: 'Match the Meds'},
        {key: 'doctor_info', value: false, def: 'Doctor Information'},
    ];
    // Sets the Heading In Infokit Pop Up
    public heading = 'Info Kit';
    // Sets the Content In Infokit Pop Up
    public infoContent = 'loading...';

    constructor(private _infokitService: InfokitService) { }

    /**
     * Get data from Infokit API
     */
    ngOnInit() {
        this.getData();
    }

    /**
     * Update the Infokit Information from the APIs. set Infokit to Visible from Invisible and vice Versa
     * Reset the Headings and Content
     */
    pop() {
        this.getData();
        this.showInfo = false;
        this.heading = 'Info Kit';
        this.infoContent = 'loading...';
        this.infokitState = !this.infokitState;
    }
    /**
     * Updates Information to be displayed by Infokit Popup and Sets Information to Visible
     * @param  {String} activity Provies Information about the section selected in Infokit Selector
     */

    info(activity) {
        this.heading = activity;
        this.showInfo = true;
        this.infoContent = 'this contains information about ' + activity;
    }

    /**
     * Gets Infromation from the Infokit API
     */
    getData() {
      this.infokitAvailable = false;
      if (localStorage.getItem(InfokitComponent._localStorageKey)) {
          this._infokitService.infokitactive().subscribe(response => {
              for (let info of this.infokitActive) {
                  info.value = response.infokitactive[info.key];
              }
          });
      }

      for (let info of this.infokitActive) {
          if (info.value) {
              this.infokitAvailable = true;
              break;
          }
      }
    }
}
