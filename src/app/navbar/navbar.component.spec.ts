import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from '../header/header.component';
import { NavbarComponent } from './navbar.component';
import { NavbarService } from '../services/navbar.service';
import { APIService } from '../services/api.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from '../material.module';
import {DashboardService} from '../services/dashboard.service';
import {LanguageService} from '../services/language.service';

describe('NavbarComponent', () => {
    let component: NavbarComponent;
    let fixture: ComponentFixture<NavbarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                BrowserAnimationsModule,
                MaterialModule
            ],
            declarations: [
                NavbarComponent,
                HeaderComponent
            ],
            providers: [
                NavbarService,
                APIService,
                DashboardService,
                LanguageService
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NavbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
