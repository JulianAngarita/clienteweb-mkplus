import { inject, Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InfoModal } from '../../../shared/modals/info-modal/info-modal';
import { ModalConfirmacion } from '../../../shared/modals/modal-confirmacion/modal-confirmacion';

@Injectable({
  providedIn: 'root',
})
export class Utilidades {
  
  private modalService = inject(NgbModal);


  public abrirModalInfo = (
    title: string,
    information: string,
    buttonText: string
  ) => {
    const modalRef = this.modalService.open(InfoModal, {
      centered: true,
      backdrop: 'static'
    });

    modalRef.componentInstance.title = title;
    modalRef.componentInstance.information = information;
    modalRef.componentInstance.buttonText = buttonText;
  }
  
  public abrirModalConfirmacion = async (
    title: string,
    information: string,
    buttonText: string,
    buttonCancel: string
  ): Promise<boolean> => {
    const modalRef = this.modalService.open(ModalConfirmacion, {
      centered: true,
      backdrop: 'static'
    });

    modalRef.componentInstance.title = title;
    modalRef.componentInstance.information = information;
    modalRef.componentInstance.buttonText = buttonText;
    modalRef.componentInstance.buttonCancel = buttonCancel;

    const result = await modalRef.result;
    return result
  }
}
