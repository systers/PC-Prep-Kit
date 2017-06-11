import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';

import { LoggedInGuard } from './guards/logged-in.guard';
import { UnauthenticatedGuard } from './guards/unauthenticated.guard';
import { LoginComponent } from './authentication/login.component';
import { ForgotPasswordComponent } from './authentication/forgot-password.component';
import { ResetPasswordComponent } from './authentication/reset-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { DashboardService } from './services/dashboard.service';
import { AuthService } from './services/auth.service';
import { APIService } from './services/api.service';

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        LoginComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent
    ],
    imports: [
        AppRoutingModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        BrowserModule
    ],
    providers: [DashboardService, AuthService, LoggedInGuard, UnauthenticatedGuard, APIService],
    bootstrap: [AppComponent]
})
export class AppModule { }
