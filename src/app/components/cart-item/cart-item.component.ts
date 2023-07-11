import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from 'src/app/interfaces/cart-item';
import { CartUtilsService } from 'src/app/services/cart-utils.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartItemComponent {

  @Input()
  item: CartItem | null = null;

  @Input()
  vat = 0;

  @Output()
  quantityChange = new EventEmitter<number>();

  constructor(private cartUtils: CartUtilsService){}

  getItemPrice() {
    return this.cartUtils.getPrice(this.item!, this.vat);
  }

  getDiscountAmount() {
    return this.cartUtils.getDiscountAmount(this.item!, this.vat);
  }

  handleQuantityChange(event: number) {
    this.quantityChange.emit(event);
  }
}
