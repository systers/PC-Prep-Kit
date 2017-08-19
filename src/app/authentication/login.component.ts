import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { LanguageService } from '../services/language.service';
import { SharedDataService } from '../services/shared.data.service';

import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    errorMessage: String;
    pcprepkitlogo: String;
    language: any;
    header: any;
    authMessages: any;

    constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private _sharedData: SharedDataService, private _activatedRoute: ActivatedRoute, private _langService: LanguageService, private _authService: AuthService, private _router: Router, fb: FormBuilder) {
        this.toastr.setRootViewContainerRef(vcr);
        this.loginForm = fb.group({
            'email' : [null, Validators.compose([Validators.required, Validators.pattern('[^ @]*@[^ @]*')])],
            'password' : [null, Validators.compose([Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')])]
        });
        this._langService.loadLanguage().subscribe(response => {
            this.language = response.pcprepkit.login;
            this.header = response.pcprepkit.common.header;
            this.authMessages = response.pcprepkit.authMessages;
        });
        this.pcprepkitlogo = '../../assets/img/prepkitlogo.png';
    }

    ngOnInit() {
        const message = this._activatedRoute.snapshot.queryParams['msg'];
        const error = this._activatedRoute.snapshot.queryParams['err'];
        if (message) {
            this._sharedData.customSuccessAlert(decodeURIComponent(message), 'Complete!');
        } else if (error) {
            this._sharedData.customErrorAlert(decodeURIComponent(error), 'Error!');
        }
    }

    onSubmit(form: any): void {
        this._authService.loginUser(form).subscribe((successful: boolean): void => {
            if (successful) {
                this._router.navigateByUrl('/');
            } else {
                this.errorMessage = this.authMessages.errors.loginError;
            }
        }, err => {
            this.errorMessage = err.info;
        });
    }
}
