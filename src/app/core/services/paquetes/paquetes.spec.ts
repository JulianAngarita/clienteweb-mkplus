import { TestBed } from '@angular/core/testing';

import { PaquetesService } from './paquetes';

describe('Paquetes', () => {
  let service: PaquetesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaquetesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
