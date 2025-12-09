import { TestBed } from '@angular/core/testing';

import { ServiciosServicios } from './servicios';

describe('Servicios', () => {
  let service: ServiciosServicios;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciosServicios);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
