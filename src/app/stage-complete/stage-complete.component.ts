import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SharedDataService } from '../services/shared.data.service';
import { LanguageService } from '../services/language.service';

@Component({
    selector: 'app-stage-complete',
    templateUrl: './stage-complete.component.html',
    styleUrls: ['./stage-complete.component.scss']
})

export class StageCompleteComponent implements OnInit {
    language: any;
    stageName: string;
    public position: string;
    constructor(private _langService: LanguageService, private _activatedRoute: ActivatedRoute, private _sharedData: SharedDataService) { }

    ngOnInit() {
        this._langService.loadLanguage().subscribe(response => {
            this.language = response.pcprepkit.common.stageComplete;
        });
        this.stageName = this._activatedRoute.snapshot.queryParams['stage'];
        this._sharedData.position.subscribe(
            value => {
                this.position = value;
            }
        );
    }

}
