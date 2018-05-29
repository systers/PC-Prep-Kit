import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InfokitService } from '../../services/infokit.service';
import { MatchmedsComponent } from './activity-1.component';
import { ButtonNavComponent } from '../../button-nav/button-nav.component';
import { LanguageService } from '../../services/language.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { APIService } from '../../services/api.service';
import { DashboardService } from '../../services/dashboard.service';
import { SharedDataService } from '../../services/shared.data.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';

describe('MatchmedsComponent', () => {
  let component: MatchmedsComponent;
  let fixture: ComponentFixture<MatchmedsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MatchmedsComponent, ButtonNavComponent],
      providers: [LanguageService, HttpClient, HttpHandler, APIService,
        DashboardService, SharedDataService, ToastrService, InfokitService],
      imports: [ToastrModule.forRoot(), RouterTestingModule]
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


