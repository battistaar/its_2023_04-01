import { ChangeDetectionStrategy, Component, DoCheck, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Product } from 'src/app/interfaces/product';
import { ProductUtilsService } from 'src/app/services/product-utils.service';

export interface AddProductEvent {
  item: Product,
  quantity: number
}

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent {
  quantityInput = new FormControl(1, {validators: [Validators.min(1), Validators.required]});

  @Input()
  product: Product | null = null;

  @Input()
  vat = 0;

  get price() {
    return this.productUtil.getPrice(this.product!, this.vat);
  }

  get discount() {
    return this.productUtil.getDiscountAmount(this.product!, this.vat);
  }

  @Output()
  add = new EventEmitter<AddProductEvent>();

  @Output()
  detail = new EventEmitter<Product>();

  constructor(private productUtil: ProductUtilsService) {}

  onAdd() {
    if (this.quantityInput.valid) {
      this.add.emit({item: this.product!, quantity: this.quantityInput.value!});
    }
  }

  onDetail($event: MouseEvent){
    $event.preventDefault();
    this.detail.next(this.product!);
  }
}
