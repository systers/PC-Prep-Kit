import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from '../../../app/header/header.component';
import { NavbarComponent } from '../../../app/navbar/navbar.component';
import { NavbarService } from '../../../app/services/navbar.service';
import { PcpolicyComponent } from '../../../app/introduction/activity-2/pcpolicy.component';
import { APIService } from '../../../app/services/api.service';
import { AuthService } from '../../../app/services/auth.service';
import { DashboardService } from '../../../app/services/dashboard.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('PcpolicyComponent', () => {
    let component: PcpolicyComponent;
    let fixture: ComponentFixture<PcpolicyComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule,
                RouterTestingModule,
                BrowserAnimationsModule
            ],
            declarations: [
                PcpolicyComponent,
                HeaderComponent,
                NavbarComponent
            ],
            providers: [
                DashboardService,
                APIService,
                AuthService,
                NavbarService
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PcpolicyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
