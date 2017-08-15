import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../services/language.service';

@Component({
    selector: 'app-malaria-101',
    templateUrl: './malaria-101.component.html',
    styleUrls: ['./malaria-101.component.scss']
})

export class Malaria101Component implements OnInit {
    language: any;
    constructor(private _langService: LanguageService) { }

    ngOnInit() {
        this._langService.loadLanguage().subscribe(response => {
            this.language = response.pcprepkit.stages.malaria101;
        });
    }
}
