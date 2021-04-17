import { TestBed } from '@angular/core/testing';

import { LedgerServiceService } from './ledger-service.service';

describe('LedgerServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LedgerServiceService = TestBed.get(LedgerServiceService);
    expect(service).toBeTruthy();
  });
});
