import { TestBed } from '@angular/core/testing';

import { TemparioService } from './tempario';

describe('Tempario', () => {
  let service: TemparioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemparioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
