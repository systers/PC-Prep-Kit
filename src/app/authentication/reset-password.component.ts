import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidation } from './password-validation';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./login.component.scss']
})
export class ResetPasswordComponent implements OnInit {

    resetPasswordForm: FormGroup;
    token: String;
    errorMessage: String;
    successMessage: String;

    constructor(private _authService: AuthService,  private _router: Router,  private _route: ActivatedRoute, fb: FormBuilder) {
        this.resetPasswordForm = fb.group({
            'password' : [null, Validators.compose([Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')])],
            'confirmPassword' : [null, Validators.compose([Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')])]
        }, {
            validator: PasswordValidation.MatchPassword // your validation method
        });
    }

    ngOnInit() {
        this._route.params.subscribe(params => {
            this.token = params['token'];
        });
    }

    onSubmit(form: any): void {
        this._authService.updatePassword(form, this.token).subscribe(res => {
            if (res.info) {
                this.successMessage = '';
                this.errorMessage = res.info;
            } else {
                this.successMessage = res.success;
                this.errorMessage = '';
                this._router.navigateByUrl('/login');
            }
        }, err => {
            this.errorMessage = err.error;
            this.successMessage = '';
        });
    }
}
