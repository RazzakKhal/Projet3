import { TestBed } from '@angular/core/testing';

import { AccueilGuard } from './accueil.guard';

describe('AccueilGuard', () => {
  let guard: AccueilGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AccueilGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
