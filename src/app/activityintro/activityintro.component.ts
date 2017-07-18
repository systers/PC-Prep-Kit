import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activityintro',
  templateUrl: './activityintro.component.html',
  styleUrls: ['./activityintro.component.scss']
})


export class ActivityintroComponent {
    public position = 'col-md-10 col-md-offset-2';
    constructor() { }
    toggle() {
        this.position = (this.position === 'col-md-10 col-md-offset-2') ? 'col-md-12' : 'col-md-10 col-md-offset-2';
    }
}
