import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductsContainerComponent } from './products-container.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CartSourceService } from 'src/app/services/cart-source.service';
import { Subject } from 'rxjs';
import { CartItem } from 'src/app/interfaces/cart-item';

describe('ProductsContainerComponent', () => {
  let component: ProductsContainerComponent;
  let fixture: ComponentFixture<ProductsContainerComponent>;
  let mockCartSource = {
    items$: new Subject<CartItem[]>(),
    add: jasmine.createSpy()
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [ProductsContainerComponent],
      providers: [
        { provide: CartSourceService, useValue: mockCartSource },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(ProductsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
