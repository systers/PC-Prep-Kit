import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activityintro',
  templateUrl: './activityintro.component.html',
  styleUrls: ['./activityintro.component.scss']
})


export class ActivityintroComponent implements OnInit {
  public position="col-md-10 col-md-offset-2 introbody";

  constructor() { }

  ngOnInit() {}

  toggle(){
  		if(this.position=="col-md-10 col-md-offset-2 introbody"){
            this.position='col-md-12 introbody';
            console.log("toggled");
        }else{
            this.position='col-md-10 col-md-offset-2 introbody';
             console.log("toggled");
        }
  }

}
