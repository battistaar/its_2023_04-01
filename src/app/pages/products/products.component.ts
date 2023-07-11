import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { omitBy } from 'lodash';
import { Subject, debounceTime, map, takeUntil } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { ProductFilters } from 'src/app/services/product.service';

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

  private destroyed$ = new Subject<void>();

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) {}

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

    this.activatedRoute.data.subscribe(data => console.log(data));
  }

  ngOnDestroy(): void {
      this.destroyed$.next();
      this.destroyed$.complete();
  }

  filtersChanged(value: ProductFilters) {
    this.applyFilters$.next(value);
  }
}
