import { TestBed } from '@angular/core/testing';

import { DEFAULT_VAT, VatService } from './vat.service';

describe('VatService', () => {
  let service: VatService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: DEFAULT_VAT, useValue: 0}
      ]
    });
    service = TestBed.inject(VatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
