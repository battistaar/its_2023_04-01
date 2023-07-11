import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFiltersComponent } from './product-filters.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('ProductFiltersComponent', () => {
  let component: ProductFiltersComponent;
  let fixture: ComponentFixture<ProductFiltersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductFiltersComponent],
      imports: [ReactiveFormsModule]
    });
    fixture = TestBed.createComponent(ProductFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
