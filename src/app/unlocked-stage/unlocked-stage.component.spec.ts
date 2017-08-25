import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnlockedStageComponent } from './unlocked-stage.component';

describe('UnlockedStageComponent', () => {
  let component: UnlockedStageComponent;
  let fixture: ComponentFixture<UnlockedStageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnlockedStageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnlockedStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
