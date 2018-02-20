import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MalariaLifeCycleComponent } from './activity-1-2.component';

describe('MalariaLifeCycleComponent', () => {
  let component: MalariaLifeCycleComponent;
  let fixture: ComponentFixture<MalariaLifeCycleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MalariaLifeCycleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MalariaLifeCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
