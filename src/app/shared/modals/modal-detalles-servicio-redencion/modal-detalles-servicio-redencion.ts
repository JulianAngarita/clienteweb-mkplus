import { Component, inject, Input } from '@angular/core';
import IServicio, { servicioEI } from '../../../core/interfaces/servicios/servicios.interface';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { tipoIdentificacionOpciones } from '../../../core/enum/tipo-identificacion/tipo-identificacion';
import { IRespuestaServicio } from '../../../core/interfaces/general';
import { ConcesionarioService } from '../../../core/services/concesionario/concesionario';
import { HttpErrorResponse } from '@angular/common/http';
import { Utilidades } from '../../../core/services/utilidades/utilidades';
import { SolicitudesService } from '../../../core/services/solicitudes/solicitudes';
import { IRedimirServicio } from '../../../core/interfaces/solicitudes/solicitudes.interface';
import { LoadingScreenComponent } from '../../components/loading-screen/loading-screen';

@Component({
  selector: 'app-modal-detalles-servicio-redencion',
  imports: [
    CommonModule,
    FormsModule,
    LoadingScreenComponent
  ],
  templateUrl: './modal-detalles-servicio-redencion.html',
  styleUrl: './modal-detalles-servicio-redencion.scss',
})
export class ModalDetallesServicioRedencion {

  public concesionarioService = inject(ConcesionarioService);
  public activeModal = inject(NgbActiveModal);
  public utilidadesService = inject(Utilidades);
  private solicitudService = inject(SolicitudesService);
  
  @Input() evento: 'informacion' | 'redimir' = 'informacion';
  @Input() servicio: IServicio = structuredClone(servicioEI);
  @Input() idSolicitud: string = '';
  @Input() idServicio: string = '';

  public listaConcesionarios: Array<any> = [];
  public cargando: boolean = false;
  public listaGrupos: Array<any> = [];
  public concesionariosSeleccionados:any[] = [];
  public tipoIdentificacionOpciones = tipoIdentificacionOpciones;
  public grupoSeleccionado: string = '';

  ngOnInit() {
    this.consultaConcesiones();
    if (!this.servicio._id) {
      this.consultarServicioARedimir();
    }
  }

  toggleGrupo = () => {
    this.servicio.redencion.concesionario.grupo = this.grupoSeleccionado;
    this.concesionariosSeleccionados = 
    this.listaConcesionarios.filter((c) => this.grupoSeleccionado === c.grupo);
  }

  public consultarServicioARedimir = () => {
    this.cargando = true;
    this.solicitudService.consultaServicioRedimir({
      idServicio: this.idServicio,
      idSolicitud: this.idSolicitud
    }).subscribe({
      next: (respuesta: IRespuestaServicio) => {
        this.cargando = false;
        if (respuesta.estatus) {
          this.servicio = respuesta.data.servicio;
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

  redimirServicio = () => {
    this.cargando = true;
    this.servicio.redencion.concesionario.tarifaManoObra = '';
    delete this.servicio.redencion.estatus;
    const redencion: IRedimirServicio = {
      ...this.servicio.redencion,
      idServicio: this.servicio._id ?? '',
      idSolicitud: this.idSolicitud
    };
    this.solicitudService.redimirServicio(redencion).subscribe({
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

  async consultaConcesiones(): Promise<void> {
    this.concesionarioService.consultarcl().subscribe({
      next: (respuesta: IRespuestaServicio) => {
        if (respuesta.estatus) {
          const concesiones = respuesta.data;
          const prepararLista: any[] = []
          const prepararGrupos: any[] = []
          concesiones.map((i: any) => {
              prepararGrupos.push({
                  key: i.grupo,
                  text: i.grupo,
                  value: i.grupo
              })

              i.concesiones.map((j: any) => {
                prepararLista.push({
                  grupo: i.grupo,
                  key: `${i.grupo} ${j.nombre} ${j.cl}`,
                  text: `${j.nombre} ${j.cl}`,
                  value: j.cl
                })
              })
          });
          this.listaConcesionarios = prepararLista;
          this.listaGrupos = prepararGrupos;
        }
      },
      error: (error: HttpErrorResponse) => {
        this.utilidadesService.abrirModalInfo(
          'Información',
          error.error.resultadoOperacio,
          'Aceptar'
        );
      }
    })
  }

  formatCurrency(value: number) {
    return new Intl.NumberFormat('es-CO', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  }
}
