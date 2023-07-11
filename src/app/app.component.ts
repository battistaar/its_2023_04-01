import { Component } from '@angular/core';
import { VatService } from './services/vat.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(protected varSrv: VatService) {
    let country = 'IT';
    this.varSrv.setCountry(country);
  }
}

