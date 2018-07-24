import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { LanguageService } from '../services/language.service';
import { LeaderBoardComponent } from './leader-board.component';
import { APIService } from '../services/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from '../material.module';

describe('LeaderBoardComponent', () => {
  let component: LeaderBoardComponent;
  let fixture: ComponentFixture<LeaderBoardComponent>;
  const mockData = {
    badge: {
      image: '/some/image',
      name: 'badgeName'
    },
    leaderBoardData: [
      {
        name: 'Name',
        score: 100
      }
    ]
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LeaderBoardComponent],
      providers: [{provide: MAT_DIALOG_DATA, useValue: mockData}, LanguageService,
        {provide: MatDialogRef, useValue: {}}, APIService],
      imports: [HttpClientTestingModule, MaterialModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initiate the leaderBoard component successfully', () => {
    expect(component).toBeTruthy();
    expect(component.data).toEqual(mockData.leaderBoardData);
    expect(component.image).toEqual(mockData.badge.image);
    expect(component.badgeName).toEqual(mockData.badge.name);

  });
});
