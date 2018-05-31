import 'rxjs/Rx';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import {MemoryGameComponent} from './activity-2.component';
import {SharedDataService} from '../../services/shared.data.service';
import {DashboardService} from '../../services/dashboard.service';
import {AuthService} from '../../services/auth.service';
import {APIService} from '../../services/api.service';
import {RouterTestingModule} from '@angular/router/testing';
import {LanguageService} from '../../services/language.service';
import {ButtonNavComponent} from '../../button-nav/button-nav.component';
import {ToastrModule, ToastrService} from 'ngx-toastr';

describe('MemoryGameComponent', () => {
    let component: MemoryGameComponent;
    let fixture: ComponentFixture<MemoryGameComponent>;
    let dashboardService: DashboardService;
    let authService: AuthService;
    let apiService: APIService;
    let sharedService: SharedDataService;
    let languageService: LanguageService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpClientModule,
                ToastrModule.forRoot()
            ],
            declarations: [ MemoryGameComponent,
            ButtonNavComponent],
            providers: [
                DashboardService,
                APIService,
                AuthService,
                SharedDataService,
                LanguageService,
                ToastrService
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MemoryGameComponent);
        component = fixture.componentInstance;
        dashboardService = TestBed.get(DashboardService);
        apiService = TestBed.get(APIService);
        authService = TestBed.get(AuthService);
        sharedService = TestBed.get(SharedDataService);
        fixture.detectChanges();
        languageService = TestBed.get(LanguageService);
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should match all pairs', () => {
        for (let i = 0; i < 16; i++) {
            for (let j = 0; j < 16; j++) {
                if (i !== j) {
                    component.choose(i);
                    component.choose(j);
                    component.check();
                }
            }
        }
        expect(component.activityComplete).toBeTruthy();
    });
});
