import { Component, inject } from '@angular/core';
import { LoadingScreenComponent } from '../../../shared/components/loading-screen/loading-screen';
import { Utilidades } from '../../../core/services/utilidades/utilidades';
import { VersionesService } from '../../../core/services/versiones/versiones';
import IVersion from '../../../core/interfaces/versiones/versiones.interface';
import { IRespuestaServicio } from '../../../core/interfaces/general';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalVersiones } from '../../../shared/modals/forms-modals/modal-versiones/modal-versiones';

@Component({
  selector: 'app-versiones',
  imports: [
    LoadingScreenComponent,
    CommonModule,
    FormsModule,
    NgbModule
  ],
  templateUrl: './versiones.html',
  styleUrl: './versiones.scss',
})
export class Versiones {
  public colors: string[] = [
    'red',
    'orange',
    'yellow',
    'olive',
    'green',
    'teal',
    'blue',
    'violet',
    'purple',
    'pink',
    'brown',
    'grey',
    'black',
]

  public cargando: boolean = false;
  public filtroActivo: boolean = true;
  public versiones: IVersion[] = [];

  private utilidadesService = inject(Utilidades);
  private versionesService = inject(VersionesService);
  private modalService = inject(NgbModal);
  

  public eliminarVersion = async (version: IVersion) => {
    this.utilidadesService.abrirModalConfirmacion(
      'Eliminar versión',
      `Estas seguro que quieres eliminar esta versión?`,
      'Eliminar',
      'Cancelar'
    ).then((result) => {
      this.eliminar(version._id ?? '');
    })
  }

  public modificarFiltroActivo = () => {
    this.filtroActivo = !this.filtroActivo;
    this.consultar();
  }

  ngOnInit() {
    this.consultar();
  }

  public eliminar = (id: string) => {
    this.cargando = true;
    this.versionesService.eliminarVersion({id}).subscribe({
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

  public crear = async () => {
    const instancia = this.modalService.open(ModalVersiones, {
      centered: true,
      size: 'xl'
    });

    instancia.componentInstance.evento = 'EVENTO_GUARDAR';

    const result = await instancia.result;
    if (result) {
      this.consultar();
    }
  }

  public actualizar = async (version: IVersion) => {
    const instancia = this.modalService.open(ModalVersiones, {
      centered: true,
      size: 'xl'
    });

    instancia.componentInstance.evento = 'EVENTO_ACTUALIZAR';
    instancia.componentInstance.datosVersion = version;

    const result = await instancia.result;
    if (result) {
      this.consultar();
    }
  }
  
  public consultar = () => {
    this.cargando = true;
    this.versionesService.consultarVersiones({activo: this.filtroActivo}).subscribe({
      next: (respuesta: IRespuestaServicio) => {
        this.cargando = false;
        if (respuesta.estatus) {
          this.versiones = respuesta.data.versiones;
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

}
