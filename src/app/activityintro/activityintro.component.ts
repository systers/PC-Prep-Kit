import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../services/shared.data.service';

import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-activityintro',
  templateUrl: './activityintro.component.html',
  styleUrls: ['./activityintro.component.scss']
})

export class ActivityintroComponent implements OnInit {
    public position: string;
    language: any;
    constructor(private _langService: LanguageService, private _sharedData: SharedDataService) {
        this._sharedData.position.subscribe(
            value => {
                this.position = value;
            }
        );
    }

    ngOnInit() {
      this._langService.loadLanguage().subscribe(response => {
          this.language = response.pcprepkit.stages.introduction.activityintro;
      });
    }
}

