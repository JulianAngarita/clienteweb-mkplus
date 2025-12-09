import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ITempario, temparioEI } from '../../../../core/interfaces/temparios/temparios.interface';
import { TemparioService } from '../../../../core/services/tempario/tempario';
import { Utilidades } from '../../../../core/services/utilidades/utilidades';
import { IRespuestaServicio } from '../../../../core/interfaces/general';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-temparios',
  imports: [
    FormsModule
  ],
  templateUrl: './modal-temparios.html',
  styleUrl: './modal-temparios.scss',
})
export class ModalTemparios {

  private temparioService = inject(TemparioService);
  private utilidadesService = inject(Utilidades);
  public modalActivo = inject(NgbActiveModal);

  @Input() evento: 'EVENTO_ACTUALIZAR' | 'EVENTO_GUARDAR' = 'EVENTO_GUARDAR';

  public cargando: boolean = false;
  public mensaje: boolean = false;
  public datosTempario: ITempario = Object.assign({}, temparioEI);

  public guardarTempario = () => {
    this.temparioService.crearTempario(this.datosTempario).subscribe({
      next: (respuesta: IRespuestaServicio) => {
        if (respuesta.estatus) {
          this.utilidadesService.abrirModalInfo(
            'Información',
            `Tempario ${this.datosTempario.nombre} creado con éxito.`,
            'Aceptar'
          );
        } else {
          this.utilidadesService.abrirModalInfo(
            'Información',
            'No se ha podido crear el tempario.',
            'Aceptar'
          );
        }
        this.cargando = false;
        this.modalActivo.close(true);
      },
      error: (error: HttpErrorResponse) => {
        this.utilidadesService.abrirModalInfo(
          'Información',
          error.error.resultadoOperacion,
          'Aceptar'
        )
        this.cargando = false;
      }
    })
  }

  public actualizarTempario = () => {

    delete this.datosTempario.creado;
    delete this.datosTempario.actualizado;
    if ("__v" in this.datosTempario) {
      delete (this.datosTempario as any).__v;
    }
    if ("editado" in this.datosTempario) {
      delete (this.datosTempario as any).editado;
    }

    this.temparioService.actualizarTempario(this.datosTempario).subscribe({
      next: (respuesta: IRespuestaServicio) => {
        if (respuesta.estatus) {
          this.utilidadesService.abrirModalInfo(
            'Información',
            `Tempario ${this.datosTempario.nombre} actualizado con éxito.`,
            'Aceptar'
          );
        } else {
          this.utilidadesService.abrirModalInfo(
            'Información',
            'No se ha podido actualizar el tempario.',
            'Aceptar'
          );
        }
        this.cargando = false;
        this.modalActivo.close(true);
      },
      error: (error: HttpErrorResponse) => {
        this.utilidadesService.abrirModalInfo(
          'Información',
          error.error.resultadoOperacion,
          'Aceptar'
        )
        this.cargando = false;
      }
    })
  }
}
