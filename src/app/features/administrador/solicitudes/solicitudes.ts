import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { filtroSolicitudesListaEI, IConsultaSolicitudesLista, ISolicitudAdquisicion } from '../../../core/interfaces/solicitudes/solicitudes.interface';
import { estadoSolicitudesListaOpciones } from '../../../core/enum/tipo-estado-paquete/tipo-estado-paquete';
import { SolicitudesService } from '../../../core/services/solicitudes/solicitudes';
import { IRespuestaServicio } from '../../../core/interfaces/general';
import { HttpErrorResponse } from '@angular/common/http';
import { Utilidades } from '../../../core/services/utilidades/utilidades';
import { LoadingScreenComponent } from '../../../shared/components/loading-screen/loading-screen';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-solicitudes',
  imports: [
    FormsModule,
    CommonModule,
    NgbModule,
    LoadingScreenComponent,
    RouterModule
  ],
  templateUrl: './solicitudes.html',
  styleUrl: './solicitudes.scss',
})
export class Solicitudes {

  private solicitudesService = inject(SolicitudesService);
  private utilidadesService = inject(Utilidades);

  public pagina: number = 1;
  public total: number = 0;
  public cargando: boolean = false;

  public filtroSolicitudes: IConsultaSolicitudesLista = structuredClone(filtroSolicitudesListaEI);
  public solicitudes: ISolicitudAdquisicion[] = [];
  public usuario = localStorage.getItem('usuario');
  public rol = '';
  public opcionesConcesiones: any[] = [];
  public estadoSolicitudesListaOpciones = estadoSolicitudesListaOpciones;

  constructor() {
    const datosUsuario = JSON.parse(this.usuario ?? '');
    let opcionesConcesiones: any[] = [];
    if(datosUsuario){
        this.rol = datosUsuario.rol;
        datosUsuario.concesiones.map((i: any) => {
          return opcionesConcesiones.push({
            value: i,
            text: i,
            key: i
          })
        })
        this.opcionesConcesiones = opcionesConcesiones;
    } 

    this.consulta();
  }

  cambiarPagina = ( pagina: number ) => {
    this.filtroSolicitudes.salto = (pagina - 1) * this.filtroSolicitudes.limite;
    this.consulta();
  }

  public consulta = () => {
    this.cargando = true;
    this.solicitudesService.consultaListaSolicitudes(this.filtroSolicitudes).subscribe({
      next: (respuesta: IRespuestaServicio) => {
        this.cargando = false;
        if (respuesta.estatus) {
          this.solicitudes = respuesta.data.solicitudes;
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
        this.cargando = false;
        this.utilidadesService.abrirModalInfo(
          'Información',
          error.error.resultadoOperacion,
          'Aceptar'
        );
      }
    })
  }

  public eliminar = (item: ISolicitudAdquisicion) => {
    this.utilidadesService.abrirModalConfirmacion(
      'Eliminar solicitud',
      `Estas seguro que quieres eliminar la solicitud ${item.solicitud.numero}`,
      'Eliminar',
      'Cancelar'
    ).then((result) => {
      if (result) {
        this.eliminarSolicitud(item._id ?? '')
      }
    })
  }

  public eliminarSolicitud = (id: string) => {
    this.cargando = true;
    this.solicitudesService.eliminarSolicitud({id}).subscribe({
      next: (respuesta: IRespuestaServicio) => {
        this.cargando = false;
        if (respuesta.estatus) {
          this.consulta();
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
}
