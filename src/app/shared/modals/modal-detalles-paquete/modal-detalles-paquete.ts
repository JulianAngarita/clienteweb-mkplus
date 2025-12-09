import { Component, inject, Input } from '@angular/core';
import IPaquetes, { paqueteEI } from '../../../core/interfaces/paquetes/paquetes.interface';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-detalles-paquete',
  imports: [],
  templateUrl: './modal-detalles-paquete.html',
  styleUrl: './modal-detalles-paquete.scss',
})
export class ModalDetallesPaquete {

  @Input() paquete: IPaquetes = structuredClone(paqueteEI);

  public activeModal = inject(NgbActiveModal);

  formatCurrency(value: number) {
    return new Intl.NumberFormat('es-CO', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  }
}
