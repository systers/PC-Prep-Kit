import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ResponseOptions, Response, Http, BaseRequestOptions, RequestMethod } from '@angular/http';
import { HeaderComponent } from '../../app/header/header.component';
import { AuthService } from '../../app/services/auth.service';
import { APIService } from '../../app/services/api.service';
import { RouterTestingModule } from '@angular/router/testing';

import { MockBackend, MockConnection } from '@angular/http/testing';

const mockHttpProvider = {
    deps: [ MockBackend, BaseRequestOptions ],
    useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
        return new Http(backend, defaultOptions);
    }
};


describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            declarations: [ HeaderComponent ],
            providers: [
                { provide: Http, useValue: mockHttpProvider },
                AuthService,
                APIService
            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
