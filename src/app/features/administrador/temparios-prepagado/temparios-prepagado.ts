import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TemparioPrepagadoService } from '../../../core/services/tempario-prepagado/tempario-prepagado';
import { Utilidades } from '../../../core/services/utilidades/utilidades';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IPrepagado } from '../../../core/interfaces/tempario-prepagado/tempario-prepagado.interface';
import { IRespuestaServicio } from '../../../core/interfaces/general';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalTemparioPrepagado } from '../../../shared/modals/forms-modals/modal-tempario-prepagado/modal-tempario-prepagado';
import { LoadingScreenComponent } from '../../../shared/components/loading-screen/loading-screen';

@Component({
  selector: 'app-temparios-prepagado',
  imports: [
    CommonModule,
    LoadingScreenComponent
  ],
  templateUrl: './temparios-prepagado.html',
  styleUrl: './temparios-prepagado.scss',
})
export class TempariosPrepagado {

  private temparioPrepagadoService = inject(TemparioPrepagadoService);
  private utilidadesService = inject(Utilidades);
  private modalService = inject(NgbModal);

  public cargando: boolean = false;
  public temparios: IPrepagado[] = [];

  ngOnInit() {
    this.consultar();
  }

  public consultar = () => {
    this.cargando = true;
    this.temparioPrepagadoService.consultarTempariosPrepagado().subscribe({
      next: (respuesta: IRespuestaServicio) => {
        this.cargando = false;
        if (respuesta.estatus) {
          this.temparios = respuesta.data;
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

  public crear = async () => {
    const instancia = this.modalService.open(ModalTemparioPrepagado, {
      centered: true,
    });

    instancia.componentInstance.evento = 'EVENTO_GUARDAR';

    const result = await instancia.result;
    if (result) {
      this.consultar();
    }
  }

  public actualizar = async (tempario: IPrepagado) => {
    const instancia = this.modalService.open(ModalTemparioPrepagado, {
      centered: true,
    });

    instancia.componentInstance.evento = 'EVENTO_ACTUALIZAR';
    instancia.componentInstance.datosTempario = tempario;

    const result = await instancia.result;
    if (result) {
      this.consultar();
    }
  }

  public eliminarTempario = (tempario: IPrepagado) => {
    this.utilidadesService.abrirModalConfirmacion(
      'Eliminar Tempario prepagado',
      `Estas seguro que quieres eliminar el tempario ${tempario.rutina}?`,
      'Eliminar',
      'Cancelar'
    ).then((result) => {
      this.eliminar(tempario._id ?? '')
    })
  }

  public eliminar = (id: string) => {
    this.cargando = true;
    this.temparioPrepagadoService.eliminarTemparioPrepagado({id}).subscribe({
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
