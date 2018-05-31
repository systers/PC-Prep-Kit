import {Component, OnInit} from '@angular/core';
import {LanguageService} from '../../services/language.service';

@Component({
    selector: 'app-activity-1-1',
    templateUrl: './activity-1-1.component.html',
    styleUrls: ['../malaria-101.component.scss']
})
export class AnimatedVideoComponent implements OnInit {
    public completed = true;
    public language: any;
    constructor(private _langService: LanguageService) { }

    ngOnInit() {
        this._langService.loadLanguage().subscribe(response => {
            this.language = response.pcprepkit.stages.malaria101.lifecycle;
        });
    }
}
