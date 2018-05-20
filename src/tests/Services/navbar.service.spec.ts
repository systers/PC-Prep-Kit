import {inject, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {NavbarService} from '../../app/services/navbar.service';
import {APIService} from '../../app/services/api.service';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AuthService} from '../../app/services/auth.service';

const baseAPIUrl = environment.baseURL + environment.apiEndpoint;
const mockUserNameResponse = [];
mockUserNameResponse.push({username: 'Rajath'});
mockUserNameResponse.push({error: 'Something went wrong'});
const getUsername = baseAPIUrl + 'username';

describe('NavbarService', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let authService: NavbarService;

  beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                NavbarService,
                APIService,
                AuthService,
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

    it('should be created', inject([NavbarService], (service: NavbarService) => {
        expect(service).toBeTruthy();
    }));

    it('should return the username', inject([NavbarService], (service: NavbarService) => {
        service.getUserName()
            .subscribe(res => {
                expect(res).toEqual({username: 'Rajath'});
            });
      const request = httpMock.expectOne(getUsername);
      request.flush(mockUserNameResponse.shift());
    }));
    it('should return server error', inject([NavbarService], (service: NavbarService) => {
        service.getUserName()
            .subscribe(res => {
                expect(res).toEqual({error: 'Something went wrong'});
            });
      const request = httpMock.expectOne(getUsername);
      request.flush(mockUserNameResponse.shift());
    }));
});

