import { Component, inject } from '@angular/core';
import { LoadingScreenComponent } from '../../../shared/components/loading-screen/loading-screen';
import { Utilidades } from '../../../core/services/utilidades/utilidades';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TerminoCondicionesService } from '../../../core/services/termino-condiciones/termino-condiciones';
import { consultarTerminosEI, IConsultarTerminos, ITerminosCondiciones } from '../../../core/interfaces/terminos-condiciones/terminos-condiciones.interface';
import { IRespuestaServicio } from '../../../core/interfaces/general';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalTerminosCondiciones } from '../../../shared/modals/forms-modals/modal-terminos-condiciones/modal-terminos-condiciones';

@Component({
  selector: 'app-terminos-condiciones',
  imports: [
    LoadingScreenComponent,
  ],
  templateUrl: './terminos-condiciones.html',
  styleUrl: './terminos-condiciones.scss',
})
export class TerminosCondiciones {

  private utilidadesService = inject(Utilidades);
  private modalService = inject(NgbModal);
  private terminosCondicionesService = inject(TerminoCondicionesService);

  public cargando: boolean = false;
  public terminos: ITerminosCondiciones[] = [];

  public filtro: IConsultarTerminos = Object.assign({}, consultarTerminosEI);

  ngOnInit() {
    this.consultar();
  }

  public modificarFiltroActivo = () => {
    this.filtro.activo = !this.filtro.activo;
    this.consultar();
  }

  public crear = async (): Promise<void> => {
    const instancia = this.modalService.open(ModalTerminosCondiciones, {
      centered: true,
      size: 'xl'
    });

    instancia.componentInstance.evento = 'EVENTO_GUARDAR';

    const result = await instancia.result;
    if (result) {
      this.consultar();
    }
  }

  public actualizar = async (termino: ITerminosCondiciones) => {
    const instancia = this.modalService.open(ModalTerminosCondiciones, {
      centered: true,
      size: 'xl'
    });

    instancia.componentInstance.evento = 'EVENTO_ACTUALIZAR';
    instancia.componentInstance.datosTerminosCondiciones = termino;

    const result = await instancia.result;
    if (result) {
      this.consultar();
    }
  }

  public eliminarTerminoCondiciones = (termino: ITerminosCondiciones) => {
    this.utilidadesService.abrirModalConfirmacion(
      'Información',
      `Estas seguros que quires eliminar los terminos y condiciones ${termino.titulo}?`,
      'Eliminar',
      'Cancelar' 
    ).then((result) => {
      if (result) {
        this.eliminar(termino._id ?? '');
      }
    })
  }

  public eliminar = (id: string) => {
    this.cargando = true;
    this.terminosCondicionesService.eliminarTerminos({id}).subscribe({
      next: (respuesta: IRespuestaServicio) => {
        this.cargando = false
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

  public consultar = () => {
    this.cargando = true;
    this.terminosCondicionesService.consultarTerminos(this.filtro).subscribe({
      next: (respuesta: IRespuestaServicio) => {
        this.cargando = false;
        if (respuesta.estatus) {
          this.terminos = respuesta.data;
        } else {
          this.utilidadesService.abrirModalInfo(
            'Información',
            respuesta.resultadoOperacion,
            'Aceptar'
          )
        }
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
