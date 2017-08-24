import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { MalariaLifeCycleComponent } from '../../../app/malaria-101/activity-1/activity-1-2.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardService } from '../../../app/services/dashboard.service';
import { APIService } from '../../../app/services/api.service';
import { SharedDataService } from '../../../app/services/shared.data.service';

describe('MalariaLifeCycleComponent', () => {
    let component: MalariaLifeCycleComponent;
    let fixture: ComponentFixture<MalariaLifeCycleComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpModule
            ],      
            declarations: [ MalariaLifeCycleComponent ],
            providers: [
                DashboardService,
                APIService,
                SharedDataService    
            ]      
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MalariaLifeCycleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

});
