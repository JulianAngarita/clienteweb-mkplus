import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import IRepuestos, { repuestoEI } from '../../../../core/interfaces/repuestos/repuestos.interface';
import { tipoAireAcondicionadoOpciones } from '../../../../core/enum/tipo-aire-acondicionado/tipo-aire-acondicionado';
import { tipoCombustibleOpciones } from '../../../../core/enum/tipo-combustible/tipo-combustible';
import { tipoTransmisionOpciones } from '../../../../core/enum/tipo-transmision/tipo-transmision';
import { RepuestosService } from '../../../../core/services/repuestos/repuestos';
import { IRespuestaServicio } from '../../../../core/interfaces/general';
import { Utilidades } from '../../../../core/services/utilidades/utilidades';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-modal-repuestos',
  imports: [
    FormsModule
  ],
  templateUrl: './modal-repuestos.html',
  styleUrl: './modal-repuestos.scss',
})
export class ModalRepuestos {
  private repuestosService = inject(RepuestosService);
  private utilidadesService = inject(Utilidades);
  public modalActivo = inject(NgbActiveModal);

  @Input() evento: 'EVENTO_ACTUALIZAR' | 'EVENTO_GUARDAR' = 'EVENTO_GUARDAR';
  @Input() datosRepuestos: IRepuestos = Object.assign({}, repuestoEI);

  public cargando: boolean = false;
  public tipoAireAcondicionado = tipoAireAcondicionadoOpciones;
  public tipoCombustible = tipoCombustibleOpciones;
  public tipoTransmision = tipoTransmisionOpciones;

  public guardar = () => {
    this.cargando = true;
    this.repuestosService.crearRepuesto(this.datosRepuestos).subscribe({
      next: (respuesta: IRespuestaServicio) => {
        if (respuesta.estatus) {
          this.utilidadesService.abrirModalInfo(
            'Información',
            `Repuesto ${this.datosRepuestos.descripcion} creado con éxito.`,
            'Aceptar'
          );
        } else {
          this.utilidadesService.abrirModalInfo(
            'Información',
            respuesta.resultadoOperacion,
            'Aceptar'
          );
        }
        this.cargando = false;
        this.modalActivo.close(true);
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
    this.cargando = true;
    if (this.datosRepuestos.precioAnterior.fecha === null) {
      this.datosRepuestos.precioAnterior.fecha = ""
    }
    delete this.datosRepuestos.creado;
    delete this.datosRepuestos.actualizado;
    if ("__v" in this.datosRepuestos) {
      delete (this.datosRepuestos as any).__v;
    }
    if ("editado" in this.datosRepuestos) {
      delete (this.datosRepuestos as any).editado;
    }
    this.repuestosService.actualizarRepuesto(this.datosRepuestos).subscribe({
      next: (respuesta: IRespuestaServicio) => {
        if (respuesta.estatus) {
          this.utilidadesService.abrirModalInfo(
            'Información',
            `Repuesto ${this.datosRepuestos.descripcion} actualizado con éxito.`,
            'Aceptar'
          );
        } else {
          this.utilidadesService.abrirModalInfo(
            'Información',
            'No se ha podido actualizar el repuesto.',
            'Aceptar'
          );
        }
        this.cargando = false;
        this.modalActivo.close(true);
      }
    })
  }
}
