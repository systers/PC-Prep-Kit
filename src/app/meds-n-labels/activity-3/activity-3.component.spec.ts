import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { DoctorchatComponent } from './activity-3.component';
import { ButtonNavComponent } from '../../button-nav/button-nav.component';
import { DoctorService } from '../../services/doctorchat.service';
import { APIService } from '../../services/api.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { SharedDataService } from '../../services/shared.data.service';
import { DashboardService } from '../../services/dashboard.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { InfokitService } from '../../services/infokit.service';
import { LanguageService } from '../../services/language.service';
import { RouterTestingModule } from '@angular/router/testing';
import { PerformanceDisplayService } from '../../services/performance-display.service';
import { MatDialog } from '@angular/material/dialog';
import { OverlayModule } from '@angular/cdk/overlay';

describe('DoctorchatComponent', () => {
  let component: DoctorchatComponent;
  let fixture: ComponentFixture<DoctorchatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorchatComponent, ButtonNavComponent],
      imports: [FormsModule, ToastrModule.forRoot(), RouterTestingModule, OverlayModule],
      providers: [DoctorService, APIService, HttpClient, HttpHandler, SharedDataService, DashboardService, ToastrService, InfokitService, LanguageService,
                  PerformanceDisplayService, MatDialog]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
