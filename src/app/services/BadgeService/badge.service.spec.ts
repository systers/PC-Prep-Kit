import { TestBed, inject } from '@angular/core/testing';
import { BadgeService } from './badge.service';
import { APIService } from '../api.service';
import { NotifyService } from '../../badge/notify';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';


const _baseAPIUrl = environment.baseURL + environment.apiEndpoint;
const _getUserBadge = _baseAPIUrl + 'user/badge';
const _updateUserBadge = _baseAPIUrl + 'user/badge/update';
const mockBadge = {badge: 2};
const mockBadgeObject = {
  name: 'Skilled',
  message: 'You have come a long way with your skills.',
  image: 'assets/img/badges/skilled.png'
};
const mockUpdateResponse = { info: 'Badge updated'};

describe('BadgeService', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BadgeService, APIService, NotifyService],
      imports: [HttpClientTestingModule]
    });
    httpClient = TestBed.get(HttpClient);
    httpMock = TestBed.get(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });


  it('should be created', inject([BadgeService], (service: BadgeService) => {
    expect(service).toBeTruthy();
  }));

  it('should get the user\'s badge number', inject([BadgeService], (service: BadgeService) => {
    service.getBadgeNumber().subscribe(
      res => expect(res).toEqual(mockBadge.badge)
    );
    const request = httpMock.expectOne(_getUserBadge);
    request.flush(mockBadge);
  }));

  it('should get the user\'s Object', inject([BadgeService], (service: BadgeService) => {
    service.getBadge().subscribe(
      res => expect(res).toEqual(mockBadgeObject)
    );
    const request = httpMock.expectOne(_getUserBadge);
    request.flush(mockBadge);
  }));

  it('should update user\'s badge', inject([BadgeService, NotifyService], (service: BadgeService, notify: NotifyService) => {
    spyOn(notify, 'notifyOther');
    const badgeNumber = 10;
    service.updateBadgeNumber(badgeNumber).subscribe(
      () => {
        expect(notify.notifyOther).toHaveBeenCalledWith(true);
      }
    );
    const request = httpMock.expectOne(_updateUserBadge);
    request.flush(mockUpdateResponse);
  }));
});


