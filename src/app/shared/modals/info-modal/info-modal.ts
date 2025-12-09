import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-info-modal',
  imports: [],
  templateUrl: './info-modal.html',
  styleUrl: './info-modal.scss',
})
export class InfoModal {
  public activeModal = inject(NgbActiveModal);

  @Input() title: string = 'Información';
  @Input() information: string = '';
  @Input() buttonText: string = 'Aceptar';


}
