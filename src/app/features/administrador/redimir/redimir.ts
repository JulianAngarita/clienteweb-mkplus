import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoadingScreenComponent } from '../../../shared/components/loading-screen/loading-screen';
import { SolicitudesService } from '../../../core/services/solicitudes/solicitudes';
import { IConsultaSolicitudRedencion } from '../../../core/interfaces/solicitudes/solicitudes.interface';
import { IRespuestaServicio } from '../../../core/interfaces/general';
import { HttpErrorResponse } from '@angular/common/http';
import { Utilidades } from '../../../core/services/utilidades/utilidades';
import IServicio, { IServicioPopulado } from '../../../core/interfaces/servicios/servicios.interface';
import { Vehiculos } from '../vehiculos/vehiculos';
import IVehiculos, { vehiculoEI } from '../../../core/interfaces/vehiculos/vehiculos.interface';
import { IServicioRedencion } from '../../../core/interfaces/servicio-redencion/servicio-redencion.interface';
import { CommonModule } from '@angular/common';
import { ModalDetallesServicioRedencion } from '../../../shared/modals/modal-detalles-servicio-redencion/modal-detalles-servicio-redencion';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-redimir',
  imports: [
    FormsModule,
    LoadingScreenComponent,
    CommonModule
  ],
  templateUrl: './redimir.html',
  styleUrl: './redimir.scss',
})
export class Redimir {

  private solicitudesService = inject(SolicitudesService);
  public utilidadesService = inject(Utilidades);
  private modalService = inject(NgbModal);
  public consultaActiva: boolean = true;

  public servicios: IServicioRedencion[] = [];
  public vehiculo: IVehiculos = structuredClone(vehiculoEI);

  public cargando: boolean = false;
  private filtroInicial: IConsultaSolicitudRedencion = {
    kilometraje: '',
    vin: ''
  }

  public filtroRedencion: IConsultaSolicitudRedencion = structuredClone(this.filtroInicial);

  public color(estatus: string): string {
    return estatus === 'Pendiente' ? 'green' : 'blue';
  }

  public verServicioRedencion = async (servicio: IServicioRedencion) => {
    const instancia = this.modalService.open(ModalDetallesServicioRedencion, {
      centered: true,
      size: 'xl'
    });

    if (servicio.redencion_estatus === 'Pendiente') {
      instancia.componentInstance.evento = 'redimir';
    }
    instancia.componentInstance.idServicio = servicio.idServicio ?? '';
    instancia.componentInstance.idSolicitud = servicio._id ?? '';

    const result = await instancia.result;
    if (result) {
      this.buscar();
    }
  }

  public buscar = () => {
    this.cargando = true;
    this.solicitudesService.consultaSolicitudRedencion(this.filtroRedencion).subscribe({
      next:( respuesta: IRespuestaServicio) => {
        this.cargando = false;
        if (respuesta.estatus) {
          this.consultaActiva = false;
          this.servicios = respuesta.data.servicios;
          this.vehiculo = respuesta.data.vehiculo
        }
        this.utilidadesService.abrirModalInfo(
          'Información',
          respuesta.resultadoOperacion,
          'Aceptar'
        );
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
