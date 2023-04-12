import { TestBed } from '@angular/core/testing';

import { LikeGuard } from './like.guard';

describe('LikeGuard', () => {
  let guard: LikeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LikeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
