import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotizadorTienda } from './cotizador-tienda';

describe('CotizadorTienda', () => {
  let component: CotizadorTienda;
  let fixture: ComponentFixture<CotizadorTienda>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CotizadorTienda]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CotizadorTienda);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
