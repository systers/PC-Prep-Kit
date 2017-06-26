import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-pcpolicy',
  templateUrl: './pcpolicy.component.html',
  styleUrls: ['./pcpolicy.component.scss']
})
export class PcpolicyComponent implements OnInit {
  email:String;
  public position="col-md-10 col-md-offset-2 pcpolicybody";
  constructor(private _dashboardService: DashboardService) { }

  ngOnInit() {
    this._dashboardService.getUserInfo().subscribe(response => {
        this.email = response.user.email;
    });
  }

  toggle(){
  		if(this.position=="col-md-10 col-md-offset-2 pcpolicybody"){
            this.position='col-md-12 pcpolicybody';
            console.log("toggled");
        }else{
            this.position='col-md-10 col-md-offset-2 pcpolicybody';
             console.log("toggled");
        }
  }

  mail(){
    this._dashboardService.mailpcpolicy().subscribe(response => {
      console.log("Check Mail");
    });
    }
}
