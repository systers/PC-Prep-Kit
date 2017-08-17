import { fakeAsync, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../app/services/auth.service';
import { HttpModule, XHRBackend, ResponseOptions, Response, RequestMethod } from '@angular/http';
import { APIService } from '../../app/services/api.service';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { environment } from '../../environments/environment';

const localStorageKey = environment.localStorageKey;
const baseAPIUrl = environment.baseURL + environment.apiEndpoint;
const mockLoginResponse = {user: {email: 'abc@gmail.com', name: 'Rajath'}, token: 'abcdef'};
const mockAuthenticatedResponse = {authenticated: true, token: 'abcdef'};
const loginAuthUrl = baseAPIUrl + 'login';
const logoutAuthUrl = baseAPIUrl + 'logout';
const authenticatedApi = baseAPIUrl  + 'authenticated';

describe('AuthService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AuthService, 
                APIService,
                {
                  provide: XHRBackend,
                  useClass: MockBackend
                }               
            ],
			imports: [
				RouterTestingModule,
				HttpModule
			],           
        });
    });

    beforeEach(() => { fakeAsync(
        inject([
            XHRBackend, 
            AuthService
        ], (mockBackend: MockBackend, service: AuthService) => {
            mockBackend.connections.subscribe(
                (connection: MockConnection) => {
                    if (connection.request.url === logoutAuthUrl) {
                        expect(connection.request.method).toBe(RequestMethod.Get);
                        connection.mockRespond(new Response(
                            new ResponseOptions({})
                        ));                
                    } 
                    if (connection.request.url === authenticatedApi) {
                        expect(connection.request.method).toBe(RequestMethod.Get);
                        connection.mockRespond(new Response(
                            new ResponseOptions({body: mockAuthenticatedResponse})
                        ));               
                    }                     
                    if (connection.request.url === loginAuthUrl) {
                        expect(connection.request.method).toBe(RequestMethod.Post);
                        connection.mockRespond(new Response(
                            new ResponseOptions({ body: mockLoginResponse })
                        ));                    
                    }
                }); 
            })
        )
    });    

    it('should be created', inject([AuthService], (service: AuthService) => {
        expect(service).toBeTruthy();
    }));

    it('should clear token from local storage on logging out', inject([AuthService], (service: AuthService) => {
                service.logout()
                        .subscribe(res => {
                            expect(localStorage.getItem(localStorageKey)).toBe(null);
                        });
    }));
    it('should add token to localstorage on logging in', inject([AuthService], (service: AuthService) => {               
                service.loginUser({email: 'abc@gmail.com', password: 'abc'})
                        .subscribe(res => {
                            expect(res).toBeTruthy();
                            expect(localStorage.getItem(localStorageKey)).toBeDefined();
                        });
    })); 
    it('should check for authentication', inject([AuthService], (service: AuthService) => {               
                service.authenticated()
                        .subscribe(res => {
                            expect(res.authenticated).toBeTruthy();
                        });
    }));        
});
