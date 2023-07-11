import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { pick } from "lodash";
import { Observable, catchError, of } from "rxjs";
import { Product } from "src/app/interfaces/product";
import { ProductService } from "src/app/services/product.service";

@Injectable({ providedIn: 'root' })
export class ProductsResolver implements Resolve<Product[]> {
  constructor(private productSrv: ProductService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Product[]> {
    const filters = pick(route.queryParams, ['name', 'minPrice', 'maxPrice']);
    return this.productSrv.list(filters)
            .pipe(
              catchError(err => of([]))
            )
  }
}
