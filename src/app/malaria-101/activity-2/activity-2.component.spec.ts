import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LanguageService } from '../../services/language.service';
import { ButtonNavComponent } from '../../button-nav/button-nav.component';
import { DragdropComponent } from './activity-2.component';
import { SharedDataService } from '../../services/shared.data.service';
import { InfokitService } from '../../services/infokit.service';
import { DragDropConfig, DragDropService, DraggableComponent } from 'ng2-dnd';
import { DashboardService } from '../../services/dashboard.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { APIService } from '../../services/api.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { PerformanceDisplayService } from '../../services/performance-display.service';
import { MatDialog } from '@angular/material/dialog';
import { OverlayModule } from '@angular/cdk/overlay';
import { LevelNavigateComponent } from '../../level-navigate/level-navigate.component';
import { MaterialModule } from '../../material.module';
import { LeaderBoardService } from '../../services/leaderBoard.service';

describe('DragdropComponent', () => {
  let component: DragdropComponent;
  let fixture: ComponentFixture<DragdropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DragdropComponent, ButtonNavComponent, DraggableComponent, LevelNavigateComponent],
      providers: [LanguageService,
        SharedDataService, InfokitService, DragDropService, DashboardService,
        HttpClient, HttpHandler, APIService, ToastrService, DragDropConfig, PerformanceDisplayService, MatDialog, LeaderBoardService],
      imports: [ToastrModule.forRoot(), RouterTestingModule, OverlayModule, MaterialModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragdropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
