import { TestBed } from '@angular/core/testing';
import { FirmaSolicitudService } from './firma-solicitud';


describe('FirmaSolicitud', () => {
  let service: FirmaSolicitudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirmaSolicitudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
