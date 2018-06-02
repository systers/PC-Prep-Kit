import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AnimatedVideoComponent } from './activity-1-1.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardService } from '../../services/dashboard.service';
import { APIService } from '../../services/api.service';
import { SharedDataService } from '../../services/shared.data.service';
import { ButtonNavComponent } from '../../button-nav/button-nav.component';
import { LanguageService } from '../../services/language.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

describe('AnimatedVideoComponent', () => {
  let component: AnimatedVideoComponent;
  let fixture: ComponentFixture<AnimatedVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        ToastrModule.forRoot()
      ],
      declarations: [AnimatedVideoComponent, ButtonNavComponent],
      providers: [
        DashboardService,
        APIService,
        SharedDataService,
        LanguageService,
        ToastrService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimatedVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
