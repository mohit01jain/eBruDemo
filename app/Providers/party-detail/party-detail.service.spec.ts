import { TestBed } from '@angular/core/testing';

import { PartyDetailService } from './party-detail.service';

describe('PartyDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PartyDetailService = TestBed.get(PartyDetailService);
    expect(service).toBeTruthy();
  });
});
