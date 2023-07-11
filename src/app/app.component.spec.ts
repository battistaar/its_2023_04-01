import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DEFAULT_VAT } from './services/vat.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule.withRoutes([])],
    declarations: [AppComponent],
    providers: [
      {provide: DEFAULT_VAT, useValue: 0}
    ]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
