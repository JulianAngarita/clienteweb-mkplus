import { CommonModule, DatePipe, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LoadingScreenComponent } from '../../../shared/components/loading-screen/loading-screen';
import ICliente, { clienteEI } from '../../../core/interfaces/clientes/clientes.interface';
import IVehiculos, { vehiculoEI } from '../../../core/interfaces/vehiculos/vehiculos.interface';
import { IServicioPopulado } from '../../../core/interfaces/servicios/servicios.interface';
import { IPreciosPaquetes, IRutinas, preciosPaquetesEI } from '../../../core/interfaces/paquetes/paquetes.interface';
import { CotizadorStoreService, VehiculoSeleccionado } from '../../../core/store/cotizador/cotizador-store';
import { IRespuestaServicio } from '../../../core/interfaces/general';
import { Utilidades } from '../../../core/services/utilidades/utilidades';
import { HttpErrorResponse } from '@angular/common/http';
import { SolicitudesService } from '../../../core/services/solicitudes/solicitudes';
import { versionEI } from '../../../core/interfaces/versiones/versiones.interface';
import { modeloEI } from '../../../core/interfaces/modelos/modelos.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IResumenPedidoPdf } from '../../../core/interfaces/resumen-pedido-pdf/resumen-pedido-pdf.interface';
import { IUsuario } from '../../../core/interfaces/usuarios/usuarios.interface';
import { ModalResumenPedido } from '../../../shared/modals/modal-resumen-pedido/modal-resumen-pedido';
import { EmailService } from '../../../core/services/email/email';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-resumen-pedido',
  standalone: true,
  imports: [
    CommonModule,
    LoadingScreenComponent,
    RouterModule
  ],
  providers: [DatePipe],
  templateUrl: './resumen-pedido.html',
  styleUrl: './resumen-pedido.scss',
})
export class ResumenPedido {
  private location = inject(Location);
  private cotizarStoreService = inject(CotizadorStoreService);
  private utilidades = inject(Utilidades);
  private solicitudesService = inject(SolicitudesService);
  private modalService = inject(NgbModal);
  private emailService = inject(EmailService);
  private datePipe = inject(DatePipe);

  private resumenPedidoPdf: IResumenPedidoPdf = {};
  public vehiculoSeleccionado: VehiculoSeleccionado = {
    modelo: '',
    version: Object.assign({}, versionEI),
    detalleModelo: Object.assign({}, modeloEI),
  };
  public servicios: IServicioPopulado[] = [];
  public rutinas: IRutinas[] = [];
  public valoresPaquete: IPreciosPaquetes = preciosPaquetesEI;
  public cliente: ICliente = clienteEI;
  public vehiculo: IVehiculos = vehiculoEI;
  public cargando: boolean = false;

  public atras = () => {
    this.location.back();
  };

  ngOnInit() {
    this.cliente = this.cotizarStoreService.cliente();
    this.vehiculo = this.cotizarStoreService.vehiculo();
    this.servicios = this.cotizarStoreService.servicios();
    this.valoresPaquete = this.cotizarStoreService.valoresPaquete();
    this.rutinas = this.cotizarStoreService.rutinas();
    this.vehiculoSeleccionado = this.cotizarStoreService.vehiculoSeleccionado();
  }

  public calcularAhorro = ( prepagado:number, ordinario:number ): string => {
    if (prepagado > 0 && ordinario > 0) {
      return ` ${Math.round((1 - prepagado/ordinario) * 10000) /100}%`;
    }
    return ` `
  }

  openModal(action: 'Descargar' | 'Enviar') {
    const modalRef = this.modalService.open(ModalResumenPedido);
    modalRef.componentInstance.action = action;
    modalRef.componentInstance.submitData.subscribe(
      (data: { grupo: string; concesion: string }) => {
        this.obtenerDataResumenPdf(data.grupo, data.concesion);
        if (action === 'Descargar') {
          this.descargarPdfAction();
        } else if (action === 'Enviar') {
          this.enviarEmailPdfAction();
        }
      }
    );
  }

  descargarPdfAction() {
    this.cargando = true;
    this.emailService
      .descargarResumenPedidoPdf(this.resumenPedidoPdf)
      .subscribe((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Resumen Pedido.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        this.cargando = false;
      });
  }

  enviarEmailPdfAction() {
    this.cargando = true;
    this.emailService
      .descargarResumenPedidoPdf(this.resumenPedidoPdf)
      .subscribe(async (res) => {
        try {
          const uint8Array = await this.blobToUint8Array(res);
          const emailCliente = this.cliente ? this.cliente.email : undefined;
          if (typeof emailCliente === 'string') {
            this.emailService.sendEmailWithPdf(uint8Array, emailCliente);
            this.cargando = false;
            this.utilidades.abrirModalInfo(
              'Información',
              'PDF enviado correctamente.',
              'Cerrar'
            );
          } else {
            console.error('El email del cliente no está definido.');
          }
        } catch (error) {
          console.error('Error al convertir Blob a Uint8Array:', error);
        }
      });
  }

