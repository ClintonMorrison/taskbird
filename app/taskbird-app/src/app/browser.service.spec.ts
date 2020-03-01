import { TestBed, inject } from '@angular/core/testing';

import { BrowserServiceService } from './browser-service.service';

describe('BrowserServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BrowserServiceService]
    });
  });

  it('should be created', inject([BrowserServiceService], (service: BrowserServiceService) => {
    expect(service).toBeTruthy();
  }));
});
