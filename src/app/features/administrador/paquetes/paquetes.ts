import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoadingScreenComponent } from '../../../shared/components/loading-screen/loading-screen';
import { Utilidades } from '../../../core/services/utilidades/utilidades';
import { PaquetesService } from '../../../core/services/paquetes/paquetes';
import IPaquetes, { filtroPaquetesEI, IConsultaPaquetes } from '../../../core/interfaces/paquetes/paquetes.interface';
import { IRespuestaServicio } from '../../../core/interfaces/general';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalPaquete } from '../../../shared/modals/forms-modals/modal-paquete/modal-paquete';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-paquetes',
  imports: [
    FormsModule,
    CommonModule,
    LoadingScreenComponent,
    NgbModule,
    RouterModule
  ],
  templateUrl: './paquetes.html',
  styleUrl: './paquetes.scss',
})
export class Paquetes {

  private utilidadesService = inject(Utilidades);
  private paquetesService = inject(PaquetesService);
  private modalService = inject(NgbModal);

  public paquetes: IPaquetes[] = [];
  public total: number = 0;
  public pagina: number = 0;
  public cargando: boolean = false;
  public filtro: IConsultaPaquetes = structuredClone(filtroPaquetesEI);

  public consulta = () => {
    this.cargando = true;
    this.paquetesService.consultarPaquete(this.filtro).subscribe({
      next: (respuesta: IRespuestaServicio) => {
        this.cargando = false;
        if (respuesta.estatus) {
          this.paquetes = respuesta.data.paquetes;
          this.total = respuesta.data.total;
        } else {
          this.utilidadesService.abrirModalInfo(
            'Información',
            respuesta.resultadoOperacion,
            'Aceptar'
          );
        }
      }
    })
  }

  cambiarPagina = ( pagina: number ) => {
    this.filtro.salto = (pagina - 1) * this.filtro.limite;
    this.consulta();
  }

  public crear = async () => {
    const instancia = this.modalService.open(ModalPaquete, {
      centered: true
    });
    

    const result = await instancia.result;
    if (result) {
      this.consulta();
    }
  }

  public eliminar = (paquetes: IPaquetes) => {

  }
}
