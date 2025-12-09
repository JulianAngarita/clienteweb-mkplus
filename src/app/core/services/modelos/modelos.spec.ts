import { TestBed } from '@angular/core/testing';
import { ModelosService } from './modelos';


describe('Modelos', () => {
  let service: ModelosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
