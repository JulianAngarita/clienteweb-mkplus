import { Component, inject } from '@angular/core';
import { OperacionesService } from '../../../core/services/operaciones/operaciones';
import { Utilidades } from '../../../core/services/utilidades/utilidades';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoadingScreenComponent } from '../../../shared/components/loading-screen/loading-screen';
import IOperaciones, { filtroOperacionesEI } from '../../../core/interfaces/operaciones/operaciones.interface';
import { tipoTransmisionOpciones } from '../../../core/enum/tipo-transmision/tipo-transmision';
import { tipoCombustibleOpciones } from '../../../core/enum/tipo-combustible/tipo-combustible';
import { tipoAireAcondicionadoOpciones } from '../../../core/enum/tipo-aire-acondicionado/tipo-aire-acondicionado';
import { IRespuestaServicio } from '../../../core/interfaces/general';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalOperaciones } from '../../../shared/modals/forms-modals/modal-operaciones/modal-operaciones';

@Component({
  selector: 'app-operaciones',
  imports: [
    FormsModule,
    CommonModule,
    LoadingScreenComponent,
    NgbModule
  ],
  templateUrl: './operaciones.html',
  styleUrl: './operaciones.scss',
})
export class Operaciones {

  private operacionesService = inject(OperacionesService);
  private utilidadesService = inject(Utilidades);
  private modalService = inject(NgbModal);

  public filtroOperaciones = structuredClone(filtroOperacionesEI);

  public cargando: boolean = false;
  public operaciones: IOperaciones[] = [];
  public total: number = 0;
  public pagina: number  = 1;

  public tipoTransmisionOpciones = tipoTransmisionOpciones;
  public tipoCombustibleOpciones = tipoCombustibleOpciones;
  public tipoAireAcondicionadoOpciones = tipoAireAcondicionadoOpciones;

  public editar = async (operacion: IOperaciones) => {
    const instancia = this.modalService.open(ModalOperaciones, {
      centered: true,
      size: 'xl'
    });

    instancia.componentInstance.datosOperacion = operacion;
    instancia.componentInstance.evento = 'EVENTO_ACTUALIZAR';

    const result = await instancia.result;
    if (result) {
      this.consultaOperaciones();
    }
  }

  public crear = async () => {
    const instancia = this.modalService.open(ModalOperaciones, {
      centered: true,
      size: 'xl'
    });

    instancia.componentInstance.evento = 'EVENTO_GUARDAR';

    const result = await instancia.result;
    if (result) {
      this.consultaOperaciones();
    }
  }

  public eliminar = (operacion: IOperaciones) => {
    this.utilidadesService.abrirModalConfirmacion(
      'Eliminar operación',
      `Estas seguro que quieres eliminar la operación ${operacion.nombre}?`,
      'Eliminar',
      'Cancelar'
    ).then((result) => {
      if (result) this.eliminarOperacion(operacion._id ?? '');
    })
  }

  public eliminarOperacion = (id: string) => {
    this.cargando = true;
    this.operacionesService.eliminarOperacion({id}).subscribe({
      next: (respuesta: IRespuestaServicio) => {
        this.cargando = false;
        this.utilidadesService.abrirModalInfo(
          'Información',
          respuesta.resultadoOperacion,
          'Aceptar'
        );
        if (respuesta.estatus) this.consultaOperaciones();
      },
      error: (error: HttpErrorResponse) => {
        this.utilidadesService.abrirModalInfo(
          'Información',
          error.error.resultadoOperacion,
          'Aceptar'
        );
      }
    })
  }

  ngOnInit() {
    this.consultaOperaciones();
  }

  cambiarPagina = ( pagina: number ) => {
    this.filtroOperaciones.salto = (pagina - 1) * this.filtroOperaciones.limite;
    this.consultaOperaciones();
  }

  public consultaOperaciones = () => {
    this.cargando = true;
    this.operacionesService.consultaOperaciones(this.filtroOperaciones).subscribe({
      next: (respuesta: IRespuestaServicio) => {
        this.cargando = false;
        if (respuesta.estatus) {
          this.operaciones = respuesta.data.operaciones;
          this.total = respuesta.data.total;
        } else {
          this.utilidadesService.abrirModalInfo(
            'Información',
            respuesta.resultadoOperacion,
            'Aceptar'
          );
        }
      },
      error: (error: HttpErrorResponse) => {
        this.utilidadesService.abrirModalInfo(
          'Información',
          error.error.resultadoOperacion,
          'Aceptar'
        );
      }
    })
  }

}
