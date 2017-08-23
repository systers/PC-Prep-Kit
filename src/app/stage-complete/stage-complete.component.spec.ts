import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StageCompleteComponent } from './stage-complete.component';

describe('StageCompleteComponent', () => {
  let component: StageCompleteComponent;
  let fixture: ComponentFixture<StageCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StageCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StageCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
