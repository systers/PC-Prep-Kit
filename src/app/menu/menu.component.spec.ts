import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { async, ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { DashboardService } from '../services/dashboard.service';
import { APIService } from '../services/api.service';
import { MenuComponent } from './menu.component';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LanguageService } from '../services/language.service';
import { throwError } from 'rxjs/internal/observable/throwError';

const languageData = require('../../assets/languages/english.json');
describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let dashboardService: DashboardService;
  let apiService: APIService;
  let languageService: LanguageService;
  const router = {
    navigate: jasmine.createSpy('navigate'),
    navigateByUrl: jasmine.createSpy('navigateByUrl')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MenuComponent],
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [
        {provide: Router, useValue: router},
        DashboardService,
        APIService,
        LanguageService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    dashboardService = TestBed.get(DashboardService);
    apiService = TestBed.get(APIService);
    languageService = TestBed.get(LanguageService);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the stage and activity indicators', fakeAsync(() => {
    spyOn(dashboardService, 'getProgressStatus').and.returnValue(Observable.of({stage: 1, activity: 1}));
    spyOn(languageService, 'loadLanguage').and.returnValue(Observable.of(languageData));
    component.ngOnInit();
    fixture.detectChanges();
    flush();
    expect(component.stage).toBe(1);
    expect(component.activity).toBe(1);
  }));

  it('should throw error and redirect user if he has not logged in', fakeAsync(() => {
    spyOn(dashboardService, 'getProgressStatus').and.returnValue(throwError({error: 'ERROR'}));
    spyOn(languageService, 'loadLanguage').and.returnValue(Observable.of(languageData));
    flush();
    component.ngOnInit();
    fixture.detectChanges();
    flush();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  }));

  it('should navigate to respective pages on clicking on stages in menu page', fakeAsync(() => {
    const introButton = fixture.debugElement.nativeElement.querySelector('.intro-btn');
    introButton.click();
    fixture.detectChanges();
    flush();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/introduction');
  }));

});

