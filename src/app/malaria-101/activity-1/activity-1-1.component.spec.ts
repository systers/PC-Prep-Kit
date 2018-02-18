import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedVideoComponent } from './activity-1-1.component';

describe('AnimatedVideoComponent', () => {
  let component: AnimatedVideoComponent;
  let fixture: ComponentFixture<AnimatedVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimatedVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimatedVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
