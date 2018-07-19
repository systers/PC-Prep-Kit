import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LevelNavigateComponent } from './level-navigate.component';
import { LanguageService } from '../services/language.service';
import { APIService } from '../services/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from '../material.module';

describe('LevelNavigateComponent', () => {
  let component: LevelNavigateComponent;
  let fixture: ComponentFixture<LevelNavigateComponent>;
  const mockLevel = 1;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LevelNavigateComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, MaterialModule],
      providers: [APIService, LanguageService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelNavigateComponent);
    component = fixture.componentInstance;
    component.levelInfo = mockLevel;
    fixture.detectChanges();
  });

  it('should create and initialise with correct levelNumber', () => {
    component.levelInfo = mockLevel;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});

