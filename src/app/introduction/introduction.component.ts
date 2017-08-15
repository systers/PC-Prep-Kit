import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../services/language.service';
@Component({
    selector: 'app-introduction',
    templateUrl: './introduction.component.html',
    styleUrls: ['./introduction.component.scss']
})

export class IntroductionComponent implements OnInit {
    language: any;

    constructor(private _langService: LanguageService) {}

    ngOnInit() {
        this._langService.loadLanguage().subscribe(response => {
            this.language = response.pcprepkit.stages.introduction;
        });
    }
}
