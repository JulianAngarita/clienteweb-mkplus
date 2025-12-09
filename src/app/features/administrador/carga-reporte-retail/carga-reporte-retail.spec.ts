import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaReporteRetail } from './carga-reporte-retail';

describe('CargaReporteRetail', () => {
  let component: CargaReporteRetail;
  let fixture: ComponentFixture<CargaReporteRetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CargaReporteRetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargaReporteRetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
