import { IUsuario } from "../usuarios/usuarios.interface";

export default interface IRepuestos {
    _id?: string;
    modelo: string;
    pnc: string;
    referencia: string;
    descripcion: string;
    creado?: string;
    actualizado?: string;
    iva: boolean;
    activo: boolean;
    caracteristicas: {
        tipoCombustible: string;
        aireAcondicionado: string;
        transmision: string;
        cilindrada: number;
    },
    precioVenta: {
        publico: number;
        concesionario: number;
    },
    margen: {
        precioVentaConcesionario: string;
        precioVentaPublico: string;
    },
    precioAnterior: {
        publico: number;
        concesionario: number;
        fecha: string;
    },
    cantidad?: number;
}

export interface IEliminar {
    id: string;
}

export interface IConsultaRepuestos {
    activo: boolean;
    descripcion: string;
    limite: number;
    modelo: string;
    pnc: string;
    referencia: string;
    salto: number;
}

export interface IModalConsulta {
    referencia: string;
    modelo: string;
    pnc: string;
    descripcion: string;
    caracteristicas: {
        tipoCombustible: string;
        aireAcondicionado: string;
        transmision: string;
        cilindrada: number;
    },
    salto: number;
    limite: number;
}

export const repuestoEI: IRepuestos = {
    modelo: "",
    pnc: "",
    referencia: "",
    descripcion: "",
    iva: false,
    activo: false,
    caracteristicas: {
        tipoCombustible: "",
        aireAcondicionado: "",
        transmision: "",
        cilindrada: 0
    },
    precioVenta: {
        publico: 0,
        concesionario: 0
    },
    margen: {
        precioVentaConcesionario: "",
        precioVentaPublico: ""
    },
    precioAnterior: {
        publico: 0,
        concesionario: 0,
        fecha: ""
    },
}

export const filtroRepuestosEI: IConsultaRepuestos = {
    activo: true,
    descripcion: "",
    limite: 10,
    modelo: "",
    pnc: "",
    referencia: "",
    salto: 0
}