import {fakeAsync, TestBed, inject} from '@angular/core/testing';
import {HttpModule, XHRBackend, ResponseOptions, Response, RequestMethod} from '@angular/http';
import {APIService} from '../../app/services/api.service';
import {DashboardService} from '../../app/services/dashboard.service';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {environment} from '../../environments/environment';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../app/services/auth.service';
import {RouterTestingModule} from '@angular/router/testing';

const localStorageKey = environment.localStorageKey;

const baseAPIUrl = environment.baseURL + environment.apiEndpoint;

const getUserInfo = baseAPIUrl + 'getUserInfo';
const mailPcPolicyInfo = baseAPIUrl + 'mailpcpolicy';
const getProgressStatus = baseAPIUrl + 'getProgressStatus';
const updateProgressStatus = baseAPIUrl + 'updateProgressStatus';
const uploadCamPic = baseAPIUrl + 'uploadCam';
const uploadPic = baseAPIUrl + 'upload';

const mockGetProgressStatusResponses = [];
mockGetProgressStatusResponses.push({stage: 1, activity: 2});
mockGetProgressStatusResponses.push({info: 'This account does not exist'});
mockGetProgressStatusResponses.push({info: 'No data found'});
mockGetProgressStatusResponses.push({error: 'Something went wrong while fetching user progress data'});

const mockUpdateProgressStatusResponse = [];
mockUpdateProgressStatusResponse.push({info: 'success'});
mockUpdateProgressStatusResponse.push({info: 'Illegal operation'});
mockUpdateProgressStatusResponse.push({error: 'Something went wrong while updating progress status'});
mockUpdateProgressStatusResponse.push({error: 'No data recieved'});

const mockUserInfoResponse = {user: {email: 'abc@gmail.com', name: 'Rajath'}};

const mockMailPCPolicyResponse = [];
mockMailPCPolicyResponse.push({message: 'Mail Sent Succesfully.'});
mockMailPCPolicyResponse.push({error: 'Something Went Wrong! Try again later.'});

