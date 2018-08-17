import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LanguageService } from '../../services/language.service';
import { SharedModule } from '../../shared.module';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { APIService } from '../../services/api.service';
import { DashboardService } from '../../services/dashboard.service';
import { SharedDataService } from '../../services/shared.data.service';
import { StopTheBreedComponent } from './stop-the-breed.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../../material.module';
import { InfokitService } from '../../services/infokit.service';
import { PerformanceDisplayService } from '../../services/performance-display.service';
import { MatDialog } from '@angular/material/dialog';
import { OverlayModule } from '@angular/cdk/overlay';
import { LeaderBoardService } from '../../services/leaderBoard.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';


describe('StopTheBreedComponent', () => {
  let component: StopTheBreedComponent;
  let fixture: ComponentFixture<StopTheBreedComponent>;
  const mockLevel = 1;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StopTheBreedComponent],
      providers: [LanguageService, HttpClient, HttpHandler, ToastrService, APIService, DashboardService,
        SharedDataService, InfokitService, PerformanceDisplayService, MatDialog, LeaderBoardService,
        {provide: ActivatedRoute, useValue: {params: Observable.of({level: mockLevel})}}
      ],
      imports: [RouterTestingModule, ToastrModule.forRoot(), SharedModule, MaterialModule, OverlayModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StopTheBreedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
