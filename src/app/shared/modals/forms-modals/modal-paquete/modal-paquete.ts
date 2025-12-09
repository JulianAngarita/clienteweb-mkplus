import { Component, inject, Input } from '@angular/core';
import IPaquetes, { paqueteEI } from '../../../../core/interfaces/paquetes/paquetes.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { tipoPaquete } from '../../../../core/enum/tipo-paquete/tipo-paquete';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PaquetesService } from '../../../../core/services/paquetes/paquetes';
import { Utilidades } from '../../../../core/services/utilidades/utilidades';
import { IRespuestaServicio } from '../../../../core/interfaces/general';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-modal-paquete',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './modal-paquete.html',
  styleUrl: './modal-paquete.scss',
})
export class ModalPaquete {

  public modalActivo = inject(NgbActiveModal);
  private paquetesService = inject(PaquetesService);
  private utilidadesService = inject(Utilidades);

  public tipoPaqueteOpciones = tipoPaquete;
  @Input() evento: 'EVENTO_ACTUALIZAR' | 'EVENTO_GUARDAR' = 'EVENTO_GUARDAR';
  public paquete: IPaquetes = structuredClone(paqueteEI);
  public cargando: boolean = false;

  public crear = () => {
    this.cargando = true;
    this.paquetesService.crearPaquete(this.paquete).subscribe({
      next: (respuesta: IRespuestaServicio) => {
        this.cargando = false;
        this.utilidadesService.abrirModalInfo(
          'Información',
          respuesta.resultadoOperacion,
          'Aceptar'
        );
        this.modalActivo.close(respuesta.estatus)
      },
      error: (error: HttpErrorResponse) => {
        this.cargando = false;
        this.utilidadesService.abrirModalInfo(
          'Información',
          error.error.resultadoOperacion,
          'Aceptar'
        );
      }
    })
  }
}
