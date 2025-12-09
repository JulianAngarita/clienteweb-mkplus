import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { operacionesListado } from '../../../../core/enum/tipo-operaciones-listado/tipo-operaciones-listado';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import IServicio, { filtroServiciosEI, IConsultaServicio } from '../../../../core/interfaces/servicios/servicios.interface';
import { ServiciosServicios } from '../../../../core/services/servicios/servicios';
import { IRespuestaServicio } from '../../../../core/interfaces/general';
import { Utilidades } from '../../../../core/services/utilidades/utilidades';
import { HttpErrorResponse } from '@angular/common/http';
import IPaquetes, { paqueteEI } from '../../../../core/interfaces/paquetes/paquetes.interface';
import { PaquetesService } from '../../../../core/services/paquetes/paquetes';
import { LoadingScreenComponent } from '../../../components/loading-screen/loading-screen';

@Component({
  selector: 'app-modal-anadir-servicios',
  imports: [
    NgbModule,
    ReactiveFormsModule,
    LoadingScreenComponent
  ],
  templateUrl: './modal-anadir-servicios.html',
  styleUrl: './modal-anadir-servicios.scss',
})
export class ModalAnadirServicios {

  public activeModal = inject(NgbActiveModal);
  private fb = inject(FormBuilder);
  private serviciosService = inject(ServiciosServicios);
  private utilidadesService = inject(Utilidades);
  private paquetesService = inject(PaquetesService);

  @Input() datosPaquete: IPaquetes = structuredClone(paqueteEI);
  
  public operacionesListadoOpciones = operacionesListado;
  public servicios: IServicio[] = [];
  public filtro: IConsultaServicio = structuredClone(filtroServiciosEI)
  public pagina: number = 1;
  public total: number = 0;
  public cargando: boolean = false;
  public formFiltro!: FormGroup;

  constructor() {
    this.crearFormulario();
    this.consultar();
  }

  public consultar = () => {
    this.cargando = true;
    this.serviciosService.consultarServicios(this.filtro).subscribe({
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
        this.utilidadesService.abrirModalInfo(
          'Información',
          error.error.resultadoOperacion,
          'Aceptar'
        );
      }
    })
  }

  public actualizar = (payload: IPaquetes) => {
    this.cargando = true;
    this.paquetesService.actualizarPaquete(payload).subscribe({
      next: (respuesta: IRespuestaServicio) => {
        this.cargando = false;
        this.utilidadesService.abrirModalInfo(
          'Información',
          respuesta.resultadoOperacion,
          'Aceptar'          
        )
        if (respuesta.estatus) this.activeModal.close(respuesta.estatus);
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

    this.formFiltro.valueChanges.subscribe(val => {
      this.filtro = val;
      this.consultar();
    });
  }

  cambiarPagina = ( pagina: number ) => {
    this.filtro.salto = (pagina - 1) * this.filtro.limite;
    this.consultar();
  }

  public elegirServicio = (id: string) => {

    const conjunto: string[] = [...this.datosPaquete.servicios];

    const existe = conjunto.includes(id);
    if (existe) {
      return;
    }

    conjunto.push(id);

    this.datosPaquete = {
      ...this.datosPaquete,
      servicios: conjunto
    };

    this.actualizar(this.datosPaquete);
  };
}
