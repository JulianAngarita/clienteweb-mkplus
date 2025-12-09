import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import ICliente, { clienteEI } from '../../../core/interfaces/clientes/clientes.interface';
import IVehiculos, { vehiculoEI } from '../../../core/interfaces/vehiculos/vehiculos.interface';
import { ISolicitudAdquisicion, solicitudAdquisicionEI } from '../../../core/interfaces/solicitudes/solicitudes.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-acuerdos-prepagados',
  imports: [
    CommonModule
  ],
  templateUrl: './modal-acuerdos-prepagados.html',
  styleUrl: './modal-acuerdos-prepagados.scss',
})
export class ModalAcuerdosPrepagados {

  public modalActivo = inject(NgbActiveModal);

  @Input() cliente: ICliente = structuredClone(clienteEI);
  @Input() vehiculo: IVehiculos = structuredClone(vehiculoEI);
  @Input() solicitud: ISolicitudAdquisicion = structuredClone(solicitudAdquisicionEI);

  @ViewChild('printSection') printSection!: ElementRef;

  imprimir() {
    // Crear un iframe temporal para la impresión
    const printContent = document.getElementById('areaImprimir');

    if (printContent) {
      // Crear ventana de impresión temporal
      const ventanaImpresion = window.open('', '_blank', 'width=800,height=600');

      if (ventanaImpresion) {
        // Obtener estilos globales
        const estilos = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
          .map(el => el.outerHTML)
          .join('');

        // Contenido HTML para imprimir
        const contenidoHTML = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Acuerdo de Mantenimiento Prepagado</title>
          <style>
            @page { margin: 2cm; }
            body { 
              font-family: Arial, sans-serif; 
              font-size: 12pt; 
              line-height: 1.5;
            }
            h1 { font-size: 18pt; margin-bottom: 20px; }
            h2 { font-size: 14pt; margin-top: 25px; }
            h3 { font-size: 13pt; margin-top: 20px; }
            .card { 
              border: 1px solid #ddd; 
              padding: 20px; 
              margin-bottom: 20px;
              page-break-inside: avoid;
            }
            table { 
              width: 100%; 
              border-collapse: collapse; 
              margin: 15px 0;
            }
            th, td { 
              border: 1px solid #ddd; 
              padding: 8px; 
              text-align: left;
            }
            th { background-color: #f5f5f5; }
            .text-justify { text-align: justify; }
            .mb-4 { margin-bottom: 20px !important; }
            .mt-4 { margin-top: 20px !important; }
            ul { padding-left: 20px; }
            li { margin-bottom: 8px; }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
                setTimeout(function() { window.close(); }, 500);
              }, 500);
            };
          </script>
        </body>
        </html>
      `;

        ventanaImpresion.document.write(contenidoHTML);
        ventanaImpresion.document.close();
      } else {
        const contenidoOriginal = document.body.innerHTML;
        const contenidoImprimir = printContent.innerHTML;

        document.body.innerHTML = contenidoImprimir;
        window.print();
        document.body.innerHTML = contenidoOriginal;
        window.location.reload();
      }
    } 
  }

  // Devuelve un arreglo plano con todas las rutinas (detallesServicios)
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
}