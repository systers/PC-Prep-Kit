import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DndModule } from 'ng2-dnd';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';

import { LoggedInGuard } from './guards/logged-in.guard';
import { UnauthenticatedGuard } from './guards/unauthenticated.guard';
import { LoginComponent } from './authentication/login.component';
import { ForgotPasswordComponent } from './authentication/forgot-password.component';
import { ResetPasswordComponent } from './authentication/reset-password.component';
import { PcpolicyComponent } from './introduction/activity-2/activity-2.component';
import { SplashscreenComponent } from './splashscreen/splashscreen.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ActivityintroComponent } from './introduction/activityintro/activityintro.component';
import { ActivityindicatorComponent } from './activityindicator/activityindicator.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { InfokitComponent } from './infokit/infokit.component';
import { DragdropComponent } from './malaria-101/activity-2/activity-2.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { HighlightActivityComponent } from './introduction/activity-1/activity-1.component';
import { PicturePuzzleComponent } from './introduction/activity-3/activity-3.component';
import { MedsNLabelsComponent } from './meds-n-labels/meds-n-labels.component';
import { MemoryGameComponent } from './meds-n-labels/activity-2/activity-2.component';
import { MatchmedsComponent } from './meds-n-labels/activity-1/activity-1.component';
import { Malaria101Component } from './malaria-101/malaria-101.component';
import { AnimatedVideoComponent } from './malaria-101/activity-1/activity-1-1.component';
import { MalariaLifeCycleComponent } from './malaria-101/activity-1/activity-1-2.component';
import { OddOneOutComponent } from './malaria-101/activity-3/activity-3.component';
import { StageCompleteComponent } from './stage-complete/stage-complete.component';
import { DoctorchatComponent } from './meds-n-labels/activity-3/activity-3.component';
import { UnlockedStageComponent } from './unlocked-stage/unlocked-stage.component';
import { HowToPlayComponent } from './unlocked-stage/how-to-play/howtoplay.component';
import { PreventionComponent } from './prevention/prevention.component';
import { StopTheBreedModule } from './prevention/stop-the-breed/stop-the-breed.module';
import { SharedModule } from './shared.module';

import { DashboardService } from './services/dashboard.service';
import { AuthService } from './services/auth.service';
import { APIService } from './services/api.service';
import { RegService } from './services/reg.service';
import { NavbarService } from './services/navbar.service';
import { InfokitService } from './services/infokit.service';
import { LanguageService } from './services/language.service';
import { SharedDataService } from './services/shared.data.service';
import { DoctorService } from './services/doctorchat.service';
import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from './material.module';
import { ActivityGuard } from './guards/activity.guard';
import { BadgeService } from './services/BadgeService/badge.service';
import { BadgeComponent } from './badge/badge.component';
import { CertificateComponent } from './certificate/certificate.component';
import { CertificateService } from './certificate/certificate.component';
import { PerformanceDisplayComponent } from './performance-display/performance-display.component';
import { PerformanceDisplayService } from './services/performance-display.service';
import { UserUpdateComponent } from './user-update/user-update.component';
import { StridesAgainstModule } from './prevention/strides-against/strides-against.module';
import { LeaderBoardService } from './services/leaderBoard.service';
import { LeaderBoardComponent } from './leader-board/leader-board.component';

@NgModule({
  declarations: [
    AppComponent,
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
    DragdropComponent,
    MedsNLabelsComponent,
    MemoryGameComponent,
    IntroductionComponent,
    HighlightActivityComponent,
    PicturePuzzleComponent,
    MatchmedsComponent,
    Malaria101Component,
    AnimatedVideoComponent,
    MalariaLifeCycleComponent,
    OddOneOutComponent,
    StageCompleteComponent,
    DoctorchatComponent,
    UnlockedStageComponent,
    HowToPlayComponent,
    PreventionComponent,
    CertificateComponent,
    PerformanceDisplayComponent,
    BadgeComponent,
    UserUpdateComponent,
    LeaderBoardComponent
  ],
  imports: [
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    DndModule.forRoot(),
    ToastrModule.forRoot(),
    MaterialModule,
    SharedModule,
    StopTheBreedModule,
    StridesAgainstModule,

    RouterModule
  ],
  entryComponents: [
    BadgeComponent, UserUpdateComponent, PerformanceDisplayComponent, CertificateComponent, LeaderBoardComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [DashboardService, AuthService, LoggedInGuard, UnauthenticatedGuard, APIService, RegService, NavbarService,
    SharedDataService, InfokitService, LanguageService, DoctorService, CertificateService, PerformanceDisplayService, ActivityGuard,
    BadgeService, LeaderBoardService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

