import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import ICliente, { clienteEI } from '../../../../core/interfaces/clientes/clientes.interface';
import { ClienteService } from '../../../../core/services/cliente/cliente';
import { IRespuestaServicio } from '../../../../core/interfaces/general';
import { Utilidades } from '../../../../core/services/utilidades/utilidades';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-modal-cliente',
  imports: [
    FormsModule
  ],
  templateUrl: './modal-cliente.html',
  styleUrl: './modal-cliente.scss',
})
export class ModalCliente {

  public modalActivo = inject(NgbActiveModal);
  private clientesService = inject(ClienteService);
  private utilidadesService = inject(Utilidades);

  @Input() datosCliente: ICliente = structuredClone(clienteEI);
  public cargando: boolean = false;

  public actualizarCliente = () => {
    if ("creado" in this.datosCliente) {
      delete (this.datosCliente as any).creado;
    }
    if ("actualizado" in this.datosCliente) {
      delete (this.datosCliente as any).actualizado;
    }
    if ("__v" in this.datosCliente) {
      delete (this.datosCliente as any).__v;
    }
    if ("editado" in this.datosCliente) {
      delete (this.datosCliente as any).editado;
    }
    this.cargando = true;
    this.clientesService.actualizarCliente(this.datosCliente).subscribe({
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

  public guardarCliente = () => {
    this.cargando = true;
    this.clientesService.crearCliente(this.datosCliente).subscribe({
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
