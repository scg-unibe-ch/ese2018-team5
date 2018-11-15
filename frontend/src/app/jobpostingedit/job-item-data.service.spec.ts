import { TestBed, inject } from '@angular/core/testing';

import { JobItemDataService } from './job-item-data.service';

describe('JobItemDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JobItemDataService]
    });
  });

  it('should be created', inject([JobItemDataService], (service: JobItemDataService) => {
    expect(service).toBeTruthy();
  }));
});
