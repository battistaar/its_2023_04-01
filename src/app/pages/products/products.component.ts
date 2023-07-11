import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { omitBy } from 'lodash';
import { Subject, debounceTime, map, takeUntil } from 'rxjs';
import { AddProductEvent } from 'src/app/components/product-card/product-card.component';
import { Product } from 'src/app/interfaces/product';
import { CartSourceService } from 'src/app/services/cart-source.service';
import { ProductFilters } from 'src/app/services/product.service';
import { VatService } from 'src/app/services/vat.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy{

  private applyFilters$ = new Subject<ProductFilters>();

  filters$ = this.activatedRoute.data
              .pipe(
                map(data => data['filters'] as ProductFilters)
              );

  products$ = this.activatedRoute.data
                .pipe(
                  map(data => data['products'] as Product[])
                );

  vat$ = this.varSrv.vat$;

  private destroyed$ = new Subject<void>();

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private cartSrv: CartSourceService,
              private varSrv: VatService) {}

  ngOnInit(): void {
    this.applyFilters$
      .pipe(
        takeUntil(this.destroyed$),
        map(value => omitBy(value, val => val === '')),
        debounceTime(200)
      )
      .subscribe(filters => {
        this.router.navigate([], {queryParams: filters});
      });
  }

  ngOnDestroy(): void {
      this.destroyed$.next();
      this.destroyed$.complete();
  }

  filtersChanged(value: ProductFilters) {
    this.applyFilters$.next(value);
  }

  addProduct(event: AddProductEvent) {
    this.cartSrv.add(event.item.id, event.quantity);
  }

  goToDetail(product: Product) {
    this.router.navigate(['products', product.id]);
  }
}
