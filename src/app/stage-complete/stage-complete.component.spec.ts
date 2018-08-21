import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StageCompleteComponent } from './stage-complete.component';
import { LanguageService } from '../services/language.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { APIService } from '../services/api.service';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedDataService } from '../services/shared.data.service';
import { DashboardService } from '../services/dashboard.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

describe('StageCompleteComponent', () => {
  let component: StageCompleteComponent;
  let fixture: ComponentFixture<StageCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StageCompleteComponent,],
      providers: [LanguageService, HttpClient, HttpHandler, APIService,
        SharedDataService, DashboardService, ToastrService],
      imports: [RouterTestingModule, ToastrModule.forRoot()]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StageCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

