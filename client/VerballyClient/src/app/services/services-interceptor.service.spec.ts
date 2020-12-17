import { TestBed } from '@angular/core/testing';

import { ServicesInterceptorService } from './services-interceptor.service';

describe('ServicesInterceptorService', () => {
  let service: ServicesInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
