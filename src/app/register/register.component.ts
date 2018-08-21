import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';

import { RegService } from '../services/reg.service';
import { LanguageService } from '../services/language.service';
import { emailRegex, passwordRegex } from './Regex';
import { Validation } from './Validators';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})


export class RegisterComponent implements OnInit {
    regForm: FormGroup;
    language: any;
    header: any;
    errorMessage: string;
    disableButton = true;
    authMessages: any;
    hide = true;

    constructor(private _regService: RegService, private _router: Router, fb: FormBuilder, private _langService: LanguageService, private _toastrService: ToastrService) {
        this.regForm = fb.group({
            fname : [null, Validators.compose([Validators.required])],
            lname : [null],
            email : [null, Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
            password : [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern(passwordRegex)])],
            confirmpassword : [null, Validators.compose([Validators.required])]
        }, { validator: Validation.ConfirmPasswordValidator});
    }
    ngOnInit() {
        this._langService.loadLanguage().subscribe(response => {
            this.language = response.pcprepkit.registration;
            this.header = response.pcprepkit.common.header;
            this.authMessages = response.pcprepkit.authMessages;
        });
     }
    onSubmit = function(form: any) {
        this.disableButton = false;
        this.errorMessage = '';
        this._regService.registerUser(form).subscribe((successful: boolean): void => {
            if (successful) {
              this._router.navigateByUrl('/login');
              this._toastrService.info(this.language.messages.successMessage);

            } else {
                this.disableButton = true;
                this.errorMessage = 'Registration Unsuccesful';
            }
        }, err => {
            this.disableButton = true;
            this.errorMessage = JSON.stringify(err.error);
        });
    };
}
