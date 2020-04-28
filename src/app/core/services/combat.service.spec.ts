import { TestBed } from '@angular/core/testing';

import { CombatService } from './combat.service';

describe('CombatService', () => {
  let service: CombatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CombatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
