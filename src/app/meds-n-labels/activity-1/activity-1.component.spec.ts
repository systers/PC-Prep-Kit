import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InfokitService } from '../../services/infokit.service';
import { MatchmedsComponent } from './activity-1.component';
import { ButtonNavComponent } from '../../button-nav/button-nav.component';
import { LanguageService } from '../../services/language.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { APIService } from '../../services/api.service';
import { DashboardService } from '../../services/dashboard.service';
import { SharedDataService } from '../../services/shared.data.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { PerformanceDisplayService } from '../../services/performance-display.service';
import { MatDialog } from '@angular/material/dialog';
import { OverlayModule } from '@angular/cdk/overlay';
import { LeaderBoardService } from '../../services/leaderBoard.service';

describe('MatchmedsComponent', () => {
  let component: MatchmedsComponent;
  let fixture: ComponentFixture<MatchmedsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MatchmedsComponent, ButtonNavComponent],
      providers: [LanguageService, HttpClient, HttpHandler, APIService,
        DashboardService, SharedDataService, ToastrService, InfokitService, PerformanceDisplayService, MatDialog, LeaderBoardService],
      imports: [ToastrModule.forRoot(), RouterTestingModule, OverlayModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchmedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});


