import { TestBed } from '@angular/core/testing';

import { MessagerieGuard } from './messagerie.guard';

describe('MessagerieGuard', () => {
  let guard: MessagerieGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MessagerieGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
