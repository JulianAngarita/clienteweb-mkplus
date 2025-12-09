import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IVariableCalculo, variableCalculoEI } from '../../../../core/interfaces/variables-calculo/variables-calculo.interface';
import { VariablesService } from '../../../../core/services/variables/variables';
import { tipoValorOpciones } from '../../../../core/enum/tipo-valor/tipo-valor';
import { tipoAplicaParaOpciones } from '../../../../core/enum/tipo-aplica-para/tipo-aplica-para';
import { IRespuestaServicio } from '../../../../core/interfaces/general';
import { Utilidades } from '../../../../core/services/utilidades/utilidades';
import { HttpErrorResponse } from '@angular/common/http';
import { ICampos, IClaves } from '../../../../core/interfaces/versiones/versiones.interface';

@Component({
  selector: 'app-modal-variables',
  imports: [
    FormsModule
  ],
  templateUrl: './modal-variables.html',
  styleUrl: './modal-variables.scss',
})
export class ModalVariables {

  public modalActivo = inject(NgbActiveModal);
  private variablesService = inject(VariablesService);
  private utilidadesService = inject(Utilidades);

  public tipoValor = tipoValorOpciones;
  public tipoAplicaPara = tipoAplicaParaOpciones;

  @Input() datosVariable: IVariableCalculo = Object.assign({}, variableCalculoEI);
  @Input() evento: 'EVENTO_ACTUALIZAR' | 'EVENTO_GUARDAR' = 'EVENTO_GUARDAR';

  public cargando: boolean = false;

  public guardar = () => {
    this.cargando = true;
    this.variablesService.crearVariable(this.datosVariable).subscribe({
      next: (respuesta: IRespuestaServicio) => {
        this.cargando = false;
        if (respuesta.estatus) {
          this.utilidadesService.abrirModalInfo(
            'Información',
            `Variable ${this.datosVariable.nombre} creado con éxito.`,
            'Aceptar'
          );
        } else {
          this.utilidadesService.abrirModalInfo(
            'Información',
            respuesta.resultadoOperacion,
            'Aceptar'
          );
        }
        this.cargando = false;
        this.modalActivo.close(true);
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

  public actualizar = () => {
    this.cargando = true;
    delete this.datosVariable.creado;
    delete this.datosVariable.actualizado;
    if ("__v" in this.datosVariable) {
      delete (this.datosVariable as any).__v;
    }
    if ("editado" in this.datosVariable) {
      delete (this.datosVariable as any).editado;
    }
    this.variablesService.actualizarVariable(this.datosVariable).subscribe({
      next: (respuesta: IRespuestaServicio) => {
        this.cargando = false;
        if (respuesta.estatus) {
          this.utilidadesService.abrirModalInfo(
            'Información',
            `Variable ${this.datosVariable.nombre} actualizado con éxito.`,
            'Aceptar'
          );
          this.modalActivo.close(true);
        } else {
          this.utilidadesService.abrirModalInfo(
            'Información',
            respuesta.resultadoOperacion,
            'Aceptar'
          );
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
