import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {MedsNLabelsComponent} from './meds-n-labels.component';
import {LanguageService} from '../services/language.service';
import {HttpClientModule} from '@angular/common/http';
import {APIService} from '../services/api.service';

describe('MedsNLabelsComponent', () => {
    let component: MedsNLabelsComponent;
    let fixture: ComponentFixture<MedsNLabelsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpClientModule
            ],
            declarations: [ MedsNLabelsComponent ],
            providers: [LanguageService,
                        APIService]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MedsNLabelsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
