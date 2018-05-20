import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfokitComponent } from './infokit.component';
import {InfokitService} from '../services/infokit.service';
import {HttpClient} from '@angular/common/http';
import {HttpHandler} from '@angular/common/http';
import {APIService} from '../services/api.service';
import {LanguageService} from '../services/language.service';

describe('InfokitComponent', () => {
  let component: InfokitComponent;
  let fixture: ComponentFixture<InfokitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfokitComponent ],
      providers: [InfokitService, HttpClient, HttpHandler, APIService, LanguageService]
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
