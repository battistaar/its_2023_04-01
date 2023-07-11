import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutComponent } from './checkout.component';
import { Subject } from 'rxjs';
import { CartItem } from 'src/app/interfaces/cart-item';
import { CartSourceService } from 'src/app/services/cart-source.service';
import { VatService } from 'src/app/services/vat.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;

  let mockCartSource = {
    items$: new Subject<CartItem[]>(),
    setQuantity: jasmine.createSpy()
  }
  let mockVatSrv = {
    vat$: new Subject<number>()
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckoutComponent],
      providers: [
        { provide: CartSourceService, useValue: mockCartSource },
        { provide: VatService, useValue: mockVatSrv }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
