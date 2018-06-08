import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../material.module';
import { PerformanceDisplayComponent } from './performance-display.component';
import { MatDialogModule } from '@angular/material';
import { InfokitComponent } from '../infokit/infokit.component';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { LanguageService } from '../services/language.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { APIService } from '../services/api.service';
import { InfokitService } from '../services/infokit.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('PerformanceDisplayComponent', () => {
  let component: PerformanceDisplayComponent;
  let fixture: ComponentFixture<PerformanceDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PerformanceDisplayComponent, InfokitComponent],
      imports: [MaterialModule, MatDialogModule, HttpClientTestingModule, RouterTestingModule],
      providers: [{
        provide: MAT_DIALOG_DATA,
        useValue: {currentActivityName: 'TestActivity', nextActivityURL: '/test', nextActivity: 'nextActivity'}
      }, {provide: MatDialogRef, useValue: {}}, LanguageService, APIService, InfokitService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have injected values', () => {
    expect(component.nextActivity).toEqual('nextActivity');
    expect(component.nextActivityURL).toEqual('/test');
    expect(component.activityName).toEqual('TestActivity');
  });
});

