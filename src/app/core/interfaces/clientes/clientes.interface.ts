
import {IUsuario} from "../usuarios/usuarios.interface";

export default interface ICliente {
    _id?: string;
    direccion: {
        callePrincipal: TipoDireccion;
        calleSecundaria: string;
        numero: string;
        otros: string;
        barrio: string;
        ciudad: string; 
        departamento: string;
    },
    email: string;
    identificacion: {
        numero: string;
        tipo: Identificacion
    },
    nombre: {
        nombres: string;
        apellidos: string;
    }
    telefonos: {
        celular: string;
        fijo: string;   
        otros: string;
    },
    creado?: string;
}

export interface IEliminar {
    id: string;
}

export interface IConsultaId {
    id: string;
}

export interface IConsulta {
    identificacion?: {
        numero?: string;
        tipo?: string;
    },
    nombre?: {
        nombres?: string;
        apellidos?: string;
    },
    usuario?: IUsuario
}

export const clienteEI: ICliente = {
    direccion: {
        callePrincipal: '',
        calleSecundaria: '',
        numero: '',
        otros: '',
        barrio: '',
        ciudad: '',
        departamento: ''
    },
    email: '',
    identificacion: {
        numero: '',
        tipo: 'CC',
    },
    nombre: {
        nombres: '',
        apellidos: '',
    },
    telefonos: {
        celular: '',
        fijo: '',
        otros: ''
    },
}

export type Identificacion = 'CC'|'CE'|'PS'|'LC'

export  const listadoIdentificacion = [
    {
        tipo: 'CC',
        nombre: 'Cédula de ciudadanía'
    },
    {
        tipo: 'CE',
        nombre: 'Cédula de extranjería'
    },
    {
        tipo: 'PS',
        nombre: 'Pasaporte'
    },
    {
        tipo: 'LC',
        nombre: 'Licencia'
    },
]

export type  TipoDireccion = 'AVENIDA' | 'CALLE' | 'CARRERA' | 'AVENIDA CARRERA' | 'AVENIDA CALLE' | 'DIAGONAL' | 'TRANSVERSAL' | '';

export interface listadoTipoDireccion {
    tipo: TipoDireccion;
    nombre: string;
}
export const listadoTipoDireccion: Array<listadoTipoDireccion> = [
    {
        tipo: 'AVENIDA',
        nombre: 'AV'
    },{
        tipo: 'AVENIDA CALLE',
        nombre: 'AC'
    },{
        tipo: 'AVENIDA CARRERA',
        nombre: 'AK'
    },{
        tipo: 'CALLE',
        nombre: 'CL'
    },{
        tipo: 'CARRERA',
        nombre: 'CR'
    },{
        tipo: 'DIAGONAL',
        nombre: 'DG'
    },{
        tipo: 'TRANSVERSAL',
        nombre: 'TV'
    }
]