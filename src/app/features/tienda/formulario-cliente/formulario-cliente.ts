import { Component, inject } from '@angular/core';
import ICliente, { clienteEI, Identificacion, listadoIdentificacion } from '../../../core/interfaces/clientes/clientes.interface';
import { CommonModule, Location } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingScreenComponent } from '../../../shared/components/loading-screen/loading-screen';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Router, RouterModule } from '@angular/router';
import { CotizadorStoreService } from '../../../core/store/cotizador/cotizador-store';
import { ClienteService } from '../../../core/services/cliente/cliente';
import { IRespuestaServicio } from '../../../core/interfaces/general';
import { Utilidades } from '../../../core/services/utilidades/utilidades';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-formulario-cliente',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    LoadingScreenComponent,
    NgbDropdownModule,
    RouterModule
  ],
  templateUrl: './formulario-cliente.html',
  styleUrl: './formulario-cliente.scss',
})
export class FormularioCliente {
  private location = inject(Location);
  private cotizadorStore = inject(CotizadorStoreService);
  private clienteService = inject(ClienteService);
  private utilidadesService = inject(Utilidades);
  private router = inject(Router);

  public cargando: boolean = false;

  public cliente: ICliente = clienteEI;
  public listadoTipos: Array<any> = listadoIdentificacion

  ngOnInit() {
    if (this.cotizadorStore.cliente()._id) {
      this.cliente = this.cotizadorStore.cliente();
    }
  }

  public atras = () => {
    this.location.back();
  };

  public seleccionTipoId = ( tipo: Identificacion ) => {
    if(this.cliente.identificacion) this.cliente.identificacion.tipo = tipo;
  }

  guardarCliente() {
    this.crearActualizarCliente();
  }

  crearActualizarCliente = () => {
    this.cargando = true;
    this.clienteService.registrarCliente( this.cliente )
    .subscribe({
      next: ( respuesta: IRespuestaServicio ) => {
        this.cargando = false;
        if (respuesta.estatus) {
          this.cotizadorStore.setCliente( respuesta.data );
          this.router.navigate(['/tienda/formulario-envio'])
        } else {
          this.utilidadesService.abrirModalInfo(
            'Regitro cliente',
            respuesta.resultadoOperacion,
            'Entendido'
          )
        }
      },
      error: ( error: HttpErrorResponse ) => {
        this.cargando = false;
        this.utilidadesService.abrirModalInfo(
          'Regitro cliente',
          error.error.resultadoOperacion,
          'Entendido',
        )
      }
    })
  }
}
