import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})


export class HeaderComponent implements OnInit {
  @Output() togglenavbar=new EventEmitter<any>();
  navbartoggle(){
  	console.log("Toggle pressed");
  	this.togglenavbar.emit();
  }

  constructor(private _authService: AuthService , private _router: Router) { }

  ngOnInit() {
  }

  logout() {
      this._authService.logout().subscribe(
          data => {
              if (!data.loggedOut) {
                  this._router.navigate(['/login']);
              }
          });
  }

}
