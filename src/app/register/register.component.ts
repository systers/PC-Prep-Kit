import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RegService } from '../services/reg.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})


export class RegisterComponent {
    regForm: FormGroup;

    constructor(private _regService: RegService, private _router: Router, fb: FormBuilder) {
        this.regForm = fb.group({
            fname : [null, Validators.compose([Validators.required])],
            lname : [null, Validators.compose([Validators.required])],
            email : [null, Validators.compose([Validators.required, Validators.pattern('[^ @]*@[^ @]*')])],
            password : [null, Validators.compose([Validators.required,
              Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')])],
            confirmpassword : [null, Validators.compose([Validators.required])]
        });
    }

    onSubmit = function(form: any) {
        this._regService.registerUser(form).subscribe((successful: boolean): void => {
            if (successful) {
                this._router.navigateByUrl('/login');
            } else {
                this.errorMessage = 'Registration Unsuccesful';
            }
        }, err => {
            this.errorMessage = err.info;
        });
    };
}
