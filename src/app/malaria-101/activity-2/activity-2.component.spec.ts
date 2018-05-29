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

describe('DragdropComponent', () => {
  let component: DragdropComponent;
  let fixture: ComponentFixture<DragdropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DragdropComponent, ButtonNavComponent, DraggableComponent],
      providers: [LanguageService,
        SharedDataService, InfokitService, DragDropService, DashboardService,
        HttpClient, HttpHandler, APIService, ToastrService, DragDropConfig],
      imports: [ToastrModule.forRoot(), RouterTestingModule]
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
