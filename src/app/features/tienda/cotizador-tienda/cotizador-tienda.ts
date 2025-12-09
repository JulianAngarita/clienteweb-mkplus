import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ModelosService } from '../../../core/services/modelos/modelos';
import { IRespuestaServicio } from '../../../core/interfaces/general';
import IModelo, { IFrecuenciaKilometraje, IVersiones, kilometrajeEI, modeloEI } from '../../../core/interfaces/modelos/modelos.interface';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IServicioPopulado } from '../../../core/interfaces/servicios/servicios.interface';
import { IPreciosPaquetes, IRutinas, preciosPaquetesEI } from '../../../core/interfaces/paquetes/paquetes.interface';
import { CotizadorStoreService } from '../../../core/store/cotizador/cotizador-store';
import { HttpErrorResponse } from '@angular/common/http';
import { CotizadorService } from '../../../core/services/cotizador/cotizador';
import { LoadingScreenComponent } from '../../../shared/components/loading-screen/loading-screen';
import { Utilidades } from '../../../core/services/utilidades/utilidades';
import { ModalEmail } from '../../../shared/modals/modal-email/modal-email';
import { PDFDocument } from 'pdf-lib';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { EmailService } from '../../../core/services/email/email';

@Component({
  selector: 'app-cotizador-tienda',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbDropdownModule,
    RouterModule,
    LoadingScreenComponent
  ],
  templateUrl: './cotizador-tienda.html',
  styleUrl: './cotizador-tienda.scss',
})
export class CotizadorTienda {
  private router = inject(ActivatedRoute);
  private modeloService = inject(ModelosService);
  private ruta = inject(Router);
  private cotizadorStore = inject(CotizadorStoreService);
  private cotizadorService = inject(CotizadorService);
  private utilidades = inject(Utilidades);
  private modalService = inject(NgbModal);
  private emailService = inject(EmailService);

  // Estado general
  public estado = signal<'form' | 'resultado'>('form');
  public cargando = false;

  // Datos del modelo y selección
  public correo: string = '';
  public servicios: IServicioPopulado[] = [];
  private modelo: string = '';
  public detalleModelo: IModelo = modeloEI;
  public version: IVersiones | any;
  public kilometrajeInicial: number = 5000;
  public kilometrajeFinal: number = 10000;
  public rutinas: IRutinas[] = [];
  public valoresPaquete: IPreciosPaquetes = preciosPaquetesEI;
  public kilometrajes: IFrecuenciaKilometraje[] = [];
  public kilometrajeSeleccionado: IFrecuenciaKilometraje = kilometrajeEI;

  constructor() {
    this.router.queryParamMap.subscribe((queryParams) => {
      this.modelo = queryParams.get('modelo') ?? '';
    });
  }

  ngOnInit() {
    this.consultaModeloPorCodigo();
  }

  consultaModeloPorCodigo = () => {
    this.modeloService.consultaModeloCodigo({ codigo: this.modelo }).subscribe({
      next: (respuesta: IRespuestaServicio) => {
        if (respuesta.estatus) {
          this.detalleModelo = respuesta.data.modelo;
        }
      },
    });
  };

  public calcularAhorro = (prepagado: number, ordinario: number): string => {
    if (prepagado > 0 && ordinario > 0) {
      return ` ${Math.round((1 - prepagado / ordinario) * 10000) / 100}%`;
    }
    return ` `
  }

  seleccionarVersion = (version: IVersiones) => {
    this.version = version;
    const extras: NavigationExtras = {
      replaceUrl: true,
      preserveFragment: true,
      queryParamsHandling: 'merge',
      queryParams: {
        version: version.codigo,
      },
    };
    this.ruta.navigate([], extras);
    this.consultarFrecuenciaSocase(this.version.codigo);
  };

  seleccionarKilometraje = (kilometraje: IFrecuenciaKilometraje) => {
    this.kilometrajeSeleccionado = kilometraje;
    const extras: NavigationExtras = {
      replaceUrl: true,
      preserveFragment: true,
      queryParamsHandling: 'merge',
      queryParams: {
        km: kilometraje.frecKm,
      },
    };
    this.kilometrajeInicial = this.kilometrajeSeleccionado.frecKm;
    this.kilometrajeFinal = this.kilometrajeSeleccionado.frecKm * 2;
    this.ruta.navigate([], extras);
  };

  consultarFrecuenciaSocase = (version: string) => {
    this.cargando = true;
    this.cotizadorService.consultaFrecuenciaSocase(version).subscribe({
      next: (respuesta) => {
        this.cargando = false;
        this.kilometrajes = respuesta.data;
      },
      error: (error: HttpErrorResponse) => {
        this.cargando = false;
      },
    });
  };

