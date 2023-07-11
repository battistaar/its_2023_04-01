import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CartSourceService } from './cart-source.service';

describe('CartSourceService', () => {
  let service: CartSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CartSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
