import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, filter, takeUntil } from 'rxjs';
import { ProductFilters } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-filters',
  templateUrl: './product-filters.component.html',
  styleUrls: ['./product-filters.component.css']
})
export class ProductFiltersComponent implements OnInit, OnDestroy {
  filtersForm = this.fb.group({
    name: this.fb.control<string|null>(''),
    minPrice: this.fb.control<number|null>(null, {updateOn: 'submit', validators: [Validators.min(0)]}),
    maxPrice: this.fb.control<number|null>(null, {updateOn: 'submit'})
  });

  @Output()
  filtersChange = new EventEmitter<ProductFilters>();

  @Input()
  set filters(value: ProductFilters) {
    this.filtersForm.patchValue(value, {emitEvent: false});
    this.filtersForm.markAsPristine();
  }

  private destroyed$ = new Subject<void>()

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
      this.filtersForm.valueChanges
        .pipe(
          takeUntil(this.destroyed$),
          filter(_ => this.filtersForm.valid)
        )
        .subscribe(value => this.filtersChange.emit(value));
  }

  ngOnDestroy(): void {
      this.destroyed$.next();
      this.destroyed$.complete();
  }
}
