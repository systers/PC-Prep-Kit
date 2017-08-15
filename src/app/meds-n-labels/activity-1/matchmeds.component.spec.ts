import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchmedsComponent } from './matchmeds.component';

describe('MatchmedsComponent', () => {
  let component: MatchmedsComponent;
  let fixture: ComponentFixture<MatchmedsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchmedsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchmedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
