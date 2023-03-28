import { TestBed } from '@angular/core/testing';

import { MyProfilGuard } from './my-profil.guard';

describe('MyProfilGuard', () => {
  let guard: MyProfilGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MyProfilGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
