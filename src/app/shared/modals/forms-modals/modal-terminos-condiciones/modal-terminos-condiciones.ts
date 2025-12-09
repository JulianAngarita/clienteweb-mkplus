import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Articulo, articuloEI, ITerminosCondiciones, terminosCondicionesEI } from '../../../../core/interfaces/terminos-condiciones/terminos-condiciones.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TerminoCondicionesService } from '../../../../core/services/termino-condiciones/termino-condiciones';
import { IRespuestaServicio } from '../../../../core/interfaces/general';
import { HttpErrorResponse } from '@angular/common/http';
import { Utilidades } from '../../../../core/services/utilidades/utilidades';

@Component({
  selector: 'app-modal-terminos-condiciones',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './modal-terminos-condiciones.html',
  styleUrl: './modal-terminos-condiciones.scss',
})
export class ModalTerminosCondiciones {

  public modalActivo = inject(NgbActiveModal);
  private terminosCondicionesService = inject(TerminoCondicionesService);
  private utilidadesService = inject(Utilidades);

  public cargando: boolean = false;
  public nuevoArticulo: Articulo = Object.assign({}, articuloEI);
  @Input() datosTerminosCondiciones: ITerminosCondiciones = Object.assign({}, terminosCondicionesEI);
  @Input() evento: 'EVENTO_ACTUALIZAR' | 'EVENTO_GUARDAR' = 'EVENTO_GUARDAR';

  public agregarArticulo = () => {
    if (
      this.nuevoArticulo.titulo.length === 0 ||
      this.nuevoArticulo.contenido.length === 0
    ) return;
    this.datosTerminosCondiciones.articulos.push(this.nuevoArticulo);
    this.nuevoArticulo = Object.assign({}, articuloEI);
  }

  public eliminarArticulo = (index: number) => {
    this.datosTerminosCondiciones.articulos.splice(index, 1);
  };

  public guardar = () => {
    this.terminosCondicionesService.crearTerminos(this.datosTerminosCondiciones).subscribe({
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
        this.cargando = false
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

    if ("creado" in this.datosTerminosCondiciones) {
      delete (this.datosTerminosCondiciones as any).creado;
    }
    if ("actualizado" in this.datosTerminosCondiciones) {
      delete (this.datosTerminosCondiciones as any).actualizado;
    }
    if ("__v" in this.datosTerminosCondiciones) {
      delete (this.datosTerminosCondiciones as any).__v;
    }
    if ("editado" in this.datosTerminosCondiciones) {
      delete (this.datosTerminosCondiciones as any).editado;
    }

    this.terminosCondicionesService.actualizarTerminos(this.datosTerminosCondiciones).subscribe({
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
        this.cargando = false
        this.utilidadesService.abrirModalInfo(
          'Información',
          error.error.resultadoOperacion,
          'Aceptar'
        )
      }
    })
  }
}
