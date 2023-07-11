import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { pick } from "lodash";
import { Observable, catchError, of } from "rxjs";
import { Product } from "src/app/interfaces/product";
import { ProductService } from "src/app/services/product.service";

@Injectable({ providedIn: 'root' })
export class ProductResolver implements Resolve<Product> {
  constructor(private productSrv: ProductService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Product> {
    return this.productSrv.get(route.params['id']);
  }
}
