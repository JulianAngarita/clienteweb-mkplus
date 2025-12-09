import { Component, inject, Input } from '@angular/core';
import { concesionEI, IConcesion } from '../../../../core/interfaces/concesiones/concesiones.interface';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConcesionarioService } from '../../../../core/services/concesionario/concesionario';
import { IRespuestaServicio } from '../../../../core/interfaces/general';
import { HttpErrorResponse } from '@angular/common/http';
import { Utilidades } from '../../../../core/services/utilidades/utilidades';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { tipoCallePrincipal } from '../../../../core/enum/tipo-direccion/tipo-direccion';

@Component({
  selector: 'app-modal-concesion',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './modal-concesion.html',
  styleUrl: './modal-concesion.scss',
})
export class ModalConcesion {

  public modalActivo = inject(NgbActiveModal);
  private concesionService = inject(ConcesionarioService);
  private utilidadesService = inject(Utilidades);
  public cargando: boolean = false;
  public tipoCallePrincipalOpciones = tipoCallePrincipal;

  @Input() evento: 'EVENTO_ACTUALIZAR' | 'EVENTO_GUARDAR' = 'EVENTO_GUARDAR';
  @Input() datosConcesion: IConcesion = structuredClone(concesionEI);


  public guardar = () => {
    this.cargando = true;
    this.concesionService.crearConcesionario(this.datosConcesion).subscribe({
      next: (respuesta: IRespuestaServicio) => {
        this.cargando = false;
        this.utilidadesService.abrirModalInfo(
          'Información',
          respuesta.resultadoOperacion,
          'Aceptar'
        );
        if (respuesta.estatus) this.modalActivo.close(true);
      },
      error: (error: HttpErrorResponse) => {
        this.cargando = false;
        this.utilidadesService.abrirModalInfo(
          'Información',
          error.error.resultadoOperacion,
          'Aceptar'
        )
      }
    })
  }

  public actualizar = () => {
    if ("creado" in this.datosConcesion) {
      delete (this.datosConcesion as any).creado;
    }
    if ("actualizado" in this.datosConcesion) {
      delete (this.datosConcesion as any).actualizado;
    }
    if ("__v" in this.datosConcesion) {
      delete (this.datosConcesion as any).__v;
    }
    if ("editado" in this.datosConcesion) {
      delete (this.datosConcesion as any).editado;
    }
    this.cargando = true;
    this.concesionService.actualizarConcesionario(this.datosConcesion).subscribe({
      next: (respuesta: IRespuestaServicio) => {
        this.cargando = false;
        this.utilidadesService.abrirModalInfo(
          'Información',
          respuesta.resultadoOperacion,
          'Aceptar'
        );
        if (respuesta.estatus) this.modalActivo.close(true);
      },
      error: (error: HttpErrorResponse) => {
        this.cargando = false;
        this.utilidadesService.abrirModalInfo(
          'Información',
          error.error.resultadoOperacion,
          'Aceptar'
        )
      }
    })
  }
}
