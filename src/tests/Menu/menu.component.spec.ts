import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardService } from '../../app/services/dashboard.service';
import { APIService } from '../../app/services/api.service';
import { MenuComponent } from '../../app/menu/menu.component';
import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('MenuComponent', () => {
    let component: MenuComponent;
    let fixture: ComponentFixture<MenuComponent>;
    let dashboardService: DashboardService;
    let apiService: APIService;
    const router = {
        navigate: jasmine.createSpy('navigate'),
        navigateByUrl: jasmine.createSpy('navigateByUrl')
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ MenuComponent ],
            imports: [
                RouterTestingModule,
                HttpModule
            ],
            providers: [
                { provide: Router, useValue: router },
                DashboardService,
                APIService
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MenuComponent);
        component = fixture.componentInstance;
        dashboardService = fixture.debugElement.injector.get(DashboardService);
        apiService = TestBed.get(APIService);
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize the stage and activity indicators', () => {
        spyOn(dashboardService, 'getProgressStatus').and.returnValue(Observable.of({stage: 1, activity: 1}));
        component.ngOnInit();
        expect(component.stage).toBe(1);
        expect(component.activity).toBe(1);
    });

    it('should initialize the stage and activity indicators', () => {
        spyOn(dashboardService, 'getProgressStatus').and.returnValue(Observable.throw({error: 'ERROR'}));
        component.ngOnInit();
        expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });

    it('should navigate to respective pages on clicking on stages in menu page', () => {
        const introButton = fixture.debugElement.nativeElement.querySelector('.intro-btn');
        introButton.click();
        expect(router.navigateByUrl).toHaveBeenCalledWith('/introduction');
    });

});
