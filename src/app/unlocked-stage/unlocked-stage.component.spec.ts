import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonNavComponent } from '../button-nav/button-nav.component';
import { UnlockedStageComponent } from './unlocked-stage.component';
import { LanguageService } from '../services/language.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { APIService } from '../services/api.service';
import { DashboardService } from '../services/dashboard.service';
import { SharedDataService } from '../services/shared.data.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material';
import { MaterialModule } from '../material.module';


describe('UnlockedStageComponent', () => {
  let component: UnlockedStageComponent;
  let fixture: ComponentFixture<UnlockedStageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UnlockedStageComponent, ButtonNavComponent],
      providers: [LanguageService, HttpClient, HttpHandler, APIService,
        DashboardService, SharedDataService, ToastrService],
      imports: [ToastrModule.forRoot(), RouterTestingModule, MatSnackBarModule, MaterialModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnlockedStageComponent);
    component = fixture.componentInstance;
  });
  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  // Game depends on JQuery
});


