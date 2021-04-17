import { TestBed } from '@angular/core/testing';
import 'jasmine';

import { NavparamreplacementService } from './navparamreplacement.service';

describe('NavparamreplacementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NavparamreplacementService = TestBed.get(NavparamreplacementService);
    expect(service).toBeTruthy();
  });
});
