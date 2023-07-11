import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CartItem } from 'src/app/interfaces/cart-item';
import { CartUtilsService } from 'src/app/services/cart-utils.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SummaryComponent implements OnChanges {
  protected _items: CartItem[] = [];

  @Input()
  get items() {
    return this._items;
  }
  set items(value: CartItem[] | null) {
    if (!value) {
      value = [];
    }
    this._items = value;
  }

  @Input()
  vat = 0;

  summary = this.updateSummary();

  constructor(private cartUtils: CartUtilsService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items'] || changes['vat']) {
      this.summary = this.updateSummary();
    }
  }

  private updateSummary() {
    return this.cartUtils.getSummary(this._items, this.vat);
  }
}
