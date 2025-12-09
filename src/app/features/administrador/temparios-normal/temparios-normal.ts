import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingScreenComponent } from '../../../shared/components/loading-screen/loading-screen';
import { filtroTemparioEI, ITempario } from '../../../core/interfaces/temparios/temparios.interface';
import { TemparioService } from '../../../core/services/tempario/tempario';
import { IRespuestaServicio } from '../../../core/interfaces/general';
import { HttpErrorResponse } from '@angular/common/http';
import { Utilidades } from '../../../core/services/utilidades/utilidades';
import { ModalTemparios } from '../../../shared/modals/forms-modals/modal-temparios/modal-temparios';

@Component({
  selector: 'app-temparios-normal',
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    LoadingScreenComponent,
    NgbDropdownModule,
  ],
  templateUrl: './temparios-normal.html',
  styleUrl: './temparios-normal.scss',
})
export class TempariosNormal {

  private temparioService = inject(TemparioService);
  private utilidadesService = inject(Utilidades);
  private modalService = inject(NgbModal);

  public filtro = Object.assign({}, filtroTemparioEI);
  public cargando: boolean = false;
  public total: number = 0;
  public pagina: number = 1;
  public temparios: ITempario[] = [];
  public cls: string[] = [];

  ngOnInit() {
    this.consultar();
  }

  cambiarPagina = (pagina: number) => {
    this.filtro.salto = (pagina - 1) * this.filtro.limite;
    this.consultar();
  }

  // CREAR
  public crear = async (): Promise<void> => {
    const instancia = this.modalService.open(ModalTemparios, {
      centered: true,
      size: 'xl'
    });

    instancia.componentInstance.evento = 'EVENTO_GUARDAR';

    const result = await instancia.result;
    if (result) {
      this.consultar();
    }
  }
  
  // ACTUALIZAR
  public actualizar = async (tempario: ITempario): Promise<void> => {
    const instancia = this.modalService.open(ModalTemparios, {
      centered: true,
      size: 'xl'
    })

    instancia.componentInstance.evento = 'EVENTO_ACTUALIZAR';
    instancia.componentInstance.datosTempario = tempario;

    const result = await instancia.result;
    if (result) {
      this.consultar();
    }
  }

  public eliminar = (tempario: string) => {
    this.cargando = true;
    this.temparioService.eliminarTempario({id: tempario }).subscribe({
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

  public eliminarTempario = (tempario: ITempario) => {
      this.utilidadesService.abrirModalConfirmacion(
        'Eliminar modelo',
        `Estas seguro que quieres eliminar el tempario ${tempario.nombre}?`,
        'Eliminar',
        'Cancelar'
      ).then((resultado) => {
        if (resultado) {
          this.eliminar(tempario._id ?? '');
        }
      })
    }

  public consultar = () => {
    this.cargando = true;

    if (typeof this.filtro.cl === 'string') {
      const valor = this.filtro.cl.trim();
      this.filtro.cl = valor ? [valor] : [];
    }

    this.temparioService.consultarTemparios(this.filtro).subscribe({
      next: (respuesta: IRespuestaServicio) => {
        if (respuesta.estatus) {
          this.temparios = respuesta.data.temparios;
          this.total = respuesta.data.total;
        }
        this.cargando = false;
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
}
