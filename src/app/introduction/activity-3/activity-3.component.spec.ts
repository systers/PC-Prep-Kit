import 'rxjs/Rx';
import 'webrtc-adapter';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { DashboardService } from '../../services/dashboard.service';
import { APIService } from '../../services/api.service';
import { PicturePuzzleComponent } from './activity-3.component';
import { SharedDataService } from '../../services/shared.data.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ButtonNavComponent } from '../../button-nav/button-nav.component';
import { LanguageService } from '../../services/language.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { By } from '@angular/platform-browser';
import { BadgeService } from '../../services/BadgeService/badge.service';
import { NotifyService } from '../../badge/notify';
import { PerformanceDisplayService } from '../../services/performance-display.service';
import { MatDialog } from '@angular/material/dialog';
import { OverlayModule } from '@angular/cdk/overlay';
import { LevelNavigateComponent } from '../../level-navigate/level-navigate.component';
import { MaterialModule } from '../../material.module';
import { LeaderBoardService } from '../../services/leaderBoard.service';

describe('PicturePuzzleComponent', () => {
  let component: PicturePuzzleComponent;
  let fixture: ComponentFixture<PicturePuzzleComponent>;
  let dashboardService: DashboardService;
  let apiService: APIService;
  let sharedService: SharedDataService;
  let browse: any;
  let puzzle: any;
  let saveProPic: any;
  let btn: any;
  let languageService: LanguageService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PicturePuzzleComponent,
        ButtonNavComponent, LevelNavigateComponent],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        OverlayModule,
        MaterialModule
      ],
      providers: [
        SharedDataService,
        DashboardService,
        APIService,
        LanguageService,
        ToastrService,
        PerformanceDisplayService,
        MatDialog,
        ToastrService,
        NotifyService,
        BadgeService,
        LeaderBoardService

      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PicturePuzzleComponent);
    component = fixture.componentInstance;
    dashboardService = TestBed.get(DashboardService);
    sharedService = TestBed.get(SharedDataService);
    apiService = TestBed.get(APIService);
    languageService = TestBed.get(LanguageService);
    btn = fixture.debugElement.nativeElement.querySelectorAll('button');
    browse = btn[0];
    puzzle = btn[1];
    saveProPic = btn[2];
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('webcam is open', fakeAsync(() => {
    const webcamOpenBtn = fixture.debugElement.query(By.css('#webcamOpen'));
    spyOn(component, 'openWebcam');
    webcamOpenBtn.triggerEventHandler('click', null);
    fixture.detectChanges();
    tick();
    fixture.whenStable().then(() => {
      expect(component.openWebcam).toHaveBeenCalled();
      expect(component.webcamState).toEqual(component.webcamStates.OPENED);
      expect(component.webcamButtonText).toEqual('Capture');
      expect(puzzle.disabled).toEqual(true);
      expect(saveProPic.disabled).toEqual(true);
    });
  }));
});
