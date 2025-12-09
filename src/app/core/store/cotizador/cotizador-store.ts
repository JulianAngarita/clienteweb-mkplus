import { Injectable, signal, computed, effect } from '@angular/core';
import IModelo, { IVersiones, modeloEI } from '../../interfaces/modelos/modelos.interface';
import { IPreciosPaquetes, IRutinas, preciosPaquetesEI } from '../../interfaces/paquetes/paquetes.interface';
import { IServicioPopulado } from '../../interfaces/servicios/servicios.interface';
import ICliente, { clienteEI } from '../../interfaces/clientes/clientes.interface';
import IVehiculos, { vehiculoEI } from '../../interfaces/vehiculos/vehiculos.interface';
import IVersion, { versionEI } from '../../interfaces/versiones/versiones.interface';

export interface VehiculoSeleccionado {
  modelo: string;
  version: IVersion;
  detalleModelo: IModelo;
}

@Injectable({ providedIn: 'root' })

export class CotizadorStoreService {

  // --- STATE SIGNALS ---
  vehiculoSeleccionado = signal<VehiculoSeleccionado>({
    modelo: '',
    version: { ...versionEI },
    detalleModelo: { ...modeloEI },
  });

  cliente = signal<ICliente>({ ...clienteEI });
  vehiculo = signal<IVehiculos>({ ...vehiculoEI });
  rutinas = signal<IRutinas[]>([]);
  servicios = signal<IServicioPopulado[]>([]);
  valoresPaquete = signal<IPreciosPaquetes>({ ...preciosPaquetesEI});

  hayServicios = computed(() => this.servicios().length > 0);
  hayCliente = computed(() => !!this.cliente().identificacion?.numero);

  setVehiculoSeleccionado(value: VehiculoSeleccionado) {
    this.vehiculoSeleccionado.set(value);
  }

  setCliente(value: ICliente) {
    this.cliente.set(value);
  }

  setVehiculo(value: IVehiculos) {
    this.vehiculo.set(value);
  }

  setRutinas(value: IRutinas[]) {
    this.rutinas.set(value);
  }

  setServicios(value: IServicioPopulado[]) {
    this.servicios.set(value);
  }

  setValoresPaquete(value: IPreciosPaquetes) {
    this.valoresPaquete.set(value);
  }
}
