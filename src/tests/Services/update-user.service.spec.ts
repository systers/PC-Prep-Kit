import { TestBed, inject } from '@angular/core/testing';
import { APIService } from '../../app/services/api.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { UpdateUserService } from '../../app/services/update-user.service';

describe('UpdateUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpdateUserService, APIService, HttpClient, HttpHandler]
    });
  });

  it('should be created', inject([UpdateUserService], (service: UpdateUserService) => {
    expect(service).toBeTruthy();
  }));
});
