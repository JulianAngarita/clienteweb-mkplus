
import { IConsulta } from "../modelos/modelos.interface";
import IServicio from "../servicios/servicios.interface";
import { IUsuario } from "../usuarios/usuarios.interface";



export default interface IPaquetes {
    _id?: string;
    codigoPaquete: string;
    modelo: {
        codigo: string;
        descripcion: string;
        version: string;
    },
    nombre: string;
    descripcion: string;
    valorPresente: number;   
    valorFuturo: number;
    creado?: string;
    actualizado?: string;
    activo: boolean;
    servicios: string[];
    detallesServicios: IServicio[]
    tipoPaquete: string;
    condiciones: {
        estatus: boolean
        vin: string[];
        versiones: string[];
        fechaInicio: string;
        fechaFinal: string;
    },
    estatus: IEstatus;
    consolidadoEstatus: IEstatus[];
    precios: {
        prepagado: {
            insumos: number;
            manoObra: number;
            repuestos: number;
            iva: number;
            total: number;
            valorFuturo: number;
            iva_futuro: number;
            insumo_futuro: number;
            repuesto_futuro: number;
            manoObra_futuro: number;
            ivaComision: number;
            comision: number;
            ivaComision_futuro: number;
            comision_futuro: number;
        },
        ordinario: {
            insumos: number;
            manoObra: number;
            repuestos: number;
            iva: number;
            total: number;
            valorFuturo: number;
            iva_futuro: number;
            insumo_futuro: number;
            repuesto_futuro: number;
            manoObra_futuro: number;
            ivaComision: number;
            comision: number;
            ivaComision_futuro: number;
            comision_futuro: number;
        }
    }
}

export interface IPreciosPaquetes {
    prepagado: {
        insumos: number;
        iva: number;
        repuestos: number;
        manoObra: number;
        total: number;

        valorFuturo: number;
        iva_futuro: number;
        insumo_futuro: number;
        repuesto_futuro: number;
        manoObra_futuro: number;

        ivaComision: number;
        comision: number;

        ivaComision_futuro: number;
        comision_futuro: number;
    },
    ordinario: {
        insumos: number;
        iva: number;
        repuestos: number;
        manoObra: number;
        total: number;
        valorFuturo: number;
        iva_futuro: number;
        insumo_futuro: number;
        repuesto_futuro: number;
        manoObra_futuro: number;

        ivaComision: number;
        comision: number;

        ivaComision_futuro: number;
        comision_futuro: number;
    }
}

export const preciosPaquetesEI: IPreciosPaquetes = {
    prepagado: {
        insumos: 0,
        iva: 0,
        repuestos: 0,
        manoObra: 0,
        total: 0,

        valorFuturo: 0,
        iva_futuro: 0,
        insumo_futuro: 0,
        repuesto_futuro: 0,
        manoObra_futuro: 0,

        ivaComision: 0,
        comision: 0,

        ivaComision_futuro: 0,
        comision_futuro: 0,
    },
    ordinario: {
        insumos:0,
        iva: 0,
        repuestos: 0,
        manoObra: 0,
        total: 0,
        valorFuturo: 0,
        iva_futuro:0,
        insumo_futuro: 0,
        repuesto_futuro: 0,
        manoObra_futuro: 0,

        ivaComision: 0,
        comision: 0,

        ivaComision_futuro: 0,
        comision_futuro: 0
    }
}

export interface IEstatus {
    nombre: string;
    fecha: string;
}

export interface IConsultaPaquetes {
    codigoPaquete: string;
    modelo: {
        codigo: string;
        descripcion: string;
        version: string;
    },
    nombre: string;
    descripcion: string;
    salto: number;
    limite: number;
    activo: boolean;
}

export const filtroPaquetesEI: IConsultaPaquetes = {
    codigoPaquete: "",
    modelo: {
        codigo: "",
        descripcion: "",
        version: ""
    },
    nombre: "",
    descripcion: "",
    salto: 0,
    limite: 15,
    activo: true
}

export interface IConsultaPorVersion {
    version: string;
}

export interface IRutinas {
    kilometraje: number;
    rutina: number;
    meses: number;
}

export const paqueteEI: IPaquetes = {
    codigoPaquete: "",
    modelo: {
        codigo: "",
        descripcion: "",
        version: ""
    },
    nombre: "",
    descripcion: "",
    valorPresente: 0,
    valorFuturo: 0,
    activo: false,
    servicios: [],
    detallesServicios: [],
    tipoPaquete: "",
    condiciones: {
        estatus: false,
        vin: [],
        versiones: [],
        fechaInicio: "",
        fechaFinal: ""
    },
    estatus: {
        nombre: "",
        fecha: ""
    },
    consolidadoEstatus: [],
    precios: {
        prepagado: {
            insumos: 0,
            manoObra: 0,
            repuestos: 0,
            iva: 0,
            total: 0,
            valorFuturo: 0,
            iva_futuro: 0,
            insumo_futuro: 0,
            repuesto_futuro: 0,
            manoObra_futuro: 0,
            ivaComision: 0,
            comision: 0,
            ivaComision_futuro: 0,
            comision_futuro: 0
        },
        ordinario: {
            insumos: 0,
            manoObra: 0,
            repuestos: 0,
            iva: 0,
            total: 0,
            valorFuturo: 0,
            iva_futuro: 0,
            insumo_futuro: 0,
            repuesto_futuro: 0,
            manoObra_futuro: 0,
            ivaComision: 0,
            comision: 0,
            ivaComision_futuro: 0,
            comision_futuro: 0
        }
    }
}