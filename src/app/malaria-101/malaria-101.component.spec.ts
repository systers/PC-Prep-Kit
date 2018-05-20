import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Malaria101Component } from './malaria-101.component';
import { RouterTestingModule } from '@angular/router/testing';
import {LanguageService} from '../services/language.service';
import {HttpClientModule} from '@angular/common/http';
import {APIService} from '../services/api.service';

describe('Malaria101Component', () => {
    let component: Malaria101Component;
    let fixture: ComponentFixture<Malaria101Component>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpClientModule
            ],
            declarations: [ Malaria101Component ],
            providers: [LanguageService,
                        APIService]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(Malaria101Component);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
