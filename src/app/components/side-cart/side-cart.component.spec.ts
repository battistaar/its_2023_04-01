import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideCartComponent } from './side-cart.component';
import { CartSourceService } from 'src/app/services/cart-source.service';
import { Subject } from 'rxjs';
import { CartItem } from 'src/app/interfaces/cart-item';
import { VatService } from 'src/app/services/vat.service';
import { CartUtilsService } from 'src/app/services/cart-utils.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('SideCartComponent', () => {
  let component: SideCartComponent;
  let fixture: ComponentFixture<SideCartComponent>;

  let mockCartSource = {
    items$: new Subject<CartItem[]>(),
    setQuantity: jasmine.createSpy()
  }
  let mockVatSrv = {
    vat$: new Subject<number>()
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [SideCartComponent],
      providers: [
        { provide: CartSourceService, useValue:  mockCartSource},
        { provide: VatService, useValue: mockVatSrv},
        CartUtilsService
      ]
    });
    fixture = TestBed.createComponent(SideCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
