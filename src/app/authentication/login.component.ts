import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    loginForm: FormGroup;
    errorMessage: String;
    pcprepkitlogo: String;

    constructor(private _authService: AuthService, private _router: Router, fb: FormBuilder) {
        this.loginForm = fb.group({
            'email' : [null, Validators.compose([Validators.required, Validators.pattern('[^ @]*@[^ @]*')])],
            'password' : [null, Validators.compose([Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')])]
        });
        this.pcprepkitlogo = '../../assets/img/prepkitlogo.png';
    }

    onSubmit(form: any): void {
        this._authService.loginUser(form).subscribe((successful: boolean): void => {
            if (successful) {
                this._router.navigateByUrl('/');
            } else {
                this.errorMessage = 'Incorrect username and password, please try again';
            }
        }, err => {
            this.errorMessage = err.info;
        });
    }
}
