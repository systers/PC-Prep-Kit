import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RegService } from '../services/reg.service';
import { LanguageService } from '../services/language.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})


export class RegisterComponent implements OnInit {
    regForm: FormGroup;
    language: any;
    header: any;
    errorMessage: String;
    disableButton = true;
    isFocused = false;
    authMessages: any;

    constructor(private _regService: RegService, private _router: Router, fb: FormBuilder, private _langService: LanguageService) {
        this.regForm = fb.group({
            fname : [null, Validators.compose([Validators.required])],
            lname : [null, Validators.compose([Validators.required])],
            email : [null, Validators.compose([Validators.required, Validators.pattern('[^ @]*@[^ @]*')])],
            password : [null, Validators.compose([Validators.required,
              Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')])],
            confirmpassword : [null, Validators.compose([Validators.required])]
        });
    }

    ngOnInit() {
        this._langService.loadLanguage().subscribe(response => {
            this.language = response.pcprepkit.registration;
            this.header = response.pcprepkit.common.header;
            this.authMessages = response.pcprepkit.authMessages;
        });
     }

    onFocus() {
        this.errorMessage = '';
        this.isFocused = true;
    }

    onBlur() {
        this.isFocused = false;
    }

    onSubmit = function(form: any) {
        this.disableButton = false;
        this.errorMessage = '';
        this._regService.registerUser(form).subscribe((successful: boolean): void => {
            if (successful) {
                this._router.navigateByUrl('/login');
            } else {
                this.disableButton = true;
                this.errorMessage = 'Registration Unsuccesful';
            }
        }, err => {
            this.disableButton = true;
            this.errorMessage = err.error;
        });
    };
}
