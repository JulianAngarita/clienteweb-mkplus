import { Component, inject, Input } from '@angular/core';
import { LoadingScreenComponent } from '../../../components/loading-screen/loading-screen';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import IPaquetes, { filtroPaquetesEI, IConsultaPaquetes } from '../../../../core/interfaces/paquetes/paquetes.interface';
import { PaquetesService } from '../../../../core/services/paquetes/paquetes';
import { IRespuestaServicio } from '../../../../core/interfaces/general';
import { Utilidades } from '../../../../core/services/utilidades/utilidades';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ISolicitudAdquisicion, solicitudAdquisicionEI } from '../../../../core/interfaces/solicitudes/solicitudes.interface';
import { SolicitudesService } from '../../../../core/services/solicitudes/solicitudes';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-modal-anadir-paquetes',
  imports: [
    LoadingScreenComponent,
    FormsModule,
    CommonModule,
    NgbModule
  ],
  templateUrl: './modal-anadir-paquetes.html',
  styleUrl: './modal-anadir-paquetes.scss',
})
export class ModalAnadirPaquetes {

  private paquetesService = inject(PaquetesService);
  private utilidadesService = inject(Utilidades);
  public activeModal = inject(NgbActiveModal);
  private solicitudesService = inject(SolicitudesService);

  @Input() datosSolicitud: ISolicitudAdquisicion = structuredClone(solicitudAdquisicionEI);
  
  public paquetes: IPaquetes[] = [];
  public total: number = 0;
  public pagina: number = 0;
  public cargando: boolean = false;
  public filtro: IConsultaPaquetes = structuredClone(filtroPaquetesEI);

  public consulta = () => {
    this.filtro.limite = 10;
    this.cargando = true;
    this.paquetesService.consultarPaquete(this.filtro).subscribe({
      next: (respuesta: IRespuestaServicio) => {
        this.cargando = false;
        if (respuesta.estatus) {
          this.paquetes = respuesta.data.paquetes;
          this.total = respuesta.data.total;
        } else {
          this.utilidadesService.abrirModalInfo(
            'Información',
            respuesta.resultadoOperacion,
            'Aceptar'
          );
        }
      }
    })
  }

  public actualizarSolicitud = () => {
    this.cargando = true;
    this.solicitudesService.actualizarSolicitud(this.datosSolicitud).subscribe({
      next: (respuesta: IRespuestaServicio) => {
        this.cargando = false;
        this.utilidadesService.abrirModalInfo(
          'Información',
          respuesta.resultadoOperacion,
          'Aceptar'
        );
        if (respuesta.estatus) this.activeModal.close(true);
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

  agregarPaquete = (paquete: IPaquetes) => {
    let paquetes = this.datosSolicitud.paquetesId;
    paquetes.push(paquete._id ?? '');
    this.datosSolicitud.paquetesId = paquetes;

    this.actualizarSolicitud();
  }



  cambiarPagina = ( pagina: number ) => {
    this.filtro.salto = (pagina - 1) * this.filtro.limite;
    this.consulta();
  }
}
