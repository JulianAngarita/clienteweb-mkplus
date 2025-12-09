import { Component, inject } from '@angular/core';
import IVehiculos, { IvehiculoSocase, vehiculoEI } from '../../../core/interfaces/vehiculos/vehiculos.interface';
import { CommonModule, Location } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingScreenComponent } from '../../../shared/components/loading-screen/loading-screen';
import { NgbDropdownModule, NgbModal, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Router, RouterModule } from '@angular/router';
import { IRespuestaServicio } from '../../../core/interfaces/general';
import { VehiculoService } from '../../../core/services/vehiculo/vehiculo';
import { Utilidades } from '../../../core/services/utilidades/utilidades';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalResultadoVines } from '../../../shared/modals/modal-resultado-vines/modal-resultado-vines';
import { CotizadorStoreService } from '../../../core/store/cotizador/cotizador-store';

@Component({
  selector: 'app-formulario-vehiculo',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    LoadingScreenComponent,
    NgbTooltipModule,
    NgbDropdownModule,
    RouterModule
  ],
  templateUrl: './formulario-vehiculo.html',
  styleUrl: './formulario-vehiculo.scss',
})
export class FormularioVehiculo {
  private vehiculoService = inject(VehiculoService);
  private location = inject(Location);
  private cotizadorStoreService =  inject(CotizadorStoreService);
  private router = inject(Router);
  private utilidades = inject(Utilidades);
  private modalService = inject(NgbModal);

  public cargando: boolean = false;
  public vehiculo: IVehiculos = vehiculoEI;

  ngOnInit() {
    if (this.cotizadorStoreService.vehiculo()._id) {
      this.vehiculo = this.cotizadorStoreService.vehiculo();
    }
  }

  public atras = () => {
    this.location.back();
  };

  modalSeleccionVin = async ( vines: Array<IvehiculoSocase> ) => {
    const instancia = this.modalService.open( ModalResultadoVines, {
      size: 'xl'
    });
    instancia.componentInstance.vines = vines;
    try {
        const data: IvehiculoSocase = await instancia.result
        this.vehiculo.vin = data.vin_completo;
        this.vehiculo.version = data.cod_version;
        this.vehiculo.descripcionVersion = data.des_version;
        this.vehiculo.placa = data.des_placa;
        if (this.vehiculo.modelo) {
          this.vehiculo.modelo.nombre = data.des_modelo_imp;
          this.vehiculo.modelo.codigo = data.cod_modelo_pos;
          this.vehiculo.modelo.origen = data.des_pais_origen;
          this.vehiculo.modelo.color = data.des_color;
          this.vehiculo.modelo.anoModelo = `${data.des_ano_modelo}`;
        }

    } catch (error) {
      
    }
  }
  
  public siguiente = () => {
    this.cotizadorStoreService.setVehiculo(this.vehiculo);
    this.router.navigate(['/tienda/resumen-pedido']);
  }

  consultaVehiculo = () => {
    this.cargando = true;
    this.vehiculoService.validarVehiculoVIN( this.vehiculo?.vin ? this.vehiculo.vin : ''  )
    .subscribe({
      next: ( respuesta: IRespuestaServicio ) => {
        
        if ( respuesta.estatus ) {
          this.modalSeleccionVin(respuesta.data.vehiculos);
        }
        this.cargando = false;
      },
      error: ( error: HttpErrorResponse ) => {
        this.cargando = false;
        this.utilidades.abrirModalInfo(
          'Consulta datos del vehículo',
          error.error.resultadoOperacion,
          'Entendido'
        )
      }
    })
  }
}
