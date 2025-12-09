import { IUsuario } from '../usuarios/usuarios.interface';
import IRepuesto from '../repuestos/repuestos.interface';

export default interface IOperaciones {
    _id?: string;
    codigo: string;
    activo: boolean;
    nombre: string;
    horas: number;
    aplicaPara: {
        aireAcondicionado: string,
        cilindrada: number,
        tipoCombustible: string,
        transmision: string
    },
    repuestos: IRepuestosOperaciones[];
    repuestosActualizados: IRepuestosOperaciones[];
}

export interface IRepuestosOperaciones {
    _id?: string;
    referencia: string,
    pnc: string,
    cantidad: number,
    precioVenta: {
        publico: number,
        concesionario: number
    },
    margen: {
        precioVentaConcesionario: string,
        precioVentaPublico: string
    }
}

export const operacionEI: IOperaciones = {
    codigo: '',
    nombre: '',
    horas: 0,
    aplicaPara: {
        aireAcondicionado: '',
        cilindrada: 0,
        tipoCombustible: '',
        transmision: ''
    },
    repuestos: [],
    repuestosActualizados: [],
    activo: false
}

export interface IConsultaOperaciones {
    activo: boolean;
    codigo: string;
    nombre: string;
    aplicaPara: {
        aireAcondicionado: string;
        cilindrada: number;
        tipoCombustible: string;
        transmision: string;
    },
    salto: number;
    limite: number;
}

export const filtroOperacionesEI: IConsultaOperaciones = {
    activo: true,
    codigo: '',
    nombre: '',
    aplicaPara: {
        aireAcondicionado: '',
        cilindrada: 0,
        tipoCombustible: '',
        transmision: ''
    },
    salto: 0,
    limite: 10
}