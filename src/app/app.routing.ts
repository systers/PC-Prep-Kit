import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
import { MenuComponent } from './menu/menu.component';
import { DragdropComponent} from './dragdrop/dragdrop.component';

export const routes: Routes = [
    {
        path: 'splash',
        component: SplashscreenComponent,
        canActivate: [UnauthenticatedGuard]
    },
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
        path: 'home',
        component: DashboardComponent,
        canActivate: [LoggedInGuard]
    },
    {
        path: 'forgot',
        component: ForgotPasswordComponent,
        canActivate: [UnauthenticatedGuard]
    },
    {
        path: 'pcpolicy',
        component: PcpolicyComponent,
        canActivate: [LoggedInGuard]
    },
    {
        path: 'intro',
        component: ActivityintroComponent,
        canActivate: [LoggedInGuard]
    },
    {
        path: 'dragdrop',
        component: DragdropComponent,
        canActivate: [LoggedInGuard]
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
        path: '',
        redirectTo: '/menu',
        pathMatch : 'full',
        canActivate: [LoggedInGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
