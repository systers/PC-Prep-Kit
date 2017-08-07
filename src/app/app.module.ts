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
import { PcpolicyComponent } from './pcpolicy/pcpolicy.component';
import { SplashscreenComponent } from './splashscreen/splashscreen.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ActivityintroComponent } from './activityintro/activityintro.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { InfokitComponent } from './infokit/infokit.component';
import { DragdropComponent } from './dragdrop/dragdrop.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { HighlightActivityComponent } from './introduction/highlight-activity.component';
import { PicturePuzzleComponent } from './introduction/picture-puzzle.component';
import { MedsNLabelsComponent } from './meds-n-labels/meds-n-labels.component';
import { MemoryGameComponent } from './meds-n-labels/activity-2/activity-2.component';

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
        InfokitComponent,
        InfokitPipe,
        DragdropComponent,
        MedsNLabelsComponent,
        MemoryGameComponent
        IntroductionComponent,
        HighlightActivityComponent,
        PicturePuzzleComponent
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
