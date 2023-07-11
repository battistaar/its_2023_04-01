import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailComponent } from './product-detail.component';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { VatService } from 'src/app/services/vat.service';
import { RouterTestingModule } from '@angular/router/testing';
import { CartSourceService } from 'src/app/services/cart-source.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let routeData = new Subject<{product: Product}>();
  let mockVatSrv = {
    vat$: new Subject<number>()
  }
  let spyCartSoruce = jasmine.createSpyObj('CartSourceService', ['add']);
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([]), ReactiveFormsModule],
      declarations: [ProductDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: {data: routeData} },
        { provide: CartSourceService, useValue: spyCartSoruce },
        { provide: VatService, useValue: mockVatSrv}
      ]
    });
    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
