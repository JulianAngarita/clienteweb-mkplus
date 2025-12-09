import { Component, inject } from '@angular/core';
import { LoadingScreenComponent } from '../../../shared/components/loading-screen/loading-screen';
import IServicio, { filtroServiciosEI, IConsultaServicio } from '../../../core/interfaces/servicios/servicios.interface';
import { operacionesListado } from '../../../core/enum/tipo-operaciones-listado/tipo-operaciones-listado';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Utilidades } from '../../../core/services/utilidades/utilidades';
import { ServiciosServicios } from '../../../core/services/servicios/servicios';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IRespuestaServicio } from '../../../core/interfaces/general';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalServicios } from '../../../shared/modals/forms-modals/modal-servicios/modal-servicios';

@Component({
  selector: 'app-servicios',
  imports: [
    LoadingScreenComponent,
    NgbModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './servicios.html',
  styleUrl: './servicios.scss',
})
export class Servicios {
  private fb = inject(FormBuilder);
  private utilidadesService = inject(Utilidades);
  private servicioService = inject(ServiciosServicios);
  private modalService = inject(NgbModal);

  public cargando: boolean = false;
  public servicios: IServicio[] = [];
  public total: number = 0;
  public pagina: number = 1;
  public filtro: IConsultaServicio = structuredClone(filtroServiciosEI);
  public operacionesListadoOpciones = operacionesListado;
  public formFiltro!: FormGroup;

  constructor() {
    this.crearFormulario();
    this.consulta();
  }

  public crear = async () => {
    const instancia = this.modalService.open(ModalServicios, {
      centered: true,
      size: 'xl'
    });

    const result = await instancia.result;
    if (result) {
      this.consulta();
    }
  }

  public consulta = () => {
    this.filtro = this.formFiltro.value;
    this.cargando = true;
    this.servicioService.consultarServicios(this.filtro).subscribe({
      next: (respuesta: IRespuestaServicio) => {
        this.cargando = false;
        if (respuesta.estatus) {
          this.servicios = respuesta.data.servicios;
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

  public eliminar = (id: string) => {
    this.cargando = true;
    this.servicioService.eliminarServicio({id}).subscribe({
      next: (respuesta: IRespuestaServicio) => {
        this.cargando = false;
        this.utilidadesService.abrirModalInfo(
          'Información',
          respuesta.resultadoOperacion,
          'Aceptar'
        );
        if (respuesta.estatus) {
          this.consulta();
        }
      },
      error: (error: IRespuestaServicio) => {
        this.cargando = false;
        this.utilidadesService.abrirModalInfo(
          'Información',
          error.error.resultadoOperacion,
          'Aceptar'
        );
      }
    })
  }

  cambiarPagina = ( pagina: number ) => {
    this.filtro.salto = (pagina - 1) * this.filtro.limite;
    this.consulta();
  }

  crearFormulario() {
    this.formFiltro = this.fb.group({
      nombre: [''],
      descripcion: [''],
      tipo: [''],
      activo: [true],
      salto: [0],
      modelo: this.fb.group({
        codigo: [''],
        version: [''],
      }),
      limite: 10
    });
  }

}
