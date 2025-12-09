import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalResumenPedido } from './modal-resumen-pedido';

describe('ModalResumenPedido', () => {
  let component: ModalResumenPedido;
  let fixture: ComponentFixture<ModalResumenPedido>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalResumenPedido]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalResumenPedido);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
