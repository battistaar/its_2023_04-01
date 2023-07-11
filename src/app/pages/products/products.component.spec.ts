import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Product } from 'src/app/interfaces/product';
import { ProductsComponent } from './products.component';
import { Observable, Subject, of } from 'rxjs';
import { ProductFilters, ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartSourceService } from 'src/app/services/cart-source.service';
import { VatService } from 'src/app/services/vat.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let routeData = new Subject<{products: Product[], filters: ProductFilters}>();
  
  let spyCartSoruce = jasmine.createSpyObj('CartSourceService', ['add']);
  let mockVatSrv = {
    vat$: new Subject<number>()
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsComponent],
      providers: [
        { provide: ActivatedRoute, useValue: {data: routeData} },
        { provide: CartSourceService, useValue: spyCartSoruce },
        { provide: VatService, useValue: mockVatSrv }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
