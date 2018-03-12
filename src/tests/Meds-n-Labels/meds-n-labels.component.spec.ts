import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MedsNLabelsComponent } from '../../app/meds-n-labels/meds-n-labels.component';

describe('MedsNLabelsComponent', () => {
    let component: MedsNLabelsComponent;
    let fixture: ComponentFixture<MedsNLabelsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            declarations: [ MedsNLabelsComponent ]
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
