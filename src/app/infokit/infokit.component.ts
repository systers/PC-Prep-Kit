import { Component, OnInit } from '@angular/core';
import { InfokitService } from '../services/infokit.service';
import { LanguageService } from '../services/language.service';
import { BadgeConfig } from '../badge/Config';
import { BadgeService } from '../services/BadgeService/badge.service';
import { Badge } from '../badge/models/badgeModel';

@Component({
    selector: 'app-infokit',
    templateUrl: './infokit.component.html',
    styleUrls: ['./infokit.component.scss']
})
export class InfokitComponent implements OnInit {
    private static _localStorageKey = 'pcprepkitUser';
    language: any;
    // sets infokit visible/Invisible Default : Invisible
    public infokitState = false;
    public infokitAvailable = false;
    public badgesAvailable = false;
    /**
     * sets the Infokit Information to visible/Invisible Default : Invisible.
     * When Infokit Information is Invisible the Infokit Selector is Visible and Vice Versa.
     */
    public showInfo = false;
    // sets the visiblility of the Icons in Infokit Selector
    public infokitActive = [
        {key: 'malaria_def', value: false, def: 'Malaria', img: 'malaria.png'},
        {key: 'pc_policy', value: false, def: 'Peace Corps Policy', img: 'pcpolicy.png'},
        {key: 'animation', value: false, def: 'Animation', img: 'lifecycle.png'},
        {key: 'do_dont', value: false, def: 'Do\'s and Don\'ts', img: 'dodont.png'},
        {key: 'odd_one_out', value: false, def: 'Odd One Out', img: 'malariainfo.png'},
        {key: 'match_meds', value: false, def: 'Match the Meds', img: 'meds.png'},
        {key: 'side_effects', value: false, def: 'Side Effects', img: 'sideeffects.png'},
        {key: 'doctor_info', value: false, def: 'Doctor Information', img: 'doctor.png'},
        {key: 'stop_Breed', value: false, def: 'StopTheBreed', img: 'stopBreed.png'},
        {key: 'stride_Against', value: false, def: 'StrideAgainstMalaria', img: 'strideAgainst.png'}
    ];

    // Sets the Heading In Infokit Pop Up
    public heading;
    // Sets the Content In Infokit Pop Up
    public infoContent;
    public badgeNumber: number;
    public activeBadges: Array<Badge> = [];

    constructor(private _infokitService: InfokitService, private _langService: LanguageService,
                private _badgeService: BadgeService) { }

    /**
     * Get data from Infokit API
     */
    ngOnInit() {
        this.getData();
        this._langService.loadLanguage().subscribe(response => {
            this.language = response.pcprepkit.common.infokit;
            this.heading = this.language.headings.heading_main;
            this.infoContent = this.language.messages.loadingMessage;
        });
    }

    /**
     * Update the Infokit Information from the APIs. set Infokit to Visible from Invisible and vice Versa
     * Reset the Headings and Content
     */
    pop() {
        this.getData();
        this.getBadges();

        this.showInfo = false;
        this.infokitState = !this.infokitState;
    }
    /**
     * Updates Information to be displayed by Infokit Popup and Sets Information to Visible
     * @param  {String} activity Provies Information about the section selected in Infokit Selector
     */

    info(activity, key) {
        this.heading = activity;
        this.showInfo = true;
        this.infoContent = this.language[key];
    }

    badgeInfo(name, message) {
      this.heading = name;
      this.showInfo = true;
      this.infoContent = message;
    }

    /**
     * Gets Infromation from the Infokit API
     */
    getData() {
        if (localStorage.getItem(InfokitComponent._localStorageKey)) {
            this._infokitService.infokitactive().subscribe(response => {
                for (const info of this.infokitActive) {
                    info.value = response.infokitactive[info.key];
                }

                for (const info of this.infokitActive) {
                    if (info.value) {
                        this.infokitAvailable = true;
                        break;
                    }
                }
            });
        }
    }
  getBadges() {
      if (localStorage.getItem(InfokitComponent._localStorageKey)) {
        this._badgeService.getBadgeNumber().subscribe( res => {
          this.badgeNumber = res;
          BadgeConfig.splice(this.badgeNumber + 1);
          this.activeBadges = BadgeConfig;
          if (this.activeBadges.length) {this.badgesAvailable = true; }
        });
      }}
}

