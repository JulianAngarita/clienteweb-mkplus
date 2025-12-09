import { Component, inject } from '@angular/core';
import { PaquetesService } from '../../../core/services/paquetes/paquetes';
import { ActivatedRoute } from '@angular/router';
import IPaquetes, { paqueteEI } from '../../../core/interfaces/paquetes/paquetes.interface';
import { IRespuestaServicio } from '../../../core/interfaces/general';
import { HttpErrorResponse } from '@angular/common/http';
import { Utilidades } from '../../../core/services/utilidades/utilidades';
import IServicio from '../../../core/interfaces/servicios/servicios.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { tipoPaquete } from '../../../core/enum/tipo-paquete/tipo-paquete';
import { estadoSolicitudesListaOpciones, paqueteActivoOpciones } from '../../../core/enum/tipo-estado-paquete/tipo-estado-paquete';
import { LoadingScreenComponent } from '../../../shared/components/loading-screen/loading-screen';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAnadirServicios } from '../../../shared/modals/forms-modals/modal-anadir-servicios/modal-anadir-servicios';

@Component({
  selector: 'app-detalles',
  imports: [
    ReactiveFormsModule,
    LoadingScreenComponent
  ],
  templateUrl: './detalles.html',
  styleUrl: './detalles.scss',
})
export class Detalles {

  private paquetesService = inject(PaquetesService);
  private rutaActiva = inject(ActivatedRoute);
  private utilidadesService = inject(Utilidades);
  private fb = inject(FormBuilder);
  private modalService = inject(NgbModal);

  public tipoPaqueteOpciones = tipoPaquete;
  public tipoEstadoSolicitudes = estadoSolicitudesListaOpciones;
  public tipoPaqueteActivo = paqueteActivoOpciones;

  public idPaquete: string = '';
  public cargando: boolean = false;
  public paqueteForm!: FormGroup;

  public paquete: IPaquetes = structuredClone(paqueteEI);
  public servicios: IServicio[] = [];

  constructor() {
    this.idPaquete = this.rutaActiva.snapshot.paramMap.get('id') ?? '';
    this.crearFormulario();
    this.consultaId(); 
  }

  public eliminar = (index: number) => {
    const servicios = [...this.paquete.servicios];
    const detalles = [...this.paquete.detallesServicios];
    servicios.splice(index, 1);
    detalles.splice(index, 1);
    const actualizado = {
      ...this.paquete,
      servicios,
      detallesServicios: detalles
    };
    this.paquete = actualizado;
    this.actualizar();
  }

  private crearFormulario() {
    this.paqueteForm = this.fb.group({
      nombre: [''],
      descripcion: [''],
      codigoPaquete: [''],
      tipoPaquete: [''],
      activo: [''],   

      modelo: this.fb.group({
        codigo: [''],
        descripcion: [''],
        version: [''],
      }),

      estatus: this.fb.group({
        nombre: [''],
      })
    });
  }

  public anadirServicios = async () => {
    const instancia = this.modalService.open(ModalAnadirServicios, {
      centered: true,
      size: 'xl'
    });

    instancia.componentInstance.datosPaquete = this.paquete;

    const result = await instancia.result;
    console.log(result);
    if (result) {
      this.consultaId();
    }
  }

  public actualizar = () => {

    if (this.paqueteForm.invalid) return;

    const paqueteActualizado = {
      ...this.paquete,
      ...this.paqueteForm.value
    }

    this.cargando = true;
    this.paquetesService.actualizarPaquete(paqueteActualizado).subscribe({
      next: (respuesta: IRespuestaServicio) => {
        this.cargando = false;
        this.utilidadesService.abrirModalInfo(
          'Información',
          respuesta.resultadoOperacion,
          'Aceptar'          
        )
        if (respuesta.estatus) this.consultaId();
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

  public consultaId = () => {
    this.cargando = true;

    this.paquetesService.consultarPaqueteId({ id: this.idPaquete }).subscribe({
      next: (respuesta) => {
        this.cargando = false;

        if (respuesta.estatus) {

          this.paquete = respuesta.data.paquete;
          this.servicios = respuesta.data.servicios;
          this.paqueteForm.patchValue({
            nombre: this.paquete.nombre,
            descripcion: this.paquete.descripcion,
            codigoPaquete: this.paquete.codigoPaquete,
            tipoPaquete: this.paquete.tipoPaquete,
            activo: this.paquete.activo,

            modelo: {
              codigo: this.paquete.modelo.codigo,
              descripcion: this.paquete.modelo.descripcion,
              version: this.paquete.modelo.version
            },

            estatus: {
              nombre: this.paquete.estatus.nombre,
            }
          });

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
  };

  formatCurrency(value: number) {
    return new Intl.NumberFormat('es-CO', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  }

  public onVolver() {
    history.back();
  }
}
