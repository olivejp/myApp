import { TestBed } from '@angular/core/testing';

import { GeolocalService } from './geolocal.service';

describe('GeolocalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeolocalService = TestBed.get(GeolocalService);
    expect(service).toBeTruthy();
  });
});
