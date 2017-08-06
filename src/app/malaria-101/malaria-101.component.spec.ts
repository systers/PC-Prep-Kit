import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Malaria101Component } from './malaria-101.component';

describe('Malaria101Component', () => {
  let component: Malaria101Component;
  let fixture: ComponentFixture<Malaria101Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Malaria101Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Malaria101Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
