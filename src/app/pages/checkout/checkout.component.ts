import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartSourceService } from '../../services/cart-source.service';
import { VatService } from '../../services/vat.service';
import { CartItem } from '../../interfaces/cart-item';
import { Subject, debounceTime, takeUntil } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  items$ = this.cartService.items$;
  vat$ = this.vatService.vat$;

  private updateQuantity$ = new Subject<{id: string, quantity: number}>();

  private destroyed$ = new Subject<void>();
  constructor(private cartService: CartSourceService,
              private vatService: VatService) {
  }

  ngOnInit(): void {

    this.updateQuantity$
      .pipe(
        takeUntil(this.destroyed$),
        debounceTime(200)
      )
      .subscribe(data => this.cartService.setQuantity(data.id, data.quantity));
  }

  ngOnDestroy(): void {
      this.destroyed$.next();
      this.destroyed$.complete();
  }

  updateQuantity(item: CartItem, quantity: number) {
    this.updateQuantity$.next({id: item.id, quantity})
  }

  trackById(_: number, item: CartItem) {
    return item.id;
  }
}


