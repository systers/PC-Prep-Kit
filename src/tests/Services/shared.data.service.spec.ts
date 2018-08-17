import { inject, TestBed } from '@angular/core/testing';
import { DashboardService } from '../../app/services/dashboard.service';
import { SharedDataService } from '../../app/services/shared.data.service';
import { APIService } from '../../app/services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';

describe('SharedDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ToastrModule.forRoot()
      ],
      providers: [SharedDataService, DashboardService, APIService,
        ToastrService]
    });
  });

  it('should be created', inject([SharedDataService], (service: SharedDataService) => {
    expect(service).toBeTruthy();
  }));
});
