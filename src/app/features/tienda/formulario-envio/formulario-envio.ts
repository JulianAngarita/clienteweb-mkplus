import { Component, inject } from '@angular/core';
import { LoadingScreenComponent } from '../../../shared/components/loading-screen/loading-screen';
import ICliente, { clienteEI, listadoTipoDireccion, TipoDireccion } from '../../../core/interfaces/clientes/clientes.interface';
import { CotizadorStoreService } from '../../../core/store/cotizador/cotizador-store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Router, RouterModule } from '@angular/router';
import { ClienteService } from '../../../core/services/cliente/cliente';
import { Utilidades } from '../../../core/services/utilidades/utilidades';
import { IRespuestaServicio } from '../../../core/interfaces/general';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-formulario-envio',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    LoadingScreenComponent,
    NgbDropdownModule,
    RouterModule
  ],
  templateUrl: './formulario-envio.html',
  styleUrl: './formulario-envio.scss',
})
export class FormularioEnvio {
  private location = inject(Location);
  private cotizadorStore = inject(CotizadorStoreService);
  private clienteService = inject(ClienteService);
  private utilidadesService = inject(Utilidades);
  private router = inject(Router);

  public cargando: boolean = false
  public cliente: ICliente = structuredClone(clienteEI);
  public listaTipoDireccion: Array<listadoTipoDireccion> = listadoTipoDireccion;

  ngOnInit() {
    if (this.cotizadorStore.cliente()._id) {
      this.cliente = this.cotizadorStore.cliente();
    }
  }

  public atras = () => {
    this.location.back();
  };

  constructor() {
    this.cliente = this.cotizadorStore.cliente();
  }

  seleccionTipoDireccion = ( tipo: TipoDireccion ) => {
    if( this.cliente.direccion ) this.cliente.direccion.callePrincipal = tipo;
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
          this.router.navigate(['/tienda/formulario-vehiculo'])
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
