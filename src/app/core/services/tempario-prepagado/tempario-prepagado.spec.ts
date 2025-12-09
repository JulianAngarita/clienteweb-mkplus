import { TestBed } from '@angular/core/testing';

import { TemparioPrepagadoService } from './tempario-prepagado';

describe('TemparioPrepagado', () => {
  let service: TemparioPrepagadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemparioPrepagadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
