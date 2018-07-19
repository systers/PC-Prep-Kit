import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { LanguageService } from '../../services/language.service';
import { SharedModule } from '../../shared.module';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { APIService } from '../../services/api.service';
import { DashboardService } from '../../services/dashboard.service';
import { SharedDataService } from '../../services/shared.data.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../../material.module';
import { fakeAsync } from '@angular/core/testing';
import { ComponentFixtureAutoDetect } from '@angular/core/testing';
import { of } from 'rxjs';
import { StridesAgainstComponent } from './strides-against.component';
import { InfokitService } from '../../services/infokit.service';
import { CertificateService } from '../../certificate/certificate.component';
import { NavbarService } from '../../services/navbar.service';
import { BadgeService } from '../../services/BadgeService/badge.service';

import { PerformanceDisplayService } from '../../services/performance-display.service';
import { MatDialog } from '@angular/material/dialog';
import { OverlayModule } from '@angular/cdk/overlay';
import * as RaphaelJS from 'raphael';
import { Observable } from 'rxjs/Observable';
import { LeaderBoardService } from '../../services/leaderBoard.service';
import { ActivatedRoute } from '@angular/router';


const languageData = require('../../../assets/languages/english.json');

class MockLanguage extends LanguageService {
  loadLanguage() {
    return languageData;
  }
}

describe('StridesAgainstComponent', () => {
  let component: StridesAgainstComponent;
  let fixture: ComponentFixture<StridesAgainstComponent>;
  let languageService: LanguageService;
  const mockLevel = 1;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StridesAgainstComponent],
      imports: [RouterTestingModule, ToastrModule.forRoot(), SharedModule, MaterialModule, OverlayModule],
      providers: [LanguageService, HttpClient, HttpHandler, ToastrService,
        APIService, DashboardService, SharedDataService, {provide: ComponentFixtureAutoDetect, useValue: true},
        InfokitService, PerformanceDisplayService, MatDialog, BadgeService, CertificateService, NavbarService,
        {provide: ActivatedRoute, useValue: {params: Observable.of({level: mockLevel})}}, LeaderBoardService
      ],

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StridesAgainstComponent);
    component = fixture.componentInstance;
    languageService = TestBed.get(LanguageService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it(' respond correctly upon wrong answer', fakeAsync(() => {
    fixture.detectChanges();
    spyOn(component, 'openDialog').and.returnValue(of(false)); // mocked incorrect response
    spyOn(component.man, 'hide');
    spyOn(component, 'moveMan').and.callThrough();
    spyOn(component.man, 'animate').and.callThrough();
    spyOn(component, 'handleQuestion').and.callThrough();
    spyOn(component.man, 'toBack');

    component.afterClick();
    expect(component.moveMan).toHaveBeenCalled();

    fixture.whenStable().then(res => {
      expect(component.man.animate).toHaveBeenCalled();
      expect(component.handleQuestion).toHaveBeenCalled();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      // Have already set the response of openDialog to be false above in spy object
      expect(component.man.toBack).toHaveBeenCalled();
    })

  }));
  it(' increment of man\'s position upon answering correct question', fakeAsync(() => {
    fixture.detectChanges();
    spyOn(component, 'openDialog').and.returnValue(of(true)); // mocked correct response
    spyOn(component, 'moveMan').and.callThrough();
    spyOn(component, 'handleQuestion').and.callThrough();
    spyOn(component.man, 'toBack');

    component.afterClick();
    expect(component.moveMan).toHaveBeenCalled();
    fixture.whenStable().then(res => {
      expect(component.pos).toEqual(0); // initial value
      expect(component.man.animate).toHaveBeenCalled();
      expect(component.handleQuestion).toHaveBeenCalled();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      // Have already set the response of openDialog to be true in spy object
      expect(component.pos).toEqual(1); // user progressed
    })

  }))
});

