export interface IServicioRedencion {
  _id: string;
  idServicio: string;
  solicitud: ISolicitud;
  concesionario: IConcesionario;
  modelo: IModelo;
  servicio: string;
  descripcion: string;
  frecuencia_kilometraje: number;
  frecuencia_meses: number;
  vigencia_meses: number;
  vigencia_kilometraje: number;
  autorizadoPorImportadora: boolean;

  precios_insumos: number;
  precios_repuestos: number;
  precios_mano_obra: number;
  precios_iva: number;
  precios_comision: number;
  precios_iva_comision: number;
  precios_valor_total: number;

  estatus: IEstatus;
  vencimiento: string;
  proximoAVencer: string;
  redencion_estatus: string;
  redencion_fecha: string;

  detallesOperaciones: IDetalleOperacion[];
}

/* -------------------- SUBINTERFACES -------------------- */

export interface ISolicitud {
  concesionario: string;
  numero: string;
  vin: string;
  transaccion: string;
  placa: string;
}

export interface IConcesionario {
  cl: string;
  nombre: string;
  grupo: string;
}

export interface IModelo {
  codigo: string;
  descripcion: string;
  version: string;
}

export interface IEstatus {
  nombre: string;
  fecha: string; // ISO string
}

export interface IDetalleOperacion {
  _id: string;
  aplicaPara: IAplicaPara;
  activo: boolean;
  codigo: string;
  nombre: string;
  horas: number;
  repuestos: IRepuesto[];
  __v: number;
  repuestosActualizados: IRepuestoActualizado[];
}

export interface IAplicaPara {
  cilindrada: number;
  aireAcondicionado: string;
  tipoCombustible: string;
  transmision: string;
}

/* -------------------- REPUESTOS -------------------- */

export interface IRepuesto {
  precioVenta: IPrecioVenta;
  margen: IMargen;
  referencia: string;
  cantidad: number;
  pnc: string;
  _id: string;
}

export interface IRepuestoActualizado {
  _id: string;
  caracteristicas: IAplicaPara;
  precioVenta: IPrecioVenta;
  margen: IMargen;
  precioAnterior: IPrecioAnterior;
  modelo: string;
  pnc: string;
  referencia: string;
  descripcion: string;
  creado: string | null;
  actualizado: string;
  activo: boolean;
  iva: boolean;
  __v: number;
}

export interface IPrecioVenta {
  publico: number;
  concesionario: number;
}

export interface IMargen {
  precioVentaConcesionario: string;
  precioVentaPublico: string;
}

export interface IPrecioAnterior {
  publico: number;
  concesionario: number;
  fecha: string;
}
