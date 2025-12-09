import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Utilidades } from '../../../../core/services/utilidades/utilidades';
import { ServiciosServicios } from '../../../../core/services/servicios/servicios';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OperacionesService } from '../../../../core/services/operaciones/operaciones';
import IOperaciones, { filtroOperacionesEI } from '../../../../core/interfaces/operaciones/operaciones.interface';
import { IRespuestaServicio } from '../../../../core/interfaces/general';
import { HttpErrorResponse } from '@angular/common/http';
import IServicio, { servicioEI } from '../../../../core/interfaces/servicios/servicios.interface';
import { LoadingScreenComponent } from '../../../components/loading-screen/loading-screen';
import { tipoTransmisionOpciones } from '../../../../core/enum/tipo-transmision/tipo-transmision';
import { tipoCombustibleOpciones } from '../../../../core/enum/tipo-combustible/tipo-combustible';
import { tipoAireAcondicionadoOpciones } from '../../../../core/enum/tipo-aire-acondicionado/tipo-aire-acondicionado';

@Component({
  selector: 'app-modal-anadir-operacion',
  imports: [
    FormsModule,
    CommonModule,
    LoadingScreenComponent,
    NgbModule
  ],
  templateUrl: './modal-anadir-operacion.html',
  styleUrl: './modal-anadir-operacion.scss',
})
export class ModalAnadirOperacion {

  public activeModal = inject(NgbActiveModal);
  private serviciosService = inject(ServiciosServicios);
  private operacionesService = inject(OperacionesService)
  private utilidadesService = inject(Utilidades);

  @Input() datosServicio: IServicio = structuredClone(servicioEI);
  public filtroOperaciones = structuredClone(filtroOperacionesEI);
  public cargando: boolean = false;
  public operaciones: IOperaciones[] = [];
  public total: number = 0;
  public paginas: number = 1;

  public tipoTransmisionOpciones = tipoTransmisionOpciones;
  public tipoCombustibleOpciones = tipoCombustibleOpciones;
  public tipoAireAcondicionadoOpciones = tipoAireAcondicionadoOpciones;

  ngOnInit() {
    this.consultaOperaciones();
  }

  public consultaOperaciones = () => {
    this.cargando = true;
    this.operacionesService.consultaOperaciones(this.filtroOperaciones).subscribe({
      next: (respuesta: IRespuestaServicio) => {
        this.cargando = false;
        if (respuesta.estatus) {
          this.operaciones = respuesta.data.operaciones;
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

  public actualizarServicio = () => {
    this.cargando = true;
    this.serviciosService.actualizarServicios(this.datosServicio).subscribe({
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

  cambiarPagina = ( pagina: number ) => {
    this.filtroOperaciones.salto = (pagina - 1) * this.filtroOperaciones.limite;
    this.consultaOperaciones();
  }

  public elegirOperacion = (id: string) => {

    const conjunto: string[] = [...this.datosServicio.operaciones];

    const existe = conjunto.includes(id);
    if (existe) {
      return;
    }

    conjunto.push(id);

    this.datosServicio = {
      ...this.datosServicio,
      operaciones: conjunto
    };

    this.actualizarServicio();
  };
}
