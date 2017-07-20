import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../services/shared.data.service';

@Component({
  selector: 'app-activityintro',
  templateUrl: './activityintro.component.html',
  styleUrls: ['./activityintro.component.scss']
})


export class ActivityintroComponent {
    public position: string;
    constructor(private _sharedData: SharedDataService) {
        this._sharedData.position.subscribe(
            value => {
                this.position = value;
            }
        );
    }
}

