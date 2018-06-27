import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameDialogComponent } from './game-dialog.component';

describe('GameDialogComponent', () => {
  let component: GameDialogComponent;
  let fixture: ComponentFixture<GameDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
