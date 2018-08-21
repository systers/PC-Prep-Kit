import { TestBed, inject } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

import { PerformanceDisplayService } from '../../app/services/performance-display.service';

describe('PerformanceDisplayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PerformanceDisplayService],
      imports: [MatDialogModule, RouterTestingModule]
    });
  });

  it('should be created', inject([PerformanceDisplayService], (service: PerformanceDisplayService) => {
    expect(service).toBeTruthy();
  }));
});

