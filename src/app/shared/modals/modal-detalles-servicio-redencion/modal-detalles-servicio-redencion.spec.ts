import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetallesServicioRedencion } from './modal-detalles-servicio-redencion';

describe('ModalDetallesServicioRedencion', () => {
  let component: ModalDetallesServicioRedencion;
  let fixture: ComponentFixture<ModalDetallesServicioRedencion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDetallesServicioRedencion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDetallesServicioRedencion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
