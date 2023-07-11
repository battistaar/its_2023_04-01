import { Component } from '@angular/core';
import { map } from 'rxjs';
import { CartSourceService } from 'src/app/services/cart-source.service';

@Component({
  selector: 'app-products-container',
  templateUrl: './products-container.component.html',
  styleUrls: ['./products-container.component.css']
})
export class ProductsContainerComponent {
  hasItems$ = this.cartSrv.items$
                .pipe(
                  map(items => !!items.length)
                )

  constructor(private cartSrv: CartSourceService) {}
}
