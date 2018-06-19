import { async, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardService } from '../services/dashboard.service';
import { APIService } from '../services/api.service';
import { SharedDataService } from '../services/shared.data.service';
import { LanguageService } from '../services/language.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ActivatedRouteSnapshot } from '@angular/router';
import { ActivityGuard } from './activity.guard';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

describe('Activity Guard', () => {
  let activityGuard: ActivityGuard;
  let dashboardService: DashboardService;
  let sharedDataService: SharedDataService;
  const mockSnapshot = new ActivatedRouteSnapshot();
  let router: Router;
  mockSnapshot.data = {
    prevStage: 10,
    prevActivity: 10
  };
  const mockCurrentActivityData = {
    activity: 20,
    stage: 20
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        ToastrModule.forRoot()
      ],
      providers: [
        DashboardService,
        APIService,
        SharedDataService,
        LanguageService,
        ToastrService,
        ActivityGuard
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    activityGuard = TestBed.get(ActivityGuard);
    dashboardService = TestBed.get(DashboardService);
    sharedDataService = TestBed.get(SharedDataService);
    router = TestBed.get(Router);
  });

  it('should be created', () => {
    expect(activityGuard).toBeTruthy();
  });
  it('should not navigate when previous stage is not completed', () => {
    spyOn(router, 'navigate').and.returnValue(true);
    spyOn(activityGuard, 'canActivate').and.callThrough();
    spyOn(dashboardService, 'getProgressStatus').and.callThrough().and.returnValue(Observable.of(mockCurrentActivityData));
    // Check progress has returned false => previous activity has not been completed
    spyOn(sharedDataService, 'checkProgress').and.callThrough().and.returnValue(false);
    activityGuard.canActivate(mockSnapshot).subscribe(
      res => expect(res).toBeUndefined()
    );
    expect(sharedDataService.checkProgress).toHaveBeenCalled();
    expect(activityGuard.canActivate).toHaveBeenCalled();
    expect(dashboardService.getProgressStatus).toHaveBeenCalled();
  });
  it('should navigate when previous stage is completed', () => {
    spyOn(activityGuard, 'canActivate').and.callThrough();
    spyOn(dashboardService, 'getProgressStatus').and.callThrough().and.returnValue(Observable.of(mockCurrentActivityData));
    // Check progress has returned true => previous activity has been completed
    spyOn(sharedDataService, 'checkProgress').and.callThrough().and.returnValue(true);
    activityGuard.canActivate(mockSnapshot).subscribe(
      res => expect(res).toBeTruthy()
    );
    expect(sharedDataService.checkProgress).toHaveBeenCalled();
    expect(activityGuard.canActivate).toHaveBeenCalled();
    expect(dashboardService.getProgressStatus).toHaveBeenCalled();
  });
});
