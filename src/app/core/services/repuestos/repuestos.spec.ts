import { TestBed } from '@angular/core/testing';

import { RepuestosService } from './repuestos';

describe('Repuestos', () => {
  let service: RepuestosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepuestosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
