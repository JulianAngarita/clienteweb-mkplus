import { TestBed } from '@angular/core/testing';

import { TerminoCondicionesService } from './termino-condiciones';

describe('TerminoCondiciones', () => {
  let service: TerminoCondicionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TerminoCondicionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
