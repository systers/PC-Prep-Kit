import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IntroductionComponent } from './introduction.component';
import { RouterTestingModule } from '@angular/router/testing';
import {LanguageService} from '../services/language.service';
import {HttpClientModule} from '@angular/common/http';
import {APIService} from '../services/api.service';

describe('IntroductionComponent', () => {
    let component: IntroductionComponent;
    let fixture: ComponentFixture<IntroductionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
              HttpClientModule
            ],
            declarations: [ IntroductionComponent ],
            providers: [LanguageService, APIService],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(IntroductionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
