import { ChangeDetectionStrategy, Component } from '@angular/core';
import { combineLatest, map, startWith } from 'rxjs';
import { CartItem } from 'src/app/interfaces/cart-item';
import { CartSourceService } from 'src/app/services/cart-source.service';
import { CartUtilsService } from 'src/app/services/cart-utils.service';
import { VatService } from 'src/app/services/vat.service';

@Component({
  selector: 'app-side-cart',
  templateUrl: './side-cart.component.html',
  styleUrls: ['./side-cart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideCartComponent {
  cartItems$ = combineLatest([
                this.cartSrv.items$.pipe(startWith([])),
                this.vatService.vat$.pipe(startWith(0))
              ])
                .pipe(
                  map(([items, vat]) => items.map(item => ({
                    ...item,
                    price: this.cartUtils.getPrice(item, vat)
                  })))
                )

  total$ = combineLatest([
            this.cartSrv.items$.pipe(startWith([])),
            this.vatService.vat$.pipe(startWith(0))
          ])
            .pipe(
              map(([items, vat]) => {
                return this.cartUtils.getSummary(items, vat);
              }),
              map(summary => summary.totalPrice)
            )

  constructor(private cartSrv: CartSourceService,
              private vatService: VatService,
              private cartUtils: CartUtilsService) {}


  removeItem(event: MouseEvent, item: CartItem) {
    event.preventDefault();
    event.stopPropagation();
    this.cartSrv.remove(item.id);
  }
}
