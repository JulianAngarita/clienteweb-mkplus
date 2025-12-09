import { Component, inject } from '@angular/core';
import { LoadingScreenComponent } from '../../../shared/components/loading-screen/loading-screen';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ServiciosServicios } from '../../../core/services/servicios/servicios';
import { ActivatedRoute } from '@angular/router';
import { Utilidades } from '../../../core/services/utilidades/utilidades';
import IServicio, { servicioEI } from '../../../core/interfaces/servicios/servicios.interface';
import { IRespuestaServicio } from '../../../core/interfaces/general';
import { HttpErrorResponse } from '@angular/common/http';
import { operacionesListado } from '../../../core/enum/tipo-operaciones-listado/tipo-operaciones-listado';
import { CommonModule } from '@angular/common';
import IOperaciones from '../../../core/interfaces/operaciones/operaciones.interface';
import { ModalAnadirOperacion } from '../../../shared/modals/forms-modals/modal-anadir-operacion/modal-anadir-operacion';

@Component({
  selector: 'app-detalles-servicio',
  imports: [
    LoadingScreenComponent,
    NgbModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './detalles-servicio.html',
  styleUrl: './detalles-servicio.scss',
})

export class DetallesServicio {
  private servicioServicios = inject(ServiciosServicios);
  private rutaActiva = inject(ActivatedRoute);
  private utilidadesService = inject(Utilidades);
  private modalService = inject(NgbModal);
  public cargando: boolean = false;

  public servicio: IServicio = structuredClone(servicioEI);
  public operaciones: IOperaciones[] = [];
  public idServicio: string = '';
  public versionTemp: string = "";
  public tipoOperacionesOpciones = operacionesListado;

  constructor() {
    this.idServicio = this.rutaActiva.snapshot.paramMap.get('id') ?? '';
    this.consultaId()
  }

  eliminarOperacion(index: number) {
    const removerOperacion = this.operaciones[index];

    this.servicio.operaciones = this.servicio.operaciones
      .filter((operacion: string) => operacion !== removerOperacion._id);

    this.servicio.detalleOperaciones = this.servicio.detalleOperaciones
      .filter((operacion: IOperaciones) => operacion._id !== removerOperacion._id);

    this.actualizarServicio();
  }

  public consultaId = () => {
    this.cargando = true;
    this.servicioServicios.consultarServicioId({id: this.idServicio}).subscribe({
      next: (respuesta: IRespuestaServicio) => {
        this.cargando = false;
        if (respuesta.estatus) {
          this.servicio = respuesta.data;
          this.operaciones = respuesta.data.detalleOperaciones;
        } else {
          this.utilidadesService.abrirModalInfo(
            'Información',
            respuesta.resultadoOperacion,
            'Aceptar'
          );
        }
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

  public agregarOperacion = async () => {
    const instancia = this.modalService.open(ModalAnadirOperacion, {
      centered: true,
      size: 'xl'
    })

    instancia.componentInstance.datosServicio = this.servicio;

    const result = await instancia.result;
    if (result) {
      this.consultaId();
    }
  }

  public actualizarServicio =  () => {
    this.cargando = true;
    this.servicioServicios.actualizarServicios(this.servicio).subscribe({
      next: (respuesta: IRespuestaServicio) => {
        this.cargando = false;
        this.utilidadesService.abrirModalInfo(
          'Información',
          respuesta.resultadoOperacion,
          'Aceptar'          
        )
        if (respuesta.estatus) this.consultaId();
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

  agregarVersion() {
    if (!this.versionTemp) return;
    this.servicio.modelo.version.push(this.versionTemp);
    this.versionTemp = "";
  }

  eliminarVersion(i: number) {
    this.servicio.modelo.version.splice(i, 1);
  }

  volver() {
    history.back();
  }

}
