import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorchatComponent } from './doctorchat.component';

describe('DoctorchatComponent', () => {
  let component: DoctorchatComponent;
  let fixture: ComponentFixture<DoctorchatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorchatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
