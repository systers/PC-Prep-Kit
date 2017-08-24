import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedDataService } from '../../app/services/shared.data.service';
import { APIService } from '../../app/services/api.service';
import { DashboardService } from '../../app/services/dashboard.service';
import { ActivityintroComponent } from '../../app/introduction/activityintro/activityintro.component';
import { ResponseOptions, Response, Http, BaseRequestOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

const mockHttpProvider = {
    deps: [ MockBackend, BaseRequestOptions ],
    useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
        return new Http(backend, defaultOptions);
    }
};

describe('ActivityintroComponent', () => {
    let component: ActivityintroComponent;
    let fixture: ComponentFixture<ActivityintroComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ActivityintroComponent ],
            providers: [
                { provide: Http, useValue: mockHttpProvider },
                SharedDataService,
                DashboardService,
                APIService
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
