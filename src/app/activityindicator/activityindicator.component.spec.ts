import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardService } from '../services/dashboard.service';
import { ActivityindicatorComponent } from './activityindicator.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { APIService } from '../services/api.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('ActivityindicatorComponent', () => {
  let component: ActivityindicatorComponent;
  let fixture: ComponentFixture<ActivityindicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityindicatorComponent],
      providers: [DashboardService, HttpClient, HttpTestingController, APIService],
      imports: [HttpClientTestingModule, HttpClientModule, RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityindicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
