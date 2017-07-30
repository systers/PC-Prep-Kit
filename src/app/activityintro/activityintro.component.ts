import { Component, OnInit } from '@angular/core';

import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-activityintro',
  templateUrl: './activityintro.component.html',
  styleUrls: ['./activityintro.component.scss']
})


export class ActivityintroComponent implements OnInit {
    public position = 'col-md-10 col-md-offset-2';
    language: any;
    constructor(private _langService: LanguageService) {}

    ngOnInit() {
      this._langService.loadLanguage().subscribe(response => {
          this.language = response.pcprepkit.dragdrop;
      });
    }

    toggle() {
        this.position = (this.position === 'col-md-10 col-md-offset-2') ? 'col-md-12' : 'col-md-10 col-md-offset-2';
    }
}
