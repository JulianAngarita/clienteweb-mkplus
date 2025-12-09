import { TIPO_ESTADO_SOLICITUDES } from '../../enum/tipo-estado-paquete/tipo-estado-paquete';
import IOperaciones from '../operaciones/operaciones.interface';
import { IEstatus } from '../paquetes/paquetes.interface';
import {IUsuario} from '../usuarios/usuarios.interface';

export default interface IServicio {
    activo: boolean;
    _id?: string;
    modelo: {
        codigo: string;
        descripcion: string;
        version: string[];
    }
    nombre: string;
    descripcion: string;
    tipo: string;
    cantidad: number;
    frecuencia: {
        kilometraje: number;
        meses: number;
    }
    vigencia: {
        autorizadoPorImportadora: boolean;
        kilometraje: number;
        meses: number;
    }
    operaciones: string[];
    detalleOperaciones: IOperaciones[];
    preciosRepuestos: {
        publico: number
        concesionario: number
        descuento: number
        publicoDespuesDescuento: number
        concesionarioDespuesDescuento: number
    }
    preciosManoObra: {
        horas: number;
        valorHoras: number;
        valorHorasDespuesFactor: number
    }
    referencias?: IReferencia[]
    tarifaManoObraUnificada: boolean;
    redencion: {
        estatus?: boolean;
        nombres: {
            nombres: string;
            apellidos: string;
        }
        identificacion: {
            tipo: string;
            numero: string;
        }
        linkInspeccion: string;
        usuarioQueRedime: {
            nombreCompleto: string;
            identificacion: string;
            email: string;
        }
        concesionario: {
            tarifaManoObra: string;
            nombre: string;
            grupo: string;
            cl: string;
        }
        fechaRedencion: string;
        kilometrajeActual: string;
        numeroOrdenTrabajo: string;
        fechaEntregaVehiculo: string;
        alertarImportadora: boolean;
        comentarios?: string;
    },
    precios: {
        prepagado: {
            insumos: number;
            manoObra: number;
            repuestos: number;
            iva: number;
            total: number;
            comision: number;
            ivaComision: number;
            valoresFuturos: IValoresFuturos[]
        },
        ordinario: {
            insumos: number;
            manoObra: number;
            repuestos: number;
            iva: number;
            total: number;
            comision: number;
            ivaComision: number;
            valoresFuturos: IValoresFuturos[]
        }
    },
    estatus: IEstatus;
    consolidadoEstatus: IEstatus[];
}

export interface IReferencia {
    referencia: string;
    cantidad: string;
    valorUnidad: number;
    valorTotal: number;
}

export interface IValoresFuturos {
    index: number;
    valor: number;
    iva: number;
    insumos: number;
    manoObra: number;
    repuestos: number;
    mesesEstimadosRedencion: number;
    comision: number;
    ivaComision: number;
}

export const servicioEI: IServicio = {
    activo: false,
    modelo: {
        codigo: '',
        descripcion: '',
        version: []
    },
    nombre: '',
    descripcion: '',
    tipo: '',
    cantidad: 0,
    frecuencia: {
        kilometraje: 0,
        meses: 0
    },
    vigencia: {
        autorizadoPorImportadora: false,
        kilometraje: 0,
        meses: 0
    },
    operaciones: [],
    detalleOperaciones: [],
    preciosRepuestos: {
        publico: 0,
        concesionario: 0,
        descuento: 0,
        publicoDespuesDescuento: 0,
        concesionarioDespuesDescuento: 0
    },
    preciosManoObra: {
        horas: 0,
        valorHoras: 0,
        valorHorasDespuesFactor: 0
    },
    tarifaManoObraUnificada: false,
    redencion: {
        nombres: {
            nombres: '',
            apellidos: ''
        },
        identificacion: {
            tipo: '',
            numero: ''
        },
        linkInspeccion: '',
        usuarioQueRedime: {
            nombreCompleto: '',
            identificacion: '',
            email: ''
        },
        concesionario: {
            tarifaManoObra: '',
            nombre: '',
            grupo: '',
            cl: ''
        },
        fechaRedencion: '',
        kilometrajeActual: '',
        numeroOrdenTrabajo: '',
        fechaEntregaVehiculo: '',
        alertarImportadora: false,
    },
    precios: {
        prepagado: {
            insumos: 0,
            manoObra: 0,
            repuestos: 0,
            iva: 0,
            total: 0,
            comision: 0,
            ivaComision: 0,
            valoresFuturos: []
        },
        ordinario: {
            insumos: 0,
            manoObra: 0,
            repuestos: 0,
            iva: 0,
            total: 0,
            comision: 0,
            ivaComision: 0,
            valoresFuturos: []
        }
    },
    estatus: {
        nombre: TIPO_ESTADO_SOLICITUDES.CREADO,
        fecha: ''
    },
    consolidadoEstatus: []
}

