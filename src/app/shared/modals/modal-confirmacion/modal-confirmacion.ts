import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-confirmacion',
  imports: [],
  templateUrl: './modal-confirmacion.html',
  styleUrl: './modal-confirmacion.scss',
})
export class ModalConfirmacion {
  public activeModal = inject(NgbActiveModal);

  @Input() title: string = 'Información';
  @Input() information: string = '';
  @Input() buttonText: string = 'Aceptar';
  @Input() buttonCancel: string = 'Cancelar';
}
