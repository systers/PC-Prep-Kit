import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcpolicyComponent } from './activity-2.component';

describe('PcpolicyComponent', () => {
  let component: PcpolicyComponent;
  let fixture: ComponentFixture<PcpolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PcpolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcpolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
