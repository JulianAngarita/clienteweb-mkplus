import { TestBed } from '@angular/core/testing';

import { Utilidades } from './utilidades';

describe('Utilidades', () => {
  let service: Utilidades;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Utilidades);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
