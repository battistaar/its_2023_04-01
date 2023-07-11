import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, of } from 'rxjs';
import { CartItem } from '../interfaces/cart-item';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartSourceService {
  private _items$ = new BehaviorSubject<CartItem[]>([]);
  items$ = this._items$.asObservable();

  constructor(private http: HttpClient) {
    this.fetch();
  }

  setQuantity(id: string, quantity: number) {
    this.http.patch<CartItem>(`/api/cart-items/${id}`, {quantity})
      .subscribe(updated => {
        const index = this._items$.value.findIndex(i => i.id === id);
        const clone = structuredClone(this._items$.value);
        clone[index] = updated;
        this._items$.next(clone);
      });
  }

  fetch() {
    this.http.get<CartItem[]>('/api/cart-items')
      .subscribe(items => this._items$.next(items));
  }

  add(productId: string, quantity: number) {
    this.http.post<CartItem | null>('/api/cart-items', {productId, quantity})
      .pipe(
        catchError(err => {
          console.error(err);
          return of(null);
        })
      )
      .subscribe(item => {
        const items = this._items$.value;
        if (item) {
          const index = items.findIndex(i => i.id === item.id);
          if (index !== -1) {
            items[index] = item;
          } else {
            items.push(item);
          }
        }
        this._items$.next(items);
      });
  }

  remove(id: string) {
    this.http.delete(`/api/cart-items/${id}`)
      .subscribe(_ => {
        const items = this._items$.value;
        const index = items.findIndex(item => item.id === id);
        items.splice(index, 1);
        this._items$.next(items);
      })
  }
}
