import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-email',
  imports: [
    FormsModule,
  ],
  templateUrl: './modal-email.html',
  styleUrl: './modal-email.scss',
})
export class ModalEmail {
  correo: string = '';

  public modalActivo = inject(NgbActiveModal);

  enviarEmail() {
    this.modalActivo.close(this.correo);
  }

  cancel() {
    this.modalActivo.dismiss();
  }
}
