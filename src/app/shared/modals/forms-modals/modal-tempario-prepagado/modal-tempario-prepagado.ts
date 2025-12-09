import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Utilidades } from '../../../../core/services/utilidades/utilidades';
import { TemparioPrepagadoService } from '../../../../core/services/tempario-prepagado/tempario-prepagado';
import { IPrepagado, temparioPrepagadoEI } from '../../../../core/interfaces/tempario-prepagado/tempario-prepagado.interface';
import { IRespuestaServicio } from '../../../../core/interfaces/general';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-modal-tempario-prepagado',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './modal-tempario-prepagado.html',
  styleUrl: './modal-tempario-prepagado.scss',
})
export class ModalTemparioPrepagado {

  public modalActivo = inject(NgbActiveModal);
  private utilidadesService = inject(Utilidades);
  private tempariosPrepagadoService = inject(TemparioPrepagadoService);

  public cargando: boolean = false;

  @Input() evento: 'EVENTO_ACTUALIZAR' | 'EVENTO_GUARDAR' = 'EVENTO_GUARDAR';
  @Input() datosTempario: IPrepagado = structuredClone(temparioPrepagadoEI);

  public crear = () => {
    this.cargando = true;
    this.tempariosPrepagadoService.crearTemparioPrepagado(this.datosTempario).subscribe({
      next: (respuesta: IRespuestaServicio) => {
        this.cargando = false;
        this.utilidadesService.abrirModalInfo(
          'Información',
          respuesta.resultadoOperacion,
          'Aceptar'
        );
        this.modalActivo.close(respuesta.estatus);
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

  public actualizar = () => {
    if ("creado" in this.datosTempario) {
      delete (this.datosTempario as any).creado;
    }
    if ("actualizado" in this.datosTempario) {
      delete (this.datosTempario as any).actualizado;
    }
    if ("__v" in this.datosTempario) {
      delete (this.datosTempario as any).__v;
    }
    if ("editado" in this.datosTempario) {
      delete (this.datosTempario as any).editado;
    }
    this.cargando = true;
    this.tempariosPrepagadoService.actualizarTemparioPrepagado(this.datosTempario).subscribe({
      next: (respuesta: IRespuestaServicio) => {
        this.cargando = false;
        this.utilidadesService.abrirModalInfo(
          'Información',
          respuesta.resultadoOperacion,
          'Aceptar'
        );
        this.modalActivo.close(respuesta.estatus);
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
