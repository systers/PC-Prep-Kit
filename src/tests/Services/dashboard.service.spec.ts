import { inject, TestBed } from '@angular/core/testing';
import { APIService } from '../../app/services/api.service';
import { DashboardService } from '../../app/services/dashboard.service';
import { environment } from '../../environments/environment';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../app/services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';

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
mockUpdateProgressStatusResponse.push({error: 'No data received'});

const mockUserInfoResponse = {user: {email: 'abc@gmail.com', name: 'Rajath'}};

const mockMailPCPolicyResponse = [];
mockMailPCPolicyResponse.push({message: 'Mail Sent Successfully.'});
mockMailPCPolicyResponse.push({error: 'Something Went Wrong! Try again later.'});

describe('DashboardService', () => {
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


  it('should be created', () => {
    expect(DashboardService).toBeTruthy();
  });

  it('should get user info', inject([DashboardService], (service: DashboardService) => {
    service.getUserInfo()
      .subscribe(res => {
        expect(res).toEqual(mockUserInfoResponse);
      });
    const request = httpMock.expectOne(getUserInfo);
    request.flush(mockUserInfoResponse);
  }));

  it('should get user progress status', inject([DashboardService], (service: DashboardService) => {
    service.getProgressStatus()
      .subscribe(res => {
        expect(res).toEqual({stage: 1, activity: 2});
      });
    const request = httpMock.expectOne(getProgressStatus);
    request.flush(mockGetProgressStatusResponses.shift());
  }));

  it('should return account does not exist if the user is invalid', inject([DashboardService], (service: DashboardService) => {
    service.getProgressStatus()
      .subscribe(res => {
        expect(res).toEqual({info: 'This account does not exist'});
      });
    const request = httpMock.expectOne(getProgressStatus);
    request.flush(mockGetProgressStatusResponses.shift());
  }));

  it('should return no data found if the user is invalid', inject([DashboardService], (service: DashboardService) => {
    service.getProgressStatus()
      .subscribe(res => {
        expect(res).toEqual({info: 'No data found'});
      });
    const request = httpMock.expectOne(getProgressStatus);
    request.flush(mockGetProgressStatusResponses.shift());
  }));

  it('should return error response in case of server error', inject([DashboardService], (service: DashboardService) => {
    service.getProgressStatus()
      .subscribe(res => {
        expect(res).toEqual({error: 'Something went wrong while fetching user progress data'});
      });
    const request = httpMock.expectOne(getProgressStatus);
    request.flush(mockGetProgressStatusResponses.shift());
  }));

  it('should update user progress status', inject([DashboardService], (service: DashboardService) => {
    service.updateProgressStatus({stage: 1, activity: 2})
      .subscribe(res => {
        expect(res).toEqual({info: 'success'});
      });
    const request = httpMock.expectOne(updateProgressStatus);
    request.flush(mockUpdateProgressStatusResponse.shift());
  }));

  it('should return illegal operation if user is at wrong activity', inject([DashboardService], (service: DashboardService) => {
    service.updateProgressStatus({stage: 100, activity: 100})
      .subscribe(res => {
        expect(res).toEqual({info: 'Illegal operation'});
      });
    const request = httpMock.expectOne(updateProgressStatus);
    request.flush(mockUpdateProgressStatusResponse.shift());
  }));

  it('should return server errors', inject([DashboardService], (service: DashboardService) => {
    service.updateProgressStatus({stage: 1, activity: 2})
      .subscribe(res => {
        expect(res).toEqual({error: 'Something went wrong while updating progress status'});
      });
    const request = httpMock.expectOne(updateProgressStatus);
    request.flush(mockUpdateProgressStatusResponse.shift());
  }));

  it('should return no data received on sending empty request body', inject([DashboardService], (service: DashboardService) => {
    service.updateProgressStatus({})
      .subscribe(res => {
        expect(res).toEqual({error: 'No data received'});
      });
    const request = httpMock.expectOne(updateProgressStatus);
    request.flush(mockUpdateProgressStatusResponse.shift());
  }));

  it('should mail pc policy', inject([DashboardService], (service: DashboardService) => {
    service.mailpcpolicy()
      .subscribe(res => {
        expect(res).toEqual({message: 'Mail Sent Successfully.'});
      });
    const request = httpMock.expectOne(mailPcPolicyInfo);
    request.flush(mockMailPCPolicyResponse.shift());
  }));

  it('should return server error response', inject([DashboardService], (service: DashboardService) => {
    service.mailpcpolicy()
      .subscribe(res => {
        expect(res).toEqual({error: 'Something Went Wrong! Try again later.'});
      });
    const request = httpMock.expectOne(mailPcPolicyInfo);
    request.flush(mockMailPCPolicyResponse.shift());
  }));

});
