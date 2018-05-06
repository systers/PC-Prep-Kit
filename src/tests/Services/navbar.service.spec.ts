import { fakeAsync, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarService } from '../../app/services/navbar.service';
import { HttpModule, XHRBackend, ResponseOptions, Response, RequestMethod } from '@angular/http';
import { APIService } from '../../app/services/api.service';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { environment } from '../../environments/environment';

const baseAPIUrl = environment.baseURL + environment.apiEndpoint;
const mockUserNameResponse = [];
mockUserNameResponse.push({username: 'Rajath'});
mockUserNameResponse.push({error: 'Something went wrong'});
const getUsername = baseAPIUrl + 'username';

describe('NavbarService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                NavbarService,
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
            NavbarService
        ], (mockBackend: MockBackend, service: NavbarService) => {
            mockBackend.connections.subscribe(
                (connection: MockConnection) => {
                    if (connection.request.url === getUsername) {
                        expect(connection.request.method).toBe(RequestMethod.Get);
                        connection.mockRespond(new Response(
                            new ResponseOptions({body: mockUserNameResponse.shift()})
                        ));
                    }
                });
            })
        )
    });

    it('should be created', inject([NavbarService], (service: NavbarService) => {
        expect(service).toBeTruthy();
    }));

    it('should return the username', inject([NavbarService], (service: NavbarService) => {
        service.getUserName()
            .subscribe(res => {
                expect(res).toBe({username: 'Rajath'});
            });
    }));
    it('should return server error', inject([NavbarService], (service: NavbarService) => {
        service.getUserName()
            .subscribe(res => {
                expect(res).toBe({error: 'Something went wrong'});
            });
    }));
});

