import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_SNACK_BAR_DATA } from '@angular/material';
import { BadgeComponent } from './badge.component';
import { LanguageService } from '../services/language.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { APIService } from '../services/api.service';
import { Badge } from './models/badgeModel';

describe('BadgeComponent', () => {
  let component: BadgeComponent;
  let fixture: ComponentFixture<BadgeComponent>;
  const mockData: Badge = {
    name: 'SomeBadge',
    message: 'SomeMessage',
    image: 'SomeImage'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BadgeComponent],
      providers: [{provide: MAT_SNACK_BAR_DATA, useValue: mockData},
        LanguageService, APIService],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initiate the badge component successfully', () => {
    expect(component).toBeTruthy();
    expect(component.data).toEqual(mockData);
  });
});

