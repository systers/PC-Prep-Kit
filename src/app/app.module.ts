import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DndModule } from 'ng2-dnd';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';

import { LoggedInGuard } from './guards/logged-in.guard';
import { UnauthenticatedGuard } from './guards/unauthenticated.guard';
import { LoginComponent } from './authentication/login.component';
import { ForgotPasswordComponent } from './authentication/forgot-password.component';
import { ResetPasswordComponent } from './authentication/reset-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PcpolicyComponent } from './introduction/activity-2/pcpolicy.component';
import { SplashscreenComponent } from './splashscreen/splashscreen.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ActivityintroComponent } from './introduction/activityintro/activityintro.component';
import { ActivityindicatorComponent } from './activityindicator/activityindicator.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { InfokitComponent } from './infokit/infokit.component';
import { DragdropComponent } from './malaria-101/activity-2/dragdrop.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { HighlightActivityComponent } from './introduction/highlight-activity.component';
import { PicturePuzzleComponent } from './introduction/picture-puzzle.component';
import { MedsNLabelsComponent } from './meds-n-labels/meds-n-labels.component';
import { MemoryGameComponent } from './meds-n-labels/activity-2/activity-2.component';
import { MatchmedsComponent } from './meds-n-labels/activity-1/matchmeds.component';
import { Malaria101Component } from './malaria-101/malaria-101.component';
import { AnimatedVideoComponent } from './malaria-101/activity-1/activity-1-1.component';
import { MalariaLifeCycleComponent } from './malaria-101/activity-1/activity-1-2.component';

import { DashboardService } from './services/dashboard.service';
import { AuthService } from './services/auth.service';
import { APIService } from './services/api.service';
import { RegService } from './services/reg.service';
import { NavbarService } from './services/navbar.service';
import { InfokitService } from './services/infokit.service';
import { InfokitPipe } from './infokit/infokit.pipe';
import { LanguageService } from './services/language.service';
import { SharedDataService } from './services/shared.data.service';

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        LoginComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent,
        PcpolicyComponent,
        SplashscreenComponent,
        RegisterComponent,
        NavbarComponent,
        ActivityintroComponent,
        HeaderComponent,
        MenuComponent,
        ActivityindicatorComponent,
        InfokitComponent,
        InfokitPipe,
        DragdropComponent,
        MedsNLabelsComponent,
        MemoryGameComponent,
        IntroductionComponent,
        HighlightActivityComponent,
        PicturePuzzleComponent,
        MatchmedsComponent,
        Malaria101Component,
        AnimatedVideoComponent,
        MalariaLifeCycleComponent
    ],
    imports: [
        AppRoutingModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        DndModule.forRoot(),
        ToastModule.forRoot()
    ],
    providers: [DashboardService, AuthService, LoggedInGuard, UnauthenticatedGuard, APIService, RegService, NavbarService,
      SharedDataService, InfokitService, LanguageService],
    bootstrap: [AppComponent]
})
export class AppModule { }
