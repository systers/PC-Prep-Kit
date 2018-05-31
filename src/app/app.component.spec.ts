import { TestBed, async } from '@angular/core/testing';
import {HeaderComponent} from './header/header.component';
import { AppComponent } from './app.component';
import {InfokitComponent} from './infokit/infokit.component';
import {NavbarComponent} from './navbar/navbar.component';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivityindicatorComponent} from './activityindicator/activityindicator.component';
import {MaterialModule} from './material.module';
import {SharedDataService} from './services/shared.data.service';
import {DashboardService} from './services/dashboard.service';
import {HttpClient} from '@angular/common/http';
import {HttpHandler} from '@angular/common/http';
import {APIService} from './services/api.service';
import {ToastrService, ToastrModule} from 'ngx-toastr';
import {AuthService} from './services/auth.service';
import {LanguageService} from './services/language.service';
import {InfokitService} from './services/infokit.service';
import {NavbarService} from './services/navbar.service';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent, HeaderComponent, InfokitComponent, NavbarComponent, ActivityindicatorComponent
            ],
          imports: [RouterTestingModule, MaterialModule, ToastrModule.forRoot()],
          providers: [SharedDataService, DashboardService,
            HttpClient, HttpHandler, APIService, ToastrService, AuthService,
            LanguageService, InfokitService, NavbarService]
        }).compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    it(`should have as title 'app'`, async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual('PC Prep Kit');
    }));

    // it('should render title in a h1 tag', async(() => {
    //     const fixture = TestBed.createComponent(AppComponent);
    //     fixture.detectChanges();
    //     const compiled = fixture.debugElement.nativeElement;
    //     expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!!');
    // }));
});
