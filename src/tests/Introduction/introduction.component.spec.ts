import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroductionComponent } from '../../app/introduction/introduction.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('IntroductionComponent', () => {
    let component: IntroductionComponent;
    let fixture: ComponentFixture<IntroductionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            declarations: [ IntroductionComponent ]
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
