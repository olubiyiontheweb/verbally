import { TestBed } from '@angular/core/testing';

import { AuthServicesService } from './auth-services.service';

describe('AuthServicesService', () => {
  let service: AuthServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
