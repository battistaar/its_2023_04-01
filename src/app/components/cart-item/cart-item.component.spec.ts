import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItemComponent } from './cart-item.component';
import { CurrencyPipe } from '@angular/common';
import { DiscountAmountPipe } from 'src/app/pipes/discount-amount.pipe';
import { FormsModule } from '@angular/forms';

describe('CartItemComponent', () => {
  let component: CartItemComponent;
  let fixture: ComponentFixture<CartItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [CartItemComponent, DiscountAmountPipe],
      providers: [CurrencyPipe]
    });
    fixture = TestBed.createComponent(CartItemComponent);
    component = fixture.componentInstance;
    component.item = {id: '1', product: {id: '1', name: 'test', description: 'test desc', netPrice: 100, discount: 0.5, weight: 100}, quantity: 1};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
