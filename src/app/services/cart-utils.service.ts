import { Injectable } from '@angular/core';
import { CartItem } from '../interfaces/cart-item';
import { ProductUtilsService } from './product-utils.service';

@Injectable({
  providedIn: 'root'
})
export class CartUtilsService {

  constructor(private productUtils: ProductUtilsService) { }
  
  getPriceWithoutVat(item: CartItem) {
    return this.productUtils.getPriceWithoutVat(item.product) * item.quantity;
  }

  getFullPrice(item: CartItem, vat: number = 0) {
    return this.productUtils.getFullPrice(item.product, vat) * item.quantity;
  }

  getPrice(item: CartItem, vat: number = 0) {
    return this.productUtils.getPrice(item.product, vat) * item.quantity;
  }

  getDiscountAmount(item: CartItem, vat: number = 0) {
    return this.productUtils.getDiscountAmount(item.product, vat) * item.quantity;
  }

  getVatAmount(item: CartItem, vat: number = 0) {
    return this.productUtils.getVatAmount(item.product, vat) * item.quantity;
  }
  
  getTransportFee(weight: number) {
    let transportFee = 0;
    if (weight >= 2000) {
        transportFee = 7;
    }
  
    if (weight >= 5000) {
        transportFee = 15;
    }
  
    if (weight >= 10000) {
        transportFee = 20;
    }
    return transportFee;
  }
  

  getSummary(items: CartItem[], vat: number) {
    let summary = items.reduce((summ, item) => {
      let discountedPrice = this.getPriceWithoutVat(item);
      const vatAmount = this.getVatAmount(item, vat);
      const weight = item.product.weight * item.quantity;
      const price = this.getPrice(item, vat);
      return {
        netTotal: summ.netTotal + discountedPrice,
        totalVat: summ.totalVat +  vatAmount,
        totalWeight: summ.totalWeight + weight,
        totalPrice: summ.totalPrice + price
      };
    }, { netTotal: 0, totalVat: 0, totalWeight: 0, totalPrice: 0 });

    const transportFee = this.getTransportFee(summary.totalWeight);

    return {
      ...summary,
      totalPrice: summary.totalPrice + transportFee,
      transportFee
    }
  }
}
