import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { filtroConcesionaros, IConcesion, IConsultarConcesionarios } from '../../../core/interfaces/concesiones/concesiones.interface';
import { ConcesionarioService } from '../../../core/services/concesionario/concesionario';
import { IRespuestaServicio } from '../../../core/interfaces/general';
import { Utilidades } from '../../../core/services/utilidades/utilidades';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ModalConcesion } from '../../../shared/modals/forms-modals/modal-concesion/modal-concesion';
import { LoadingScreenComponent } from '../../../shared/components/loading-screen/loading-screen';

@Component({
  selector: 'app-concesiones',
  imports: [
    FormsModule,
    CommonModule,
    LoadingScreenComponent,
    NgbModule
  ],
  templateUrl: './concesiones.html',
  styleUrl: './concesiones.scss',
})
export class Concesiones {

  private concesionService = inject(ConcesionarioService);
  private utilidadesService = inject(Utilidades);
  private modalService = inject(NgbModal);

  public total: number  = 0;
  public pagina: number = 1;
  public cargando: boolean = false;
  public concesiones: IConcesion[] = [];
  public filtroConcesion: IConsultarConcesionarios = structuredClone(filtroConcesionaros);

  ngOnInit() {
    this.consultar();
  }

  cambiarPagina = ( pagina: number ) => {
    this.filtroConcesion.salto = (pagina - 1) * this.filtroConcesion.limite;
    this.consultar();
  }

  public consultar = () => {
    this.cargando = true;
    this.concesionService.consultarConcesionarios(this.filtroConcesion).subscribe({
      next: (respuesta: IRespuestaServicio) => {
        this.cargando = false;
        if (respuesta.estatus) {
          this.concesiones = respuesta.data.concesiones;
          this.total = respuesta.data.total
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

  public actualizar = async (concesion: IConcesion): Promise<void> => {
    const instancia = this.modalService.open(ModalConcesion, {
      centered: true,
      size: 'xxl'
    });

    instancia.componentInstance.evento = 'EVENTO_ACTUALIZAR';
    instancia.componentInstance.datosConcesion = concesion;

    const result = await instancia.result;
    if (result) {
      this.consultar();
    }
  }

  public crear = async () => {
    const instancia = this.modalService.open(ModalConcesion, {
      centered: true,
      size: 'xxl'
    });

    instancia.componentInstance.evento = 'EVENTO_GUARDAR';

    const result = await instancia.result;
    if (result) {
      this.consultar();
    }
  }

  public eliminarConcesion = (concesion: IConcesion) => {
    this.utilidadesService.abrirModalConfirmacion(
      'Eliminar concesion',
      `Estas seguro que quieres eliminar la concesion ${concesion.grupo} ${concesion.nombre} ${concesion.cl}`,
      'Eliminar',
      'Cancelar'
    ).then((result) => {
      if (result) {
        this.eliminar(concesion._id ?? '')
      }
    })
  }

  public eliminar = (id: string) => {
    this.cargando = true;
    this.concesionService.eliminarConcesionario({id}).subscribe({
      next: (respuesta: IRespuestaServicio) => {
        this.cargando = false;
        this.utilidadesService.abrirModalInfo(
          'Información',
          respuesta.resultadoOperacion,
          'Aceptar'
        );
        if (respuesta.estatus) this.consultar();
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