  blobToUint8Array(blob: Blob): Promise<Uint8Array> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.error) {
          reject(reader.error);
        } else {
          const result = reader.result;
          if (result instanceof ArrayBuffer) {
            resolve(new Uint8Array(result));
          } else {
            reject(
              new Error(
                'Error al convertir Blob a Uint8Array: result no es ArrayBuffer'
              )
            );
          }
        }
      };
      reader.readAsArrayBuffer(blob);
    });
  }

  public crearSolicitud = () => {
    this.cargando = true;
    this.solicitudesService.crearSolicitud({
      cliente: this.cliente,
      vehiculo: this.vehiculo,
      rutina: this.rutinas,
      servicios: this.servicios,
      valoresPaquete: this.valoresPaquete,
      vehiculoSeleccionado: this.vehiculoSeleccionado,
    }).subscribe({
        next: (respuesta: IRespuestaServicio) => {
          this.utilidades.abrirModalInfo(
            'Información',
            respuesta.resultadoOperacion,
            'Entendido'
          );
          this.cargando = false;
        },
        error: (error: HttpErrorResponse) => {
          this.cargando = false;
          this.utilidades.abrirModalInfo(
            'Información',
          error.error.resultadoOperacion,
          'Entendido'
        );
      },
    });
  };

  obtenerDataResumenPdf(grupo?: string, concesion?: string) {
    const userSesion: IUsuario | any = localStorage.getItem('usuario');
    const usuario = JSON.parse(userSesion);
    let servicio1: any;
    servicio1 = this.servicios.map((srv) => ({
      descripcion: srv.descripcion,
      referencia: '',
      cant: srv.cantidad,
      unidad:
        srv.precios?.prepagado?.valoresFuturos?.reduce(
          (acc: number, valor: any) => acc + (valor.valor - (valor.iva || 0)),
          0
        ) || 0,
      total:
        srv.precios?.prepagado?.valoresFuturos?.reduce(
          (acc: number, valor: any) => acc + (valor.valor - (valor.iva || 0)),
          0
        ) || 0,
      iva:
        srv.precios?.prepagado?.valoresFuturos?.reduce(
          (acc: number, valor: any) => acc + valor.iva,
          0
        ) || 0,
      valor:
        srv.precios?.prepagado?.valoresFuturos?.reduce(
          (acc: number, valor: any) => acc + valor.valor,
          0
        ) || 0,
    }));

    const subTotalTem = servicio1.reduce((acc: any, servicio: any) => {
      return acc + (servicio?.total || 0);
    }, 0);
    let totalTemp = servicio1.reduce(
      (acc: number, servicio: any) => acc + servicio.valor,
      0
    );
    let iva = servicio1.reduce(
      (acc: number, servicio: any) => acc + servicio.iva,
      0
    );
    const totalGeneral = totalTemp;
    const formatCOP = (value: any) => {
      return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
      }).format(value);
    };

    const fechaActual = new Date();
    const fechaFormat = this.datePipe.transform(fechaActual, 'yyyy-MM-dd');

    this.resumenPedidoPdf = {
      fecha: fechaFormat as any,
      vitrinaTaller: concesion,
      usuarioNombreCliente: `${this.cliente.nombre?.nombres} ${this.cliente.nombre?.apellidos}`,
      cedulaCliente: `${this.cliente.identificacion?.numero}`,
      direccion: ` ${this.cliente.direccion?.callePrincipal} ${this.cliente.direccion?.calleSecundaria}-${this.cliente.direccion?.numero} ${this.cliente.direccion?.ciudad} ${this.cliente.direccion?.barrio}`,
      numeroTelefono: this.cliente.telefonos?.celular,
      Linea: this.vehiculo.version ? this.vehiculo.version : 'N/A',
      placaVin: this.vehiculo.placa ? this.vehiculo.placa : this.vehiculo.vin,
      yearModel: this.vehiculo.modelo?.anoModelo
        ? this.vehiculo.modelo?.anoModelo
        : 'N/A',
      kilometraje: localStorage.getItem('kmActual') || '',
      rutinas: servicio1.map((servicio: any) => ({
        descripcion: servicio.descripcion,
        referencia: '',
        cant: servicio.cant,
        unidad: servicio.unidad,
        total: servicio.total,
      })),

      subTotal: subTotalTem,
      iva: iva,
      totalGeneral: totalGeneral,
      concesionario: grupo,
      asesorNombre: `${usuario?.nombre?.nombres} ${usuario?.nombre?.apellidos}`,
      cedulaAsesor: usuario.identificacion.numero,
    };
    return this.resumenPedidoPdf;
  }
}
