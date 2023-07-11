import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardComponent } from './product-card.component';
import { CurrencyPipe } from '@angular/common';
import { DiscountAmountPipe } from 'src/app/pipes/discount-amount.pipe';
import { ReactiveFormsModule } from '@angular/forms';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ProductCardComponent, DiscountAmountPipe],
      providers: [CurrencyPipe]
    });
    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    component.product = {id: '1', name: 'test', description: 'test desc', netPrice: 100, discount: 0.5, weight: 100};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
