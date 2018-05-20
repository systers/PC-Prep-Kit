import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SharedDataService} from '../../services/shared.data.service';
import {APIService} from '../../services/api.service';
import {DashboardService} from '../../services/dashboard.service';
import {ActivityintroComponent} from './activityintro.component';
import {HttpClientModule} from '@angular/common/http';
import {LanguageService} from '../../services/language.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ToastrService, ToastrModule} from 'ngx-toastr';


describe('ActivityintroComponent', () => {
    let component: ActivityintroComponent;
    let fixture: ComponentFixture<ActivityintroComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule, HttpClientTestingModule, ToastrModule.forRoot()],
            declarations: [ ActivityintroComponent ],
            providers: [
                // { provide: Http, useValue: mockHttpProvider },
                SharedDataService,
                DashboardService,
                APIService,
                LanguageService,
                ToastrService
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ActivityintroComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});


