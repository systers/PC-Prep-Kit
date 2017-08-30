import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LanguageService } from '../services/language.service';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./login.component.scss']
})
export class ForgotPasswordComponent {

    resetForm: FormGroup;
    errorMessage: String;
    successMessage: String;
    language: any;
    header: any;
    authMessages: any;

    constructor(private _authService: AuthService, fb: FormBuilder, private _langService: LanguageService) {
        this.resetForm = fb.group({
            'email' : [null, Validators.compose([Validators.required, Validators.pattern('[^ @]*@[^ @]*')])]
        });
        this._langService.loadLanguage().subscribe(response => {
            this.language = response.pcprepkit.forgotPassword;
            this.header = response.pcprepkit.common.header;
            this.authMessages = response.pcprepkit.authMessages;
        });
    }

    onSubmit(form: any): void {
        this._authService.resetPassword(form).subscribe(res => {
            if (res.info) {
                this.errorMessage = res.info;
                this.successMessage = '';
            } else {
                this.errorMessage = '';
                this.successMessage = res.success;
            }
        }, err => {
            this.successMessage = '';
            this.errorMessage = err.error;
        });
    }
}
