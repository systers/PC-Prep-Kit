import 'rxjs/Rx';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { DashboardService } from '../../services/dashboard.service';
import { APIService } from '../../services/api.service';
import { HighlightActivityComponent } from './activity-1.component';
import { SharedDataService } from '../../services/shared.data.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ButtonNavComponent } from '../../button-nav/button-nav.component';
import { LanguageService } from '../../services/language.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';

const languageData = require('../../../assets/languages/english.json');

describe('HighlightActivityComponent', () => {
  let component: HighlightActivityComponent;
  let fixture: ComponentFixture<HighlightActivityComponent>;
  let dashboardService: DashboardService;
  let apiService: APIService;
  let sharedService: SharedDataService;
  let languageService: LanguageService;
  const selection = window.getSelection();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HighlightActivityComponent, ButtonNavComponent],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        ToastrModule.forRoot()
      ],
      providers: [
        SharedDataService,
        DashboardService,
        APIService,
        LanguageService,
        ToastrService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighlightActivityComponent);
    component = fixture.componentInstance;
    dashboardService = TestBed.get(DashboardService);
    sharedService = TestBed.get(SharedDataService);
    apiService = TestBed.get(APIService);
    languageService = TestBed.get(LanguageService);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('malaria definition is highlighted', fakeAsync(() => {
    const rangeObject = {
      removeAllRanges: function () {
        return ''
      },
      empty: function () {
        return ''
      }
    };
    spyOn(languageService, 'loadLanguage').and.returnValue(Observable.of(languageData));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      spyOn(window, 'getSelection').and.returnValues('An intermittent and remittent fever caused by a protozoan parasite that invades the red blood cells. The parasite is transmitted by mosquitoes in many tropical and subtropical regions.', rangeObject);
      spyOn(selection, 'removeAllRanges').and.returnValue('');
      component.select();
      expect(component.activityComplete).toBeTruthy();
    });
  }));

});
