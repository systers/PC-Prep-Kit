import 'rxjs/Rx';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { AuthService } from '../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { APIService } from '../services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedDataService } from '../services/shared.data.service';
import { DashboardService } from '../services/dashboard.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { LanguageService } from '../services/language.service';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let apiService: APIService;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        ToastrModule.forRoot()
      ],
      providers: [
        AuthService,
        APIService,
        SharedDataService,
        DashboardService,
        ToastrService,
        LanguageService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = fixture.debugElement.injector.get(AuthService);
    apiService = TestBed.get(APIService);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
