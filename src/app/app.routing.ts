import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoggedInGuard } from './guards/logged-in.guard';
import { UnauthenticatedGuard } from './guards/unauthenticated.guard';
import { LoginComponent } from './authentication/login.component';
import { ForgotPasswordComponent } from './authentication/forgot-password.component';
import { ResetPasswordComponent } from './authentication/reset-password.component';
import { PcpolicyComponent } from './introduction/activity-2/pcpolicy.component';
import { SplashscreenComponent } from './splashscreen/splashscreen.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ActivityintroComponent } from './introduction/activityintro/activityintro.component';
import { MenuComponent } from './menu/menu.component';
import { DragdropComponent} from './malaria-101/activity-2/dragdrop.component';
import { MedsNLabelsComponent } from './meds-n-labels/meds-n-labels.component';
import { MemoryGameComponent } from './meds-n-labels/activity-2/activity-2.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { HighlightActivityComponent } from './introduction/activity-1/activity-1.component';
import { PicturePuzzleComponent } from './introduction/activity-3/activity-3.component';
import { MatchmedsComponent } from './meds-n-labels/activity-1/matchmeds.component';
import { Malaria101Component } from './malaria-101/malaria-101.component';
import { AnimatedVideoComponent } from './malaria-101/activity-1/activity-1-1.component';
import { MalariaLifeCycleComponent } from './malaria-101/activity-1/activity-1-2.component';
import { OddOneOutComponent } from './malaria-101/activity-3/activity-3.component';
import { StageCompleteComponent } from './stage-complete/stage-complete.component';
import { DoctorchatComponent } from './meds-n-labels/activity-3/doctorchat.component';
import { UnlockedStageComponent } from './unlocked-stage/unlocked-stage.component';
import { HowToPlayComponent } from './unlocked-stage/how-to-play/howtoplay.component';

export const routes: Routes = [
    {
        path: '',
        component: SplashscreenComponent,
        canActivate: [UnauthenticatedGuard]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [UnauthenticatedGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [UnauthenticatedGuard]
    },
    {
        path: 'forgot',
        component: ForgotPasswordComponent,
        canActivate: [UnauthenticatedGuard]
    },
    {
        path: 'reset/:token',
        component: ResetPasswordComponent,
        canActivate: [UnauthenticatedGuard]
    },
    {
        path: 'menu',
        component: MenuComponent,
        canActivate: [LoggedInGuard]
    },
    {
        path: 'stagecomplete',
        component: StageCompleteComponent,
        canActivate: [LoggedInGuard]
    },
    {
        path: 'introduction',
        component: IntroductionComponent,
        canActivate: [LoggedInGuard],
        children: [
            {
                path: '',
                component: ActivityintroComponent
            },
            {
                path: 'activity-1',
                component: HighlightActivityComponent
            },
            {
                path: 'activity-2',
                component: PcpolicyComponent
            },
            {
                path: 'activity-3',
                component: PicturePuzzleComponent
            }
        ]
    },
    {
        path: 'malaria-101',
        component: Malaria101Component,
        canActivate: [LoggedInGuard],
        children: [
            {
                path: '',
                redirectTo: 'activity-1-1',
                pathMatch: 'full'
            },
            {
                path: 'activity-1-1',
                component: AnimatedVideoComponent
            },
            {
                path: 'activity-1-2',
                component: MalariaLifeCycleComponent
            },            
            {
                path: 'activity-2',
                component: DragdropComponent
            },
            {
                path: 'activity-3',
                component: OddOneOutComponent
            }
        ]
    },
    {
        path: 'meds-n-labels',
        component: MedsNLabelsComponent,
        canActivate: [LoggedInGuard],
        children: [
            {
                path: 'activity-1',
                component: MatchmedsComponent
            },
            {
                path: 'activity-2',
                component: MemoryGameComponent
            },
            {
                path: 'activity-3',
                component: DoctorchatComponent
            }
        ]
    },
    {
        path: 'unlocked-stage',
        component: HowToPlayComponent,
        canActivate: [LoggedInGuard],
    },
    {
        path: 'unlocked-stage/game',
        component: UnlockedStageComponent,
        canActivate: [LoggedInGuard],
    }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
