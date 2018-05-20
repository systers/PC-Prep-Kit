import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService} from '../../app/services/auth.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';
import {APIService} from '../../app/services/api.service';
import {environment} from '../../environments/environment';

const localStorageKey = environment.localStorageKey;
const baseAPIUrl = environment.baseURL + environment.apiEndpoint;
const mockLoginResponse = {user: {email: 'abc@gmail.com', name: 'Rajath'}, token: 'abcdef'};
const mockAuthenticatedResponse = {authenticated: true, token: 'abcdef'};
const loginAuthUrl = baseAPIUrl + 'login';
const logoutAuthUrl = baseAPIUrl + 'logout';
const authenticatedApi = baseAPIUrl + 'authenticated';

describe('AuthService', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        APIService,
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
    });
    httpClient = TestBed.get(HttpClient);
    httpMock = TestBed.get(HttpTestingController);
    authService = TestBed.get(AuthService);

  });
  afterEach(() => {
    httpMock.verify();
  });
  // beforeEach(() => { fakeAsync(
  //     inject([
  //         XHRBackend,
  //         AuthService
  //     ], (mockBackend: MockBackend, service: AuthService) => {
  //         mockBackend.connections.subscribe(
  //             (connection: MockConnection) => {
  //                 if (connection.request.url === logoutAuthUrl) {
  //                     expect(connection.request.method).toBe(RequestMethod.Get);
  //                     connection.mockRespond(new Response(
  //                         new ResponseOptions({})
  //                     ));
  //                 }
  //                 if (connection.request.url === authenticatedApi) {
  //                     expect(connection.request.method).toBe(RequestMethod.Get);
  //                     connection.mockRespond(new Response(
  //                         new ResponseOptions({body: mockAuthenticatedResponse})
  //                     ));
  //                 }
  //                 if (connection.request.url === loginAuthUrl) {
  //                     expect(connection.request.method).toBe(RequestMethod.Post);
  //                     connection.mockRespond(new Response(
  //                         new ResponseOptions({ body: mockLoginResponse })
  //                     ));
  //                 }
  //             });
  //         })
  //     )
  // });

  it('should be created', () => {
    expect(AuthService).toBeTruthy();
  });

  it('should add token to localstorage on logging in', () => {
    authService.loginUser({email: 'abc@gmail.com', password: 'abc'}).subscribe(
      response => {
        expect(response).toEqual(mockLoginResponse);
        expect(localStorage.getItem(localStorageKey)).toBeDefined();
      }
    );
    const request = httpMock.expectOne('' + loginAuthUrl);
    request.flush(mockLoginResponse);

  });

  it('should check for authentication', () => {
    authService.authenticated().subscribe(
      response => {
        expect(response.authenticated).toBeTruthy();
      }
    );
    const request = httpMock.expectOne(`${authenticatedApi}\ `);
    request.flush(mockAuthenticatedResponse);
  });
  it('should clear token from local storage on logging out', () => {
    authService.logout().subscribe(
      response => {
        expect(localStorage.getItem(localStorageKey)).toBe(null);
      }
    );
    const request = httpMock.expectOne(`${logoutAuthUrl}\ `);
    request.flush({});
  });
});
