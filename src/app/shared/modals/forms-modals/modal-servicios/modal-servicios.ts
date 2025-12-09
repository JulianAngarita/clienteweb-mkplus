import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PaquetesService } from '../../../../core/services/paquetes/paquetes';
import { Utilidades } from '../../../../core/services/utilidades/utilidades';
import { ServiciosServicios } from '../../../../core/services/servicios/servicios';
import IServicio, { servicioEI } from '../../../../core/interfaces/servicios/servicios.interface';
import { FormsModule } from '@angular/forms';
import { IRespuestaServicio } from '../../../../core/interfaces/general';
import { HttpErrorResponse } from '@angular/common/http';
import { operacionesListado } from '../../../../core/enum/tipo-operaciones-listado/tipo-operaciones-listado';

@Component({
  selector: 'app-modal-servicios',
  imports: [
    FormsModule
  ],
  templateUrl: './modal-servicios.html',
  styleUrl: './modal-servicios.scss',
})
export class ModalServicios {
  public modalActivo = inject(NgbActiveModal);
  private serviciosService = inject(ServiciosServicios);
  private utilidadesService = inject(Utilidades);

  @Input() evento: 'EVENTO_ACTUALIZAR' | 'EVENTO_GUARDAR' = 'EVENTO_GUARDAR';
  public servicio: IServicio = structuredClone(servicioEI);
  public cargando: boolean = false;
  versionTemporal: string = '';
  public tipoOperacionesOpciones = operacionesListado

  agregarVersion() {
    if (!this.versionTemporal.trim()) return;
    this.servicio.modelo.version.push(this.versionTemporal.trim());
    this.versionTemporal = '';
  }

  eliminarVersion(index: number) {
    this.servicio.modelo.version.splice(index, 1);
  }

  public crear = () => {
    this.cargando = true;
    this.serviciosService.crearServicio(this.servicio).subscribe({
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
