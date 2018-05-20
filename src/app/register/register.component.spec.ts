import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {RegisterComponent} from './register.component';
import {RegService} from '../services/reg.service';
import {APIService} from '../services/api.service';
import {HttpClientModule} from '@angular/common/http';
import {LanguageService} from '../services/language.service';

describe('RegisterComponent', () => {
    let component: RegisterComponent;
    let fixture: ComponentFixture<RegisterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ RegisterComponent ],
            imports: [
                HttpClientModule,
                ReactiveFormsModule,
                RouterTestingModule
            ],
            providers: [
                RegService,
                APIService,
                LanguageService
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RegisterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
