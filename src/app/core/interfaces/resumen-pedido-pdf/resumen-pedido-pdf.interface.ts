export class IResumenPedidoPdf {
  fecha?: string;
  vitrinaTaller?: string;
  usuarioNombreCliente?: string;
  cedulaCliente?: string;
  direccion?: string;
  numeroTelefono?: string;
  Linea?: string;
  placaVin?: string;
  yearModel?: string;
  kilometraje?: string;
  rutinas?: {
    descripcion?: string;
    referencia?: string;
    cant?: number;
    unidad?: any;
    total?: any;
  }[];
  subTotal?: number;
  iva?: number;
  totalGeneral?: number;
  concesionario?: string;
  asesorNombre?: string;
  cedulaAsesor?: number;
}