export interface IEliminar {
    id: string;
}

export interface IConsultaId {
    id: string;
}

export interface IConsultaServicio {
    activo: boolean;
    modelo: {
        codigo: string;
        version: string;
    }
    nombre: string;
    descripcion: string;
    tipo: string;
    salto: number;
    limite: number;
}

export const filtroServiciosEI: IConsultaServicio = {
    activo: true,
    modelo: {
        codigo: '',
        version: ''
    },
    nombre: '',
    descripcion: '',
    tipo: '',
    salto: 0,
    limite: 10
}

export interface IServicioPopulado {
    activo?: boolean;
    _id?: string;
    modelo?: {
        codigo?: string;
        descripcion?: string;
        version?: string[];
    }
    nombre?: string;
    descripcion?: string;
    tipo?: string;
    cantidad?: number;
    frecuencia?: {
        kilometraje?: number;
        meses?: number;
    }
    vigencia?: {
        autorizadoPorImportadora?: boolean;
        kilometraje?: number;
        meses?: number;
    }
    operaciones?: IOperaciones[];
    detalleOperaciones?: any[];
    preciosRepuestos?: {
        publico?: number
        concesionario?: number
        descuento?: number
        publicoDespuesDescuento?: number
        concesionarioDespuesDescuento?: number
    }
    preciosManoObra?: {
        horas?: number;
        valorHoras?: number;
        valorHorasDespuesFactor?: number
    }
    referencias?: [{
        referencia?: string;
        cantidad?: string;
        valorUnidad?: number;
        valorTotal?: number;
    }]
    tarifaManoObraUnificada?: boolean;
    redencion?: {
        estatus?: boolean;
        nombres?: {
            nombres?: string;
            apellidos?: string;
        }
        identificacion?: {
            tipo?: string;
            numero?: string;
        }
        linkInspeccion?: string;
        usuarioQueRedime?: {
            nombreCompleto?: string;
            identificacion?: string;
            email?: string;
        }
        concesionario?: {
            tarifaManoObra?: number;
            nombre?: string;
            grupo?: string;
            cl?: string;
        }
        fechaRedencion?: string;
        kilometrajeActual?: number;
        numeroOrdenTrabajo?: string;
        fechaEntregaVehiculo?: string;
        alertarImportadora?: boolean;
        comentarios?: string;
    },
    precios?: {
        prepagado?: {
            insumos?: number;
            manoObra?: number;
            repuestos?: number;
            iva?: number;
            total?: number;
            comision?: number;
            ivaComision?: number;
            valoresFuturos?: IValoresFuturos[]
        },
        ordinario?: {
            insumos?: number;
            manoObra?: number;
            repuestos?: number;
            iva?: number;
            total?: number;
            comision?: number;
            ivaComision?: number;
            valoresFuturos?: IValoresFuturos[]
        }
    },
    estatus?: IEstatus;
    consolidadoEstatus?: IEstatus[];
    usuario?: IUsuario
}