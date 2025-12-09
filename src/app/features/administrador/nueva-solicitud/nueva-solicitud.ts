import { Component, inject } from '@angular/core';
import { tipoIdentificacionOpciones } from '../../../core/enum/tipo-identificacion/tipo-identificacion';
import { filtroSolicitudEI, ISolicitudAdquisicion, ISoportes, solicitudAdquisicionEI } from '../../../core/interfaces/solicitudes/solicitudes.interface';
import { FormsModule } from '@angular/forms';
import { SolicitudesService } from '../../../core/services/solicitudes/solicitudes';
import { IRespuestaServicio } from '../../../core/interfaces/general';
import { HttpErrorResponse } from '@angular/common/http';
import { Utilidades } from '../../../core/services/utilidades/utilidades';
import { LoadingScreenComponent } from '../../../shared/components/loading-screen/loading-screen';
import ICliente, { clienteEI } from '../../../core/interfaces/clientes/clientes.interface';
import IPaquetes from '../../../core/interfaces/paquetes/paquetes.interface';
import IVehiculos, { IvehiculoSocase, vehiculoEI } from '../../../core/interfaces/vehiculos/vehiculos.interface';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { ModalCliente } from '../../../shared/modals/forms-modals/modal-cliente/modal-cliente';
import { ModalVehiculo } from '../../../shared/modals/forms-modals/modal-vehiculo/modal-vehiculo';
import { VehiculoService } from '../../../core/services/vehiculo/vehiculo';
import { ModalResultadoVines } from '../../../shared/modals/modal-resultado-vines/modal-resultado-vines';
import { ModalAnadirPaquetes } from '../../../shared/modals/forms-modals/modal-anadir-paquetes/modal-anadir-paquetes';
import { ModalDetallesPaquete } from '../../../shared/modals/modal-detalles-paquete/modal-detalles-paquete';
import { ModalAnadirSoporte } from '../../../shared/modals/forms-modals/modal-anadir-soporte/modal-anadir-soporte';
import { TIPO_ESTADO_SOLICITUDES } from '../../../core/enum/tipo-estado-paquete/tipo-estado-paquete';
import IServicio from '../../../core/interfaces/servicios/servicios.interface';
import { ModalDetallesServicioRedencion } from '../../../shared/modals/modal-detalles-servicio-redencion/modal-detalles-servicio-redencion';
import { ModalAcuerdosPrepagados } from '../../../shared/modals/modal-acuerdos-prepagados/modal-acuerdos-prepagados';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-nueva-solicitud',
  imports: [
    FormsModule,
    LoadingScreenComponent,
    NgbModule,
    CommonModule
  ],
  templateUrl: './nueva-solicitud.html',
  styleUrl: './nueva-solicitud.scss',
})
export class NuevaSolicitud {

  private solicitudesService = inject(SolicitudesService);
  private utilidadesService = inject(Utilidades);
  private modalService = inject(NgbModal);
  private vehiculoService = inject(VehiculoService);
  private rutaActiva = inject(ActivatedRoute);

  public cargando: boolean = false;
  public identificacionOpciones = tipoIdentificacionOpciones;
  public filtroSolicitud = structuredClone(filtroSolicitudEI);
  public idSolicitud: string = '';
  public VINBusqueda: string = '';

  public datosCliente: ICliente = structuredClone(clienteEI);
  public datosPaquetes: IPaquetes[] = [];
  public datosSolicitud: ISolicitudAdquisicion = structuredClone(solicitudAdquisicionEI);
  public datosVehiculo: IVehiculos = structuredClone(vehiculoEI);

  public consultaActiva: boolean = true;

  constructor() {
    const idSolicitud = this.rutaActiva.snapshot.paramMap.get('id');
    if (idSolicitud && idSolicitud !== 'id') {
      this.idSolicitud = idSolicitud;
      this.consultarSolicitudId();
    }
  }

  public verServicioRedencion = async (servicio: IServicio) => {
    const instancia = this.modalService.open(ModalDetallesServicioRedencion, {
      centered: true,
      size: 'xl'
    });

    if (!servicio.redencion.estatus) {
      instancia.componentInstance.evento = 'redimir';
    }
    instancia.componentInstance.servicio = servicio;
    instancia.componentInstance.idSolicitud = this.datosSolicitud._id ?? '';

    const result = await instancia.result;
    if (result) {
      this.consultarSolicitudId();
    }
  }

