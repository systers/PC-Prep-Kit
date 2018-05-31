import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreventionComponent } from './prevention.component';

describe('PreventionComponent', () => {
  let component: PreventionComponent;
  let fixture: ComponentFixture<PreventionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreventionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
