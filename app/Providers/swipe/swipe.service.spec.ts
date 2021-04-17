import { TestBed } from '@angular/core/testing';

import { SwipeService } from './swipe.service';
import 'hammerjs';

describe('SwipeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SwipeService = TestBed.get(SwipeService);
    expect(service).toBeTruthy();
  });
});
