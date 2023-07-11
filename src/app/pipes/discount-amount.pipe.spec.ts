import { TestBed } from '@angular/core/testing';
import { DiscountAmountPipe } from './discount-amount.pipe';
import { CurrencyPipe } from '@angular/common';

describe('DiscountAmountPipe', () => {
  let pipe: DiscountAmountPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrencyPipe, DiscountAmountPipe]
    })
  })
  it('create an instance', () => {
    const pipe = TestBed.inject(DiscountAmountPipe);
    expect(pipe).toBeTruthy();
  });
});
