import { TestBed } from '@angular/core/testing';

import { GalerieGuard } from './galerie.guard';

describe('GalerieGuard', () => {
  let guard: GalerieGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GalerieGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
