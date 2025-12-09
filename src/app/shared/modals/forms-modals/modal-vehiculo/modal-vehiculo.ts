import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import IVehiculos, { vehiculoEI } from '../../../../core/interfaces/vehiculos/vehiculos.interface';
import { VehiculoService } from '../../../../core/services/vehiculo/vehiculo';
import { IRespuestaServicio } from '../../../../core/interfaces/general';
import { Utilidades } from '../../../../core/services/utilidades/utilidades';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-modal-vehiculo',
  imports: [
    FormsModule
  ],
  templateUrl: './modal-vehiculo.html',
  styleUrl: './modal-vehiculo.scss',
})
export class ModalVehiculo {

  public modalActivo = inject(NgbActiveModal);
  private vehiculoService = inject(VehiculoService);
  private utilidadesService = inject(Utilidades);

  @Input() vehiculo: IVehiculos = structuredClone(vehiculoEI);
  @Input() evento: 'EVENTO_GUARDAR' | 'EVENTO_ACTUALIZAR' = 'EVENTO_GUARDAR';
  
  public cargando: boolean = false;

  crearVehiculo() {
    this.cargando = true;
    this.vehiculoService.crearVehiculo(this.vehiculo).subscribe({
      next: (respuesta: IRespuestaServicio) => {
        this.cargando = false;
        this.utilidadesService.abrirModalInfo(
          'Información',
          respuesta.resultadoOperacion,
          'Aceptar'
        );
        if (respuesta.estatus) this.modalActivo.close(respuesta.data.id);
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

  actualizarVehiculo() {
    if ("creado" in this.vehiculo) {
      delete (this.vehiculo as any).creado;
    }
    if ("actualizado" in this.vehiculo) {
      delete (this.vehiculo as any).actualizado;
    }
    if ("__v" in this.vehiculo) {
      delete (this.vehiculo as any).__v;
    }
    if ("editado" in this.vehiculo) {
      delete (this.vehiculo as any).editado;
    }
    this.cargando = true;
    this.vehiculoService.actualizarVehiculo(this.vehiculo).subscribe({
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
        );
      }
    })
  }
}
