import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { APIService } from '../../app/services/api.service';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../app/services/auth.service';

describe('apiService', () => {
  let httpMock: HttpTestingController;
  let apiService: APIService;


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
    httpMock = TestBed.get(HttpTestingController);
    apiService = TestBed.get(APIService);
  });

  afterEach(() => {
    httpMock.verify();
  });


  it('Checking get request', () => {
    apiService.get('mockURL').subscribe(res => {
        expect(res).toBeTruthy();
      }
    );


    const request = httpMock.expectOne('mockURL');
    request.flush(' mockResponse ');
  });

  it('Checking Post Request', () => {
    apiService.post('mockURL', {}).subscribe(res => {
        expect(res).toBeTruthy();
      }
    );

    const request = httpMock.expectOne('mockURL');
    request.flush(' mockResponse ');
  });

});
