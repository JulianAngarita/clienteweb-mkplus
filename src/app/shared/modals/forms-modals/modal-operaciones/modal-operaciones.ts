import { Component, inject, Input } from '@angular/core';
import IOperaciones, { IRepuestosOperaciones, operacionEI } from '../../../../core/interfaces/operaciones/operaciones.interface';
import { NgbActiveModal, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { tipoTransmisionOpciones } from '../../../../core/enum/tipo-transmision/tipo-transmision';
import { tipoCombustibleOpciones } from '../../../../core/enum/tipo-combustible/tipo-combustible';
import { tipoAireAcondicionadoOpciones } from '../../../../core/enum/tipo-aire-acondicionado/tipo-aire-acondicionado';
import IRepuestos, { filtroRepuestosEI, IConsultaRepuestos } from '../../../../core/interfaces/repuestos/repuestos.interface';
import { IRespuestaServicio } from '../../../../core/interfaces/general';
import { RepuestosService } from '../../../../core/services/repuestos/repuestos';
import { HttpErrorResponse } from '@angular/common/http';
import { Utilidades } from '../../../../core/services/utilidades/utilidades';
import { OperacionesService } from '../../../../core/services/operaciones/operaciones';

@Component({
  selector: 'app-modal-operaciones',
  imports: [
    CommonModule,
    FormsModule,
    NgbModule
  ],
  templateUrl: './modal-operaciones.html',
  styleUrl: './modal-operaciones.scss',
})
export class ModalOperaciones {

  public modalActivo = inject(NgbActiveModal);
  private repuestosService = inject(RepuestosService);
  private utilidadesService = inject(Utilidades);
  private operacionesService = inject(OperacionesService)

  @Input() evento: 'EVENTO_ACTUALIZAR' | 'EVENTO_GUARDAR' = 'EVENTO_GUARDAR';
  @Input() datosOperacion: IOperaciones = operacionEI;
  public filtroRepuesto: IConsultaRepuestos = Object.assign({}, filtroRepuestosEI);
  public repuestos: IRepuestos[] = [];
  public tipoTransmisionOpciones = tipoTransmisionOpciones;
  public tipoCombustibleOpciones = tipoCombustibleOpciones;
  public tipoAireAcondicionadoOpciones = tipoAireAcondicionadoOpciones;
  public cargando: boolean = false;
  public paginaRepuestos: number = 1;
  public totalRepuestos: number = 0;

  isSlideRepuestosOpen = false;

  abrirSlideRepuestos() {
    this.isSlideRepuestosOpen = true;
    this.consultarRepuestos();
  }

  cerrarSlideRepuestos() {
    this.isSlideRepuestosOpen = false;
  }

  public restarCantidad = (index: number) => {
    let repuestos = this.datosOperacion.repuestos;

    if (repuestos[index].cantidad === 1) {
      this.eliminarRepuesto(repuestos[index]);
      return;
    }

    repuestos[index].cantidad -= 1;

    this.datosOperacion.repuestos = repuestos;
  }

  public eliminarRepuesto = (repuesto: IRepuestosOperaciones) => {
    let repuestos = this.datosOperacion.repuestos;

    const nuevosRepuestos = repuestos.filter((r: IRepuestosOperaciones) => r.referencia !== repuesto.referencia);

    this.datosOperacion.repuestos = nuevosRepuestos;
  }

  public sumarCantidad = (index: number) => {
    let repuestos = this.datosOperacion.repuestos;

    repuestos[index].cantidad += 1;

    this.datosOperacion.repuestos = repuestos;
  }

  public agregarRepuesto = (repuesto: IRepuestos|IRepuestosOperaciones) => {
    let conjunto = this.datosOperacion.repuestos;
    const validarExiste = conjunto.find( j=> {
        return repuesto.referencia === j.referencia
    });

    const indexof = this.datosOperacion.repuestos.findIndex((r) => r.referencia === repuesto.referencia)

    if ( validarExiste ) {
      this.datosOperacion.repuestos[indexof].cantidad += 1 
    } else {
      const repuestoAgregar: IRepuestosOperaciones = {
        referencia: repuesto.referencia,
        pnc: repuesto.pnc,
        cantidad: 1,
        precioVenta: {
          publico: repuesto.precioVenta.publico,
          concesionario: repuesto.precioVenta.concesionario
        },
        margen: {
          precioVentaConcesionario: repuesto.margen.precioVentaConcesionario,
          precioVentaPublico: repuesto.margen.precioVentaPublico
        }
      }

      conjunto.push( repuestoAgregar )
    }
  }

  public actualizar = () => {
    this.cargando = true;
    this.operacionesService.actualizarOperaciones(this.datosOperacion).subscribe({
      next: (respuesta: IRespuestaServicio) => {
        this.cargando = false;
        this.utilidadesService.abrirModalInfo(
          'Información',
          respuesta.resultadoOperacion,
          'Aceptar'
        );
        if (respuesta.estatus) this.modalActivo.close(true);
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

  public guardar = () => {
    this.cargando = true;
    this.operacionesService.crearOperaciones(this.datosOperacion).subscribe({
      next: (respuesta: IRespuestaServicio) => {
        this.cargando = false;
        this.utilidadesService.abrirModalInfo(
          'Información',
          respuesta.resultadoOperacion,
          'Aceptar'
        );
        if (respuesta.estatus) this.modalActivo.close(true);
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

  public consultarRepuestos = () => {
    this.cargando = true;
    this.repuestosService.consultarRepuestos(this.filtroRepuesto).subscribe({
      next: (respuesta: IRespuestaServicio) => {
        if (respuesta.estatus) {
          this.repuestos = respuesta.data.repuestos;
          this.totalRepuestos = respuesta.data.total;
        }
        this.cargando = false;
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

  cambiarPaginaRepuestos = ( pagina: number ) => {
    this.filtroRepuesto.salto = (pagina - 1) * this.filtroRepuesto.limite;
    this.consultarRepuestos();
  }
}