  actualizarKilometraje = () => {
    const extras: NavigationExtras = {
      replaceUrl: true,
      preserveFragment: true,
      queryParamsHandling: 'merge',
      queryParams: {
        kInicial: this.kilometrajeInicial,
        kFinal: this.kilometrajeFinal,
      },
    };
    this.ruta.navigate([], extras);
  };

  cotizar = () => {
    if (!this.version?.codigo || this.kilometrajeSeleccionado._id === '') {
      this.utilidades.abrirModalInfo(
        'Información',
        'Debes seleccionar una versión y una frecuencia de kilometraje para continuar.',
        'Aceptar'
      );
      return;
    }
    this.cargando = true;

    this.cotizadorStore.setVehiculoSeleccionado({
      modelo: this.modelo,
      version: this.version,
      detalleModelo: this.detalleModelo,
    });

    this.cotizadorService
      .cotizar({
        kinicial: this.kilometrajeInicial,
        kfinal: this.kilometrajeFinal,
        codigoModelo: this.modelo,
        codigoVersion: this.version?.codigo ?? '',
        frecMonth: this.kilometrajeSeleccionado.frecMonth,
        frecKm: this.kilometrajeSeleccionado.frecKm
      })
      .subscribe({
        next: (respuesta: IRespuestaServicio) => {
          this.cargando = false;
          if (respuesta.estatus) {
            this.rutinas = respuesta.data.rutinas;
            this.servicios = respuesta.data.servicios;
            this.valoresPaquete = respuesta.data.valoresPaquete;
            this.estado.set('resultado');
          } else {
            this.utilidades.abrirModalInfo(
              'Información',
              respuesta.resultadoOperacion,
              'Aceptar'
            );
          }
        },
        error: (error: HttpErrorResponse) => {
          this.utilidades.abrirModalInfo(
            'Información',
            error.error.resultadoOperacion,
            'Aceptar'
          );
          this.cargando = false;
        },
      });
  };

  volverFormulario = () => {
    this.estado.set('form');
  };

  async openModalEmail() {
    const modalRef = this.modalService.open(ModalEmail);
    modalRef.result.then(
      (email: any) => {
        if (email) {
          this.correo = email;
          this.descargarPDF();
        }
      },
      (_dismiss: any) => { }
    );
  }

  public descargarPDF = async () => {
    try {
      const pdfBytes = await this.generarPDFPaquete();
      this.emailService.sendEmailWithPdf(pdfBytes, this.correo);
    } catch (error) {
      console.error('Error generando PDF:', error);
    }
  }

  public generarPDFPaquete = async (): Promise<Uint8Array> => {
    const contenedor = document.querySelector('.px-3.py-5') as HTMLElement;
    if (!contenedor) throw new Error('No se encontró el contenedor principal');

    // Clon del contenido y limpieza
    const clone = contenedor.cloneNode(true) as HTMLElement;
    clone.querySelector('.table-responsive')?.remove();
    clone.querySelectorAll('.precio-col').forEach((col) => {
      if (col.textContent?.includes('Ordinario')) col.remove();
    });
    clone.querySelectorAll('button').forEach((btn) => btn.remove());

    // Render temporal fuera de pantalla
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'fixed';
    tempDiv.style.top = '-9999px';
    tempDiv.style.left = '-9999px';
    tempDiv.appendChild(clone);
    document.body.appendChild(tempDiv);

    const canvas = await html2canvas(clone, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL('image/png');
    document.body.removeChild(tempDiv);

    // Cargar la plantilla base
    const templateBytes = await fetch('assets/data/certificate.pdf').then(res => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(templateBytes);
    const [paginaBase] = pdfDoc.getPages();
    const { width: pageWidth, height: pageHeight } = paginaBase.getSize();

    // Insertar imagen del contenido
    const imgEmbed = await pdfDoc.embedPng(imgData);
    const imgOriginalWidth = canvas.width;
    const imgOriginalHeight = canvas.height;

    // Márgenes de seguridad
    const margin = 100;

    // Calcular escala proporcional
    const maxWidth = pageWidth;
    const maxHeight = pageHeight - margin * 2;
    const scale = Math.min(maxWidth / imgOriginalWidth, maxHeight / imgOriginalHeight);

    const imgWidth = imgOriginalWidth * scale;
    const imgHeight = imgOriginalHeight * scale;

    // Centrar el contenido dentro del área visible
    const x = (pageWidth - imgWidth) / 2;
    const y = (pageHeight - imgHeight) / 2;

    paginaBase.drawImage(imgEmbed, {
      x,
      y,
      width: imgWidth,
      height: imgHeight,
    });

    const pdfFinal = await pdfDoc.save();
    return pdfFinal;
  };



  irFormulario = () => {
    this.cotizadorStore.setRutinas(this.rutinas);
    this.cotizadorStore.setServicios(this.servicios);
    this.cotizadorStore.setValoresPaquete(this.valoresPaquete);
    this.ruta.navigate(['/tienda/formulario-cliente']);
  };
}
