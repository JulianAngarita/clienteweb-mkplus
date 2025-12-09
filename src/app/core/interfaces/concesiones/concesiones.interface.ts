import { TIPO_DIRECCION } from "../../enum/tipo-direccion/tipo-direccion";

export interface Direccion {
    callePrincipal: TIPO_DIRECCION;
    calleSecundaria: string;
    numero: string;
    otros: string;
    barrio: string;
    ciudad: string;
}

export interface Telefonos {
    indicativoCiudad: string;
    numero: string;
}

export interface ManoObra {
    ordinaria: number;
    tmog: number;
}

export interface IConcesion {
    _id?: string,
    activo: boolean;
    cl: string;
    nombre: string;
    abreviatura: string;
    grupo: string;
    tipo: string;
    direccion: Direccion;
    telefonos: Telefonos;
    email: string;
    manoObra: ManoObra;
}

export const concesionEI: IConcesion = {
    activo: false,
    cl: "",
    nombre: "",
    abreviatura: "",
    grupo: "",
    tipo: "",
    direccion: {
        callePrincipal: TIPO_DIRECCION.AVENIDA,
        calleSecundaria: "",
        numero: "",
        otros: "",
        barrio: "",
        ciudad: ""
    },
    telefonos: {
        indicativoCiudad: "",
        numero: ""
    },
    email: "",
    manoObra: {
        ordinaria: 0,
        tmog: 0
    }
}

export interface IConsultarConcesionarios {
    nombre: string;
    abreviatura: string;
    grupo: string;
    tipo: string;
    cls: string[];
    activo: boolean;
    salto: number;
    limite: number;
}

export const filtroConcesionaros: IConsultarConcesionarios = {
  nombre: '',
  abreviatura: '',
  grupo: '',
  tipo: '',
  cls: [],
  activo: true,
  salto: 0,
  limite: 0
}