describe( 'DashboardService', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        DashboardService,
        APIService,
        AuthService
      ]
    });
    httpClient = TestBed.get(HttpClient);
    httpMock = TestBed.get(HttpTestingController);
  });
  afterEach(() => {
     httpMock.verify();
  });
  /*    beforeEach(() => { fakeAsync(
          inject([
              XHRBackend,
              DashboardService
          ], (mockBackend: MockBackend, service: DashboardService) => {
              mockBackend.connections.subscribe(
                  (connection: MockConnection) => {
                      if (connection.request.url === getUserInfo) {
                          expect(connection.request.method).toBe(RequestMethod.Get);
                          connection.mockRespond(new Response(
                              new ResponseOptions({body: mockUserInfoResponse})
                          ));
                      }
                      if (connection.request.url === getProgressStatus) {
                          expect(connection.request.method).toBe(RequestMethod.Get);
                          connection.mockRespond(new Response(
                              new ResponseOptions({body: mockGetProgressStatusResponses.shift()})
                          ));
                      }
                      if (connection.request.url === mailPcPolicyInfo) {
                          expect(connection.request.method).toBe(RequestMethod.Get);
                          connection.mockRespond(new Response(
                              new ResponseOptions({body: mockMailPCPolicyResponse.shift()})
                          ));
                      }
                      if (connection.request.url === updateProgressStatus) {
                          expect(connection.request.method).toBe(RequestMethod.Put);
                          connection.mockRespond(new Response(
                              new ResponseOptions({body: mockUpdateProgressStatusResponse.shift()})
                          ));
                      }
                  });
              })
          )*/
  /*});*/

  it('should be created', () => {
    expect(DashboardService).toBeTruthy();
  });

  it('should get user info', inject([DashboardService], (service: DashboardService) => {
    service.getUserInfo()
      .subscribe(res => {
        expect(res).toBe(mockUserInfoResponse);
      });
    const request = httpMock.expectOne(getUserInfo);
    request.flush(mockUserInfoResponse);
  }));

  it('should get user progress status', inject([DashboardService], (service: DashboardService) => {
    service.getProgressStatus()
      .subscribe(res => {
        expect(res).toBe({stage: 1, activity: 2});
      });
    const request = httpMock.expectOne(`${getProgressStatus}\ `);
    request.flush(mockGetProgressStatusResponses.shift());
  }));

  it('should return account does not exist if the user is invalid', inject([DashboardService], (service: DashboardService) => {
    service.getProgressStatus()
      .subscribe(res => {
        expect(res).toBe({info: 'This account does not exist'});
      });
    const request = httpMock.expectOne(`${getProgressStatus}\ `);
    request.flush(mockGetProgressStatusResponses.shift());
  }));

  it('should return no data found if the user is invalid', inject([DashboardService], (service: DashboardService) => {
    service.getProgressStatus()
      .subscribe(res => {
        expect(res).toBe({info: 'No data found'});
      });
    const request = httpMock.expectOne(`${getProgressStatus}\ `);
    request.flush(mockGetProgressStatusResponses.shift());
  }));

  it('should return error response in case of server error', inject([DashboardService], (service: DashboardService) => {
    service.getProgressStatus()
      .subscribe(res => {
        expect(res).toBe({error: 'Something went wrong while fetching user progress data'});
      });
    const request = httpMock.expectOne(`${getProgressStatus}\ `);
    request.flush(mockGetProgressStatusResponses.shift());
  }));

  it('should update user progress status', inject([DashboardService], (service: DashboardService) => {
    service.updateProgressStatus({stage: 1, activity: 2})
      .subscribe(res => {
        expect(res).toBe({info: 'success'});
      });
    const request = httpMock.expectOne(`${updateProgressStatus}\ `);
    request.flush(mockUpdateProgressStatusResponse.shift());
  }));

  it('should return illegal operation if user is at wrong activity', inject([DashboardService], (service: DashboardService) => {
    service.updateProgressStatus({stage: 100, activity: 100})
      .subscribe(res => {
        expect(res).toBe({info: 'Illegal operation'});
      });
    const request = httpMock.expectOne(`${updateProgressStatus}\ `);
    request.flush(mockUpdateProgressStatusResponse.shift());
  }));

  it('should return server errors', inject([DashboardService], (service: DashboardService) => {
    service.updateProgressStatus({stage: 1, activity: 2})
      .subscribe(res => {
        expect(res).toBe({error: 'Something went wrong while updating progress status'});
      });
    const request = httpMock.expectOne(`${updateProgressStatus}\ `);
    request.flush(mockUpdateProgressStatusResponse.shift());
  }));

  it('should return no data recieved on sending empty request body', inject([DashboardService], (service: DashboardService) => {
    service.updateProgressStatus({})
      .subscribe(res => {
        expect(res).toBe({error: 'No data recieved'});
      });
    const request = httpMock.expectOne(`${updateProgressStatus}\ `);
    request.flush(mockUpdateProgressStatusResponse.shift());
  }));

  it('should mail pc policy', inject([DashboardService], (service: DashboardService) => {
    service.mailpcpolicy()
      .subscribe(res => {
        expect(res).toBe({message: 'Mail Sent Succesfully.'});
      });
    const request = httpMock.expectOne(`${mailPcPolicyInfo}\ `);
    request.flush(mockMailPCPolicyResponse.shift());
  }));

  it('should return server error response', inject([DashboardService], (service: DashboardService) => {
    service.mailpcpolicy()
      .subscribe(res => {
        expect(res).toBe({error: 'Something Went Wrong! Try again later.'});
      });
    const request = httpMock.expectOne(`${mailPcPolicyInfo}\ `);
    request.flush(mockMailPCPolicyResponse.shift());
  }));

});
