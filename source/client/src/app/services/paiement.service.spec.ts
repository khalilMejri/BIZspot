import { TestBed } from '@angular/core/testing';

import { PaiementService } from './paiement.service';

describe('PaiementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaiementService = TestBed.get(PaiementService);
    expect(service).toBeTruthy();
  });
});
