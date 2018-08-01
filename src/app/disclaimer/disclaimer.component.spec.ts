import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LanguageService } from '../services/language.service';
import { DisclaimerComponent } from './disclaimer.component';
import { APIService } from '../services/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Sources } from './sources';
import { Component } from '@angular/core';

describe('DisclaimerComponent', () => {
  let component: DisclaimerComponent;
  let fixture: ComponentFixture<DisclaimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisclaimerComponent ],
      providers: [APIService, LanguageService],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisclaimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialise the Disclaimer page correctly ', () => {
    expect(component.Sources).toEqual(Sources);
    expect(Component).toBeTruthy();
  });
});

