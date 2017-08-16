import { fakeAsync, TestBed, inject } from '@angular/core/testing';
import { HttpModule, XHRBackend, ResponseOptions, Response, RequestMethod } from '@angular/http';
import { APIService } from '../../app/services/api.service';
import { DashboardService } from '../../app/services/dashboard.service';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { environment } from '../../environments/environment';

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
const mockUserInfoResponse = {user: {email: 'abc@gmail.com', name: 'Rajath'}};
const mockGetProgressStatusResponse = {stage: 1, activity: 2};
const mockUpdateProgressStatusResponse = {info: 'success'};
const mockMailPCPolicyResponse = {message: 'Mail Sent Succesfully.'}

describe('DashboardService', () => {
    beforeEach(() => {
            TestBed.configureTestingModule({
            imports: [
                HttpModule
            ], 
            providers: [
                DashboardService,
                APIService,
                {
                  provide: XHRBackend,
                  useClass: MockBackend
                }                
            ]
        });
    });
    beforeEach(() => { fakeAsync(
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
                            new ResponseOptions({body: mockMailPCPolicyResponse})
                        ));               
                    }                                      
                    if (connection.request.url === updateProgressStatus) {
                        expect(connection.request.method).toBe(RequestMethod.Put);
                        connection.mockRespond(new Response(
                            new ResponseOptions({ body: mockUpdateProgressStatusResponse })
                        ));                    
                    }
                }); 
            })
        )
    });    

    it('should be created', inject([DashboardService], (service: DashboardService) => {
        expect(service).toBeTruthy();
    }));

    it('should get user info', inject([DashboardService], (service: DashboardService) => {
                service.getUserInfo()
                        .subscribe(res => {
                            expect(res).toBe(mockUserInfoResponse);
                        });
    }));

    it('should get user progress status', inject([DashboardService], (service: DashboardService) => {
                service.getProgressStatus()
                        .subscribe(res => {
                            expect(res).toBe({stage: 1, activity: 2});
                        });
    }));

    it('should return account does not exist if the user is invalid', inject([DashboardService], (service: DashboardService) => {
                service.getProgressStatus()
                        .subscribe(res => {
                            expect(res).toBe({info: 'This account does not exist'});
                        });
    })); 

    it('should return no data found if the user is invalid', inject([DashboardService], (service: DashboardService) => {
                service.getProgressStatus()
                        .subscribe(res => {
                            expect(res).toBe({info: 'No data found'});
                        });
    }));

    it('should return error response in case of server error', inject([DashboardService], (service: DashboardService) => {
                service.getProgressStatus()
                        .subscribe(res => {
                            expect(res).toBe({error: 'Something went wrong while fetching user progress data'});
                        });
    }));           

    it('should update user progress status', inject([DashboardService], (service: DashboardService) => {
                service.updateProgressStatus({stage: 1, activity: 2})
                        .subscribe(res => {
                            expect(res).toBe(mockUpdateProgressStatusResponse);
                        });
    })); 

    it('should mail pc policy', inject([DashboardService], (service: DashboardService) => {
                service.mailpcpolicy()
                        .subscribe(res => {
                            expect(res).toBe(mockMailPCPolicyResponse);
                        });
    }));           

});