  public buscarSolicitud = () => {
    this.cargando = true;
    this.solicitudesService.consultaSolicitudes(this.filtroSolicitud).subscribe({
      next: (respuesta: IRespuestaServicio) => {
        this.cargando = false;
        if (respuesta.estatus) {
          this.idSolicitud = respuesta.data.idSolicitud;
          this.utilidadesService.abrirModalConfirmacion(
            'Retormar solicitud',
            respuesta.resultadoOperacion,
            'Retomar solicitud',
            'Cancelar'
          ).then((result) => {
            if (result) this.consultarSolicitudId();
          })
        } else {
          this.utilidadesService.abrirModalConfirmacion(
            'Información',
            respuesta.resultadoOperacion,
            'Crear cliente',
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

  public editarCliente = async () => {
    const instancia = this.modalService.open(ModalCliente, {
      centered: true,
      size: 'xl'
    });

    instancia.componentInstance.datosCliente = this.datosCliente;

    const result = await instancia.result;
    if (result) {
      this.consultarSolicitudId();
    }
  }

  public consultarSolicitudId = () => {
    this.cargando = true;
    this.solicitudesService.consultaSolicitudId({id: this.idSolicitud}).subscribe({
      next: (respuesta: IRespuestaServicio) => {
        this.cargando = false;
        if (respuesta.estatus) {
          this.consultaActiva = false;
          this.datosCliente = respuesta.data.datosCliente;
          this.datosPaquetes = respuesta.data.datosPaquetes;
          this.datosSolicitud = respuesta.data.datosSolicitud;
          this.datosVehiculo = respuesta.data.datosVehiculo;
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
        this.consultarSolicitudId();
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

  verSoporte = (soporte: ISoportes) => {
    const url = soporte.url;
    window.open(url, '_blank', 'noopener');
  };
  
  revisarSoporte = (index: number) => {
    const soporte = this.datosSolicitud.soportes[index];
    this.datosSolicitud.soportes[index].revisado = !soporte.revisado;
    this.actualizarSolicitud();
  }

  modalSeleccionVin = async ( vines: Array<IvehiculoSocase> ) => {
      const instancia = this.modalService.open( ModalResultadoVines, {
        size: 'xl'
      });
      instancia.componentInstance.vines = vines;

      try {
          const data: IvehiculoSocase = await instancia.result;
          const vehiculo: IVehiculos = {
            vin: data.vin_completo,
            version: data.cod_version,
            descripcionVersion: data.des_version,
            modelo: {
              codigo: data.cod_modelo_pos,
              nombre: data.des_modelo_imp,
              origen: data.des_pais_origen,
              color: data.des_color,
              anoModelo: `${data.des_ano_modelo}`
            },
            placa: data.des_placa
          }
          this.crearVehiculo(vehiculo);
      } catch (error) {
        
      }
  }

  consultaVehiculo = () => {
    this.cargando = true;
    this.vehiculoService.validarVehiculoVIN( this.VINBusqueda  )
    .subscribe({
      next: ( respuesta: IRespuestaServicio ) => {
        if ( respuesta.estatus ) {
          this.modalSeleccionVin(respuesta.data.vehiculos);
        }
        this.cargando = false;
      },
      error: ( error: HttpErrorResponse ) => {
        this.cargando = false;
        this.utilidadesService.abrirModalInfo(
          'Consulta datos del vehículo',
          error.error.resultadoOperacion,
          'Entendido'
        )
      }
    })
  }

  public editarVehiculo = async () => {
    const instancia = this.modalService.open(ModalVehiculo, {
      centered: true,
      size: 'xl'
    });

    instancia.componentInstance.vehiculo = this.datosVehiculo;
    instancia.componentInstance.evento = 'EVENTO_ACTUALIZAR';

    const result = await instancia.result;
    if (result) {
      this.consultarSolicitudId();
    }
  }

  public anadirVehiculo = async () => {
    const instancia = this.modalService.open(ModalVehiculo, {
      centered: true,
      size: 'xl'
    });

    instancia.componentInstance.evento = 'EVENTO_GUARDAR';

    const result = await instancia.result;
    if (result) {
      this.datosSolicitud.vehiculo = result;
      this.actualizarSolicitud();
    }
  }

  crearVehiculo(vehiculo: IVehiculos) {
    this.cargando = true;
    this.vehiculoService.crearVehiculo(vehiculo).subscribe({
      next: (respuesta: IRespuestaServicio) => {
        this.cargando = false;
        this.utilidadesService.abrirModalInfo(
          'Información',
          respuesta.resultadoOperacion,
          'Aceptar'
        );
        if (respuesta.estatus) {
          this.datosSolicitud.vehiculo = respuesta.data.id;
          this.actualizarSolicitud();
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

  verDetallePaquete = (paquete: IPaquetes) => {
    const instancia = this.modalService.open(ModalDetallesPaquete, {
      centered: true,
      size: 'xl'
    });

    instancia.componentInstance.paquete = paquete;
  }

  agregarPaquetesSolicitud = async () => {
    const instancia = this.modalService.open(ModalAnadirPaquetes, {
      centered: true,
      size: 'xl'
    });

    instancia.componentInstance.datosSolicitud = this.datosSolicitud;
    
    const result = await instancia.result;
    if (result) {
      this.consultarSolicitudId();
    }
  }

  agregarSoporteSolicitud = async () => {
    const instancia = this.modalService.open(ModalAnadirSoporte, {
      centered: true,
      size: 'xl'
    });

    instancia.componentInstance.datosSolicitud = this.datosSolicitud;

    const result = await instancia.result;

    if (result) {
      this.consultarSolicitudId();
    }
  }

  eliminarPaqueteSolicitud = (paquete: IPaquetes) => {
    this.cargando = true;
    this.solicitudesService.eliminarPaqueteSolicitud({
      idPaquete: paquete._id ?? '',
      idSolicitud: this.datosSolicitud._id ?? ''
    }).subscribe({
      next: (respuesta: IRespuestaServicio) => {
        this.cargando = false;
        this.utilidadesService.abrirModalInfo(
          'Información',
          respuesta.resultadoOperacion,
          'Aceptar'
        );
        if (respuesta.estatus) this.consultarSolicitudId();
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

  activarPaquete = (paquete: IPaquetes) => {
    this.utilidadesService.abrirModalConfirmacion(
      `Activar ${paquete.nombre}`,
      'Para la activacion, es necesario que todos los soportes esten revisados',
      'Activar',
      'Cancelar'
    ).then((result) => {
      if (result) {
        this.actualizarEstatusSolicitud();
      }
    })
  }

  actualizarEstatusSolicitud = () => {
    this.cargando = true;
    this.solicitudesService.actualizarEstadoSolicitud({
      id: this.datosSolicitud._id ?? '',
      estado: TIPO_ESTADO_SOLICITUDES.ACTIVO
    }).subscribe({
      next: (respuesta: IRespuestaServicio) => {
        this.cargando = false;
        this.utilidadesService.abrirModalInfo(
          'Información',
          respuesta.resultadoOperacion,
          'Aceptar'
        );
        this.consultarSolicitudId();
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

  enviarAcuerdoWhatsapp = () => {
    const parametros = { _arg: '' }
    parametros._arg = 'http://wa.me/';
    parametros._arg += '57';
    parametros._arg += this.datosCliente.telefonos.celular;
    parametros._arg += '?text=';
    parametros._arg += 'Por favor accede al siguiente link, para firmar el Acuerdo de Mantenimiento Prepagado: ';
    parametros._arg += '%0A%0A';
    parametros._arg += `${environment.frontend}/public/acuerdo/${this.datosSolicitud._id}`;
    parametros._arg += '%0A%0A';
    window.open( parametros._arg )
  }

  verAcuerdo = () => {
    const instancia = this.modalService.open(ModalAcuerdosPrepagados, {
      centered: true,
      size: 'xl'
    });

    instancia.componentInstance.cliente = this.datosCliente;
    instancia.componentInstance.vehiculo = this.datosVehiculo;
    instancia.componentInstance.solicitud = this.datosSolicitud;
  }
}
