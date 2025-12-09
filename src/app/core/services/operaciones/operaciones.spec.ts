import { TestBed } from '@angular/core/testing';

import { OperacionesService } from './operaciones';

describe('Operaciones', () => {
  let service: OperacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
