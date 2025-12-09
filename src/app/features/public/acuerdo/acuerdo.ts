import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import IPaquetes from '../../../core/interfaces/paquetes/paquetes.interface';
import ICliente, { clienteEI } from '../../../core/interfaces/clientes/clientes.interface';
import IVehiculos, { vehiculoEI } from '../../../core/interfaces/vehiculos/vehiculos.interface';
import { ISolicitudAdquisicion, solicitudAdquisicionEI } from '../../../core/interfaces/solicitudes/solicitudes.interface';
import { CommonModule } from '@angular/common';
import SignaturePad from 'signature_pad';
import { SolicitudesService } from '../../../core/services/solicitudes/solicitudes';
import { IRespuestaServicio } from '../../../core/interfaces/general';
import { Utilidades } from '../../../core/services/utilidades/utilidades';
import { HttpErrorResponse } from '@angular/common/http';
import { LoadingScreenComponent } from '../../../shared/components/loading-screen/loading-screen';
import { FirmaSolicitudService } from '../../../core/services/firma-solicitud/firma-solicitud';

@Component({
  selector: 'app-acuerdo',
  imports: [
    CommonModule,
    LoadingScreenComponent
  ],
  templateUrl: './acuerdo.html',
  styleUrl: './acuerdo.scss',
})
export class Acuerdo {

  id!: string;
  cargando = false;

  private solicitudesService = inject(SolicitudesService);
  private utilidadesService = inject(Utilidades);
  private firmaSolicitudService = inject(FirmaSolicitudService);

  public paquetes: IPaquetes[] = [];
  public cliente: ICliente = structuredClone(clienteEI);
  public vehiculo: IVehiculos = structuredClone(vehiculoEI);
  public solicitud: ISolicitudAdquisicion = structuredClone(solicitudAdquisicionEI);
  public datosFirma: any = {};
  public datosFirmaConsultados: any = {};

  @ViewChild('firmaCanvas') firmaCanvas!: ElementRef<HTMLCanvasElement>;
  signaturePad!: SignaturePad;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    if (this.id) {
      this.consultarPorId(this.id);
      this.consultaFirma(this.id);
    }
  }

  get rutinas(): any[] {
    if (!this.solicitud?.paquetes) return [];
    const result: any[] = [];
    for (const paquete of this.solicitud.paquetes) {
      if (Array.isArray(paquete.detallesServicios)) {
        for (const detalle of paquete.detallesServicios) {
          result.push(detalle);
        }
      }
    }
    console.log(result);
    return result;
  }


  get fechaActivacion(): string {
    if (!this.solicitud?.resumenEstados) return 'Aún no activo.';
    const activo = this.solicitud.resumenEstados.find((i: any) => {
      // Ajusta la comparación si tu enum/constante está en otro path o nombre
      return i?.estado === (window as any).TIPO_ESTADO_SOLICITUDES?.ACTIVO || i?.estado === 'ACTIVO';
    });


    if (activo?.fecha) {
      try {
        const d = new Date(activo.fecha);
        if (!isNaN(d.getTime())) {
          return d.toLocaleDateString('es-CO');
        }
      } catch (e) { }
      return String(activo.fecha);
    }


    return 'Aún no activo.';
  }


  get vigenciaKilometraje(): number {
    let kilometraje = 0;
    if (this.solicitud.paquetes && this.solicitud.paquetes.length > 0) {
      this.solicitud.paquetes.map((i) => {
        i.detallesServicios.map((j) => {
          kilometraje = j.vigencia.kilometraje;
        })
      })
    }

    return kilometraje
  }

  ngAfterViewInit() {
    if (!this.datosFirmaConsultados?.firmas?.cliente) {

      this.resizeCanvas();

      this.signaturePad = new SignaturePad(this.firmaCanvas.nativeElement, {
        penColor: 'black',
        backgroundColor: 'rgba(34,36,38,.15)'
      });
    }
  }

  private resizeCanvas() {
    const canvas = this.firmaCanvas.nativeElement;
    const ratio = window.devicePixelRatio || 1;

    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * ratio;
    canvas.height = rect.height * ratio;

    const ctx = canvas.getContext('2d');
    ctx?.scale(ratio, ratio);
  }

  async consultarPorId(id: string) {
    this.cargando = true;
    this.solicitudesService.consultaSolicitudId({id}).subscribe({
      next: (respuesta: IRespuestaServicio) => {
        this.cargando = false;
        if (respuesta.estatus) {
          this.paquetes = respuesta.data.datosPaquetes;
          this.solicitud = respuesta.data.datosSolicitud;
          this.cliente = respuesta.data.datosCliente;
          this.vehiculo = respuesta.data.datosVehiculo;
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
    });
  }

  async consultaFirma(id: string) {
    this.firmaSolicitudService.consultaFirma({idSolicitud: id}).subscribe({
      next: (respuesta: IRespuestaServicio) => {
        if (respuesta.estatus) {
          this.datosFirmaConsultados = respuesta.data.firma;
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

  firmaTerminada() {
    const dataUrl = this.signaturePad.toDataURL();

    this.datosFirma = {
      solicitud: this.id,
      creado: new Date(),
      firmas: {
        cliente: dataUrl,
        concesionario: ''
      }
    };
  }

  limpiarFirma() {
    this.signaturePad.clear();
  }

  async guardarFirma() {
    this.cargando = true;
    this.firmaTerminada();
    this.firmaSolicitudService.crearActualizarFirma(this.datosFirma).subscribe({
      next: (respuesta: IRespuestaServicio) => {
        this.cargando = false;
        if (respuesta.estatus) {
          this.consultaFirma(this.solicitud._id ?? '');
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
