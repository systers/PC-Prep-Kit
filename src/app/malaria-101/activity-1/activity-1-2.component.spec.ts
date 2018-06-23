import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MalariaLifeCycleComponent } from './activity-1-2.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardService } from '../../services/dashboard.service';
import { APIService } from '../../services/api.service';
import { SharedDataService } from '../../services/shared.data.service';
import { ButtonNavComponent } from '../../button-nav/button-nav.component';
import { LanguageService } from '../../services/language.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { PerformanceDisplayService } from '../../services/performance-display.service';
import { MatDialog } from '@angular/material/dialog';
import { OverlayModule } from '@angular/cdk/overlay';

describe('MalariaLifeCycleComponent', () => {
  let component: MalariaLifeCycleComponent;
  let fixture: ComponentFixture<MalariaLifeCycleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        OverlayModule
      ],
      declarations: [MalariaLifeCycleComponent,
        ButtonNavComponent],
      providers: [
        DashboardService,
        APIService,
        SharedDataService,
        LanguageService,
        ToastrService,
        PerformanceDisplayService,
        MatDialog
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
