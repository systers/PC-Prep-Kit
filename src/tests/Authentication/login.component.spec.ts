import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from '../../app/authentication/login.component';
import { AuthService } from '../../app/services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { APIService } from '../../app/services/api.service';
import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let authService: AuthService;
    let apiService: APIService;
    let router = {
        navigateByUrl: jasmine.createSpy('navigateByUrl')
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ LoginComponent ],
            imports: [ 
                ReactiveFormsModule,
                RouterTestingModule,
                HttpModule
            ],
            providers: [
                { provide: Router, useValue: router },   
                AuthService,
                APIService
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

    it('should route to menu page on successful login', () => {
        spyOn(authService, 'loginUser')
        .and.returnValue(Observable.of(true));
        component.onSubmit({email: 'user@test.com', password: 'testpwd'});
        expect(router.navigateByUrl).toHaveBeenCalledWith('/');
    });

    it('should return error message on unsuccessful login', () => {
        spyOn(authService, 'loginUser')
        .and.returnValue(Observable.of(false));
        component.onSubmit({email: 'user@test.com', password: 'testpwd'});
        expect(component.errorMessage).toEqual('Incorrect username and password, please try again');
    }); 

    it('should return error/info message from server on unsuccessful login', () => {
        spyOn(authService, 'loginUser')
        .and.returnValue(Observable.throw({info: 'Invalid username/password'}));
        component.onSubmit({email: 'user@test.com', password: 'testpwd'});
        expect(component.errorMessage).toEqual('Invalid username/password');
    });         

});
