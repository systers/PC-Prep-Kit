import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfokitComponent } from './infokit.component';
import { InfokitService } from '../services/infokit.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { APIService } from '../services/api.service';
import { LanguageService } from '../services/language.service';
import { BadgeService } from '../services/BadgeService/badge.service';
import { NotifyService } from '../badge/notify';

describe('InfokitComponent', () => {
  let component: InfokitComponent;
  let fixture: ComponentFixture<InfokitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InfokitComponent],
      providers: [InfokitService, HttpClient, HttpHandler, APIService, LanguageService, BadgeService, NotifyService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfokitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
