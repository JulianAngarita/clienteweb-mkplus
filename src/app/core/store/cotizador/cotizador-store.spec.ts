import { TestBed } from '@angular/core/testing';

import { CotizadorStore } from './cotizador-store';

describe('CotizadorStore', () => {
  let service: CotizadorStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CotizadorStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
