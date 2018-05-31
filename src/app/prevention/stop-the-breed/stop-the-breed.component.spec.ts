import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StopTheBreedComponent } from './stop-the-breed.component';

describe('StopTheBreedComponent', () => {
  let component: StopTheBreedComponent;
  let fixture: ComponentFixture<StopTheBreedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StopTheBreedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StopTheBreedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
