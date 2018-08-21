import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SplashscreenComponent } from './splashscreen.component';
import { LanguageService } from '../services/language.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { APIService } from '../services/api.service';


describe('SplashscreenComponent', () => {
  let component: SplashscreenComponent;
  let fixture: ComponentFixture<SplashscreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [SplashscreenComponent],
      providers: [LanguageService, HttpClient, HttpHandler, APIService],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SplashscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

