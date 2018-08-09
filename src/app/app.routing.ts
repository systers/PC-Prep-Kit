import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoggedInGuard } from './guards/logged-in.guard';
import { UnauthenticatedGuard } from './guards/unauthenticated.guard';
import { LoginComponent } from './authentication/login.component';
import { ForgotPasswordComponent } from './authentication/forgot-password.component';
import { ResetPasswordComponent } from './authentication/reset-password.component';
import { PcpolicyComponent } from './introduction/activity-2/activity-2.component';
import { SplashscreenComponent } from './splashscreen/splashscreen.component';
import { RegisterComponent } from './register/register.component';
import { ActivityintroComponent } from './introduction/activityintro/activityintro.component';
import { MenuComponent } from './menu/menu.component';
import { DragdropComponent } from './malaria-101/activity-2/activity-2.component';
import { MedsNLabelsComponent } from './meds-n-labels/meds-n-labels.component';
import { MemoryGameComponent } from './meds-n-labels/activity-2/activity-2.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { HighlightActivityComponent } from './introduction/activity-1/activity-1.component';
import { PicturePuzzleComponent } from './introduction/activity-3/activity-3.component';
import { MatchmedsComponent } from './meds-n-labels/activity-1/activity-1.component';
import { Malaria101Component } from './malaria-101/malaria-101.component';
import { AnimatedVideoComponent } from './malaria-101/activity-1/activity-1-1.component';
import { MalariaLifeCycleComponent } from './malaria-101/activity-1/activity-1-2.component';
import { OddOneOutComponent } from './malaria-101/activity-3/activity-3.component';
import { StageCompleteComponent } from './stage-complete/stage-complete.component';
import { DoctorchatComponent } from './meds-n-labels/activity-3/activity-3.component';
import { UnlockedStageComponent } from './unlocked-stage/unlocked-stage.component';
import { HowToPlayComponent } from './unlocked-stage/how-to-play/howtoplay.component';
import { StopTheBreedComponent } from './prevention/stop-the-breed/stop-the-breed.component';
import { PreventionComponent } from './prevention/prevention.component';
import { StridesAgainstComponent } from './prevention/strides-against/strides-against.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { ActivityGuard } from './guards/activity.guard';
import { ActivityRoutes } from './RouteConfig';

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
                component: HighlightActivityComponent,
                canActivate: [ActivityGuard],
                data: ActivityRoutes['HighlightActivityComponent']
            },
            {
                path: 'activity-2',
                component: PcpolicyComponent,
                canActivate: [ActivityGuard],
                data: ActivityRoutes['PcpolicyComponent']
            },
            {
                path: 'activity-3/:level',
                component: PicturePuzzleComponent,
                canActivate: [ActivityGuard],
                data: ActivityRoutes['PicturePuzzleComponent']
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
                component: AnimatedVideoComponent,
                canActivate: [ActivityGuard],
                data: ActivityRoutes['AnimatedVideoComponent']
            },
            {
                path: 'activity-1-2',
                component: MalariaLifeCycleComponent,
                canActivate: [ActivityGuard],
                data: ActivityRoutes['MalariaLifeCycleComponent']
            },
            {
                path: 'activity-2/:level',
                component: DragdropComponent,
                canActivate: [ActivityGuard],
                data: ActivityRoutes['DragdropComponent']
            },
            {
                path: 'activity-3/:level',
                component: OddOneOutComponent,
                canActivate: [ActivityGuard],
                data: ActivityRoutes['OddOneOutComponent']
            }
        ]
    },
    {
        path: 'meds-n-labels',
        component: MedsNLabelsComponent,
        canActivate: [LoggedInGuard],
        children: [
            {
                path: '',
                redirectTo: 'activity-1',
                pathMatch: 'full'
            },
            {
                path: 'activity-1',
                component: MatchmedsComponent,
                canActivate: [ActivityGuard],
                data: ActivityRoutes['MatchmedsComponent']
            },
            {
                path: 'activity-2/:level',
                component: MemoryGameComponent,
                canActivate: [ActivityGuard],
                data: ActivityRoutes['MemoryGameComponent']
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
        canActivate: [LoggedInGuard]
    },
    {
        path: 'unlocked-stage/game',
        component: UnlockedStageComponent,
        canActivate: [LoggedInGuard]
    },
    {
        path: 'prevent',
        canActivate: [LoggedInGuard],
        component: PreventionComponent,
        children: [
            {
              path: '',
              redirectTo: 'stop-the-breed/game',
              pathMatch: 'full'
            },
            {
              path: 'stop-the-breed/game',
              component: StopTheBreedComponent,
              canActivate: [ActivityGuard],
              data: ActivityRoutes['StopTheBreedComponent']
            },
            {
              path: 'stride-against-malaria/game',
              component: StridesAgainstComponent,
              canActivate: [ActivityGuard],
              data: ActivityRoutes['StridesAgainstComponent']
            },
    ]
    },
    {
        path: 'disclaimer',
        component: DisclaimerComponent,
        canActivate: [LoggedInGuard]
    }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
