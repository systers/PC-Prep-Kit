import { Component, OnInit } from '@angular/core';
import { NgForm }    from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
    selector: 'forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./login.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

    resetForm : FormGroup;
    errorMessage : String;
    successMessage : String;

    constructor(private _authService: AuthService, fb: FormBuilder) {
        this.resetForm = fb.group({
            'email' : [null, Validators.compose([Validators.required, Validators.pattern("[^ @]*@[^ @]*")])]
        });
    }

    ngOnInit() {
    }

    onSubmit(form: any): void {
        this._authService.resetPassword(form).subscribe(res => {
            this.errorMessage = "";
            this.successMessage = res.success;
        },err => {
            this.successMessage = "";
            this.errorMessage = err.error;
        });   
    }
}
