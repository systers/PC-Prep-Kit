import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfokitComponent } from './infokit.component';

describe('InfokitComponent', () => {
  let component: InfokitComponent;
  let fixture: ComponentFixture<InfokitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfokitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfokitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
