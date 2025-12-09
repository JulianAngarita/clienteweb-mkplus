import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetallesPaquete } from './modal-detalles-paquete';

describe('ModalDetallesPaquete', () => {
  let component: ModalDetallesPaquete;
  let fixture: ComponentFixture<ModalDetallesPaquete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDetallesPaquete]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDetallesPaquete);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
