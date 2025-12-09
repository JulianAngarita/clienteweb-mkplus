import { Component, inject } from '@angular/core';
import { LoadingScreenComponent } from '../../../shared/components/loading-screen/loading-screen';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { VariablesService } from '../../../core/services/variables/variables';
import { IRespuestaServicio } from '../../../core/interfaces/general';
import { Utilidades } from '../../../core/services/utilidades/utilidades';
import { HttpErrorResponse } from '@angular/common/http';
import { IVariableCalculo } from '../../../core/interfaces/variables-calculo/variables-calculo.interface';
import { ModalVariables } from '../../../shared/modals/forms-modals/modal-variables/modal-variables';

@Component({
  selector: 'app-variables',
  imports: [
    LoadingScreenComponent,
    NgbModule
  ],
  templateUrl: './variables.html',
  styleUrl: './variables.scss',
})
export class Variables {

  private variablesService = inject(VariablesService);
  private utilidadesService = inject(Utilidades);
  private modalService = inject(NgbModal);

  public cargando: boolean = false;
  public variables: IVariableCalculo[] = [];

  ngOnInit() {
    this.consultar();
  }

  public crear = async (): Promise<void> => {
    const instancia = this.modalService.open(ModalVariables, {
      centered: true,
      size: 'l'
    });

    instancia.componentInstance.evento = 'EVENTO_GUARDAR'

    const result = await instancia.result;
    if (result) {
      this.consultar()
    }
  }

  public actualizar = async (variable: IVariableCalculo): Promise<void> => {
    const instancia = this.modalService.open(ModalVariables, {
      centered: true,
      size: 'l'
    });

    instancia.componentInstance.evento = 'EVENTO_ACTUALIZAR';
    instancia.componentInstance.datosVariable = variable;

    const result = await instancia.result;
    if (result) {
      this.consultar();
    }
  }

  public eliminarVariable = async (variable: IVariableCalculo): Promise<void> => {
    this.utilidadesService.abrirModalConfirmacion(
      'Eliminar variable',
      `Estas seguro que quieres eliminar la variable ${variable.descripcion}?`,
      'Eliminar',
      'Cancelar'
    ).then((result) => {
      if (result) {
        this.eliminar(variable._id ?? '');
      }
    })
  }

  public eliminar = (id: string) => {
    this.variablesService.eliminarVariable({id}).subscribe({
      next: (respuesta: IRespuestaServicio) => {
        if (respuesta.estatus) {
          this.utilidadesService.abrirModalInfo(
            'Información',
            respuesta.resultadoOperacion,
            'Aceptar'
          );
        }
        this.cargando = false;
        this.consultar();
      },
      error: (error: HttpErrorResponse) => {
        this.utilidadesService.abrirModalInfo(
          'Información',
          error.error.resultadoOperacion,
          'Aceptar'
        );
        this.cargando = false;
      }
    })
  }

  public consultar = async (): Promise<void> => {
    this.cargando = true;
    this.variablesService.consultarVariables().subscribe({
      next: (respuesta: IRespuestaServicio) => {
        this.cargando = false;
        if (respuesta.estatus) {
          this.variables = respuesta.data;
        } else {
          this.utilidadesService.abrirModalInfo(
            'Información',
            respuesta.resultadoOperacion,
            'Aceptar'
          )
        }
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
