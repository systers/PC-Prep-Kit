import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityindicatorComponent } from './activityindicator.component';

describe('ActivityindicatorComponent', () => {
  let component: ActivityindicatorComponent;
  let fixture: ComponentFixture<ActivityindicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityindicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityindicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
