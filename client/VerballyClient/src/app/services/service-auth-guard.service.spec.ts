import { TestBed } from '@angular/core/testing';

import { ServiceAuthGuardService } from './service-auth-guard.service';

describe('ServiceAuthGuardService', () => {
  let service: ServiceAuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceAuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
