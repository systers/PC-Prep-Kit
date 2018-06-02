import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MedsNLabelsComponent } from './meds-n-labels.component';
import { LanguageService } from '../services/language.service';
import { HttpClientModule } from '@angular/common/http';
import { APIService } from '../services/api.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('MedsNLabelsComponent', () => {
  let component: MedsNLabelsComponent;
  let fixture: ComponentFixture<MedsNLabelsComponent>;
  let languageService: LanguageService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        BrowserAnimationsModule,
      ],
      declarations: [MedsNLabelsComponent],
      providers: [LanguageService,
        APIService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedsNLabelsComponent);
    component = fixture.componentInstance;
    languageService = TestBed.get(LanguageService);
    fixture.detectChanges();
  });


  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});



