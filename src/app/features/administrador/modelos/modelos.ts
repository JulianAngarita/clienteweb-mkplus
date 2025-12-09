import { Component, inject } from '@angular/core';
import IModelo, { modeloEI } from '../../../core/interfaces/modelos/modelos.interface';
import { ModelosService } from '../../../core/services/modelos/modelos';
import { IRespuestaServicio } from '../../../core/interfaces/general';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalModelos } from '../../../shared/modals/forms-modals/modal-modelos/modal-modelos';
import { FormsModule } from '@angular/forms';
import { Utilidades } from '../../../core/services/utilidades/utilidades';
import { HttpErrorResponse } from '@angular/common/http';
import { LoadingScreenComponent } from '../../../shared/components/loading-screen/loading-screen';

@Component({
  selector: 'app-modelos',
  imports: [
    FormsModule,
    LoadingScreenComponent
  ],
  templateUrl: './modelos.html',
  styleUrl: './modelos.scss',
})
export class Modelos {
  private modelosService = inject(ModelosService);
  private modalService = inject(NgbModal);
  private utilidadesService = inject(Utilidades);

  public filtroActivo: boolean = true;
  public cargando: boolean = false;
  public modelos: IModelo[] = [];

  ngOnInit(): void {
    this.consultaModelos();
  }

  public nuevoModelo = async () => {
    const instancia = this.modalService.open(ModalModelos, {
      size: 'xl'
    });

    const resultado = await instancia.result;
    if (resultado) this.consultaModelos();
  }

  public editar = (modelo: IModelo) => {
    const instancia = this.modalService.open(ModalModelos, {
      size: 'xl'
    });

    instancia.componentInstance.modelo = modelo;
    instancia.componentInstance.evento = 'EVENTO_ACTUALIZAR';
  }

  public eliminarModelo = (modelo: IModelo) => {
    this.utilidadesService.abrirModalConfirmacion(
      'Eliminar modelo',
      `Estas seguro que quieres eliminar el modelo ${modelo.modelo.nombre}?`,
      'Eliminar',
      'Cancelar'
    ).then((resultado) => {
      if (resultado) {
        this.eliminar(modelo._id ?? '');
      }
    })
  }

  public eliminar = (idModelo: string) => {
    this.cargando = true;
    this.modelosService.eliminarModelo({id: idModelo}).subscribe({
      next: (respuesta: IRespuestaServicio) => {
        if (respuesta.estatus) {
          this.utilidadesService.abrirModalInfo(
            'Información',
            'Se ha eliminado el paquete con éxito',
            'Aceptar'
          );
        }
        this.cargando = false;
        this.consultaModelos();
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

  public modificarFiltroActivo = () => {
    this.filtroActivo = !this.filtroActivo;
    this.consultaModelos();
  }

  consultaModelos = () => {
    this.modelosService.consultaModelos({activo: this.filtroActivo})
    .subscribe({
      next: ( respuesta: IRespuestaServicio) => {
        if ( respuesta.estatus) {
          this.modelos = respuesta.data
        }
        this.cargando = false;
      },
      error: (err) => {
        this.cargando = false;
      },
    })
  }

}
