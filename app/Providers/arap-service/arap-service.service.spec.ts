import { TestBed } from '@angular/core/testing';

import { ArapServiceService } from './arap-service.service';

describe('ArapServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArapServiceService = TestBed.get(ArapServiceService);
    expect(service).toBeTruthy();
  });
});
