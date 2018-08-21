import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-meds-n-labels',
  templateUrl: './meds-n-labels.component.html',
  styleUrls: ['./meds-n-labels.component.scss']
})
export class MedsNLabelsComponent implements OnInit {
    public language: any;
    constructor(private _langService: LanguageService) { }

    ngOnInit() {
        this._langService.loadLanguage().subscribe(response => {
            this.language = response.pcprepkit.stages.medsNLabels;
        });
    }
}
