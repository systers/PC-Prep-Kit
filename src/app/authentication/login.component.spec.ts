import { Observable } from 'rxjs/Observable';
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
// import {RouterTestingModule} from '@angular/router/testing';


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

  // it('should route to menu page on successful login', () => {
  //   spyOn(authService, 'loginUser')
  //     .and.returnValue(Observable.of(true));
  //   component.onSubmit({email: 'user@test.com', password: 'testpwd'});
  //   expect(router.navigateByUrl).toHaveBeenCalledWith('/');
  // });
  //
  // it('should return error message on unsuccessful login', () => {
  //   spyOn(authService, 'loginUser')
  //     .and.returnValue(Observable.of(false));
  //   component.onSubmit({email: 'user@test.com', password: 'testpwd'});
  //   expect(component.errorMessage).toEqual('Incorrect username and password, please try again');
  // });
  //
  // it('should return error/info message from server on unsuccessful login', () => {
  //   spyOn(authService, 'loginUser')
  //     .and.returnValue(Observable.throw({info: 'Invalid username/password'}));
  //   component.onSubmit({email: 'user@test.com', password: 'testpwd'});
  //   expect(component.errorMessage).toEqual('Invalid username/password');
  // });

});
