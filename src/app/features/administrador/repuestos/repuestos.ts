import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import IRepuestos, { filtroRepuestosEI, IConsultaRepuestos } from '../../../core/interfaces/repuestos/repuestos.interface';
import { LoadingScreenComponent } from '../../../shared/components/loading-screen/loading-screen';
import { RepuestosService } from '../../../core/services/repuestos/repuestos';
import { IRespuestaServicio } from '../../../core/interfaces/general';
import { HttpErrorResponse } from '@angular/common/http';
import { Utilidades } from '../../../core/services/utilidades/utilidades';
import { ModalRepuestos } from '../../../shared/modals/forms-modals/modal-repuestos/modal-repuestos';
import { ModalRepuestosCsv } from '../../../shared/modals/forms-modals/modal-repuestos-csv/modal-repuestos-csv';

@Component({
  selector: 'app-repuestos',
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    LoadingScreenComponent,
  ],
  templateUrl: './repuestos.html',
  styleUrl: './repuestos.scss',
})
export class Repuestos {

  private repuestoService = inject(RepuestosService);
  private utilidadesService = inject(Utilidades);
  private modalService = inject(NgbModal);

  public repuestos: IRepuestos[] = [];

  public filtro: IConsultaRepuestos = Object.assign({}, filtroRepuestosEI);

  public pagina: number = 1;
  public total: number = 0;

  cargando = false;


  ngOnInit(): void {
    this.consultar();
  }

  cambiarPagina = ( pagina: number ) => {
    this.filtro.salto = (pagina - 1) * this.filtro.limite;
    this.consultar();
  }

  public crear = async (): Promise<void> => {
    const instancia = this.modalService.open(ModalRepuestos, {
      centered: true,
      size: 'xl'
    });

    instancia.componentInstance.evento = 'EVENTO_GUARDAR';
    const result = await instancia.result;
    if (result) {
      this.consultar();
    }
  }

  public cargarRepuestos = async (): Promise<void> => {
    const instancia = this.modalService.open(ModalRepuestosCsv, {
      centered: true,
      size: 'xl'
    });

    const result = await instancia.result;
    if (result) {
      this.consultar();
    }
  }

  public actualizar = async (repuesto: IRepuestos): Promise<void> => {
    const instancia = this.modalService.open(ModalRepuestos, {
      centered: true,
      size: 'xl'
    });

    instancia.componentInstance.evento = 'EVENTO_ACTUALIZAR';
    instancia.componentInstance.datosRepuestos = repuesto;
    const result = await instancia.result;
    if (result) {
      this.consultar();
    }
  }

  public eliminarRepuesto = (repuesto: IRepuestos) => {
    this.utilidadesService.abrirModalConfirmacion(
      'Eliminar repuesto',
      `Estas seguro que quieres eliminar el repuesto ${repuesto.descripcion}?`,
      'Eliminar',
      'Cancelar'
    ).then((resultado) => {
      if (resultado) {
        this.eliminar(repuesto._id ?? '');
      }
    })
  }

  private eliminar = (id: string) => {
    this.cargando = true;
    this.repuestoService.eliminarRepuesto({id}).subscribe({
      next: (respuesta: IRespuestaServicio) => {
        this.cargando = false;
        this.utilidadesService.abrirModalInfo(
          'Información',
          respuesta.resultadoOperacion,
          'Aceptar'
        );
        if (respuesta.estatus) this.consultar();
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

  public consultar = () => {
    this.cargando = true;
    this.repuestoService.consultarRepuestos(this.filtro).subscribe({
      next: (respuesta: IRespuestaServicio) => {
        if (respuesta.estatus) {
          this.repuestos = respuesta.data.repuestos;
          this.total = respuesta.data.total;
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
}
