import { TestBed } from '@angular/core/testing';
import { CotizadorService } from './cotizador';


describe('Cotizador', () => {
  let service: CotizadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CotizadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
