import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityintroComponent } from './activityintro.component';

describe('ActivityintroComponent', () => {
  let component: ActivityintroComponent;
  let fixture: ComponentFixture<ActivityintroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityintroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityintroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
