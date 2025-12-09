import { IUsuario } from "../usuarios/usuarios.interface";

export default interface IModelo {
    activo: boolean;
    _id?: string;
    vin: string;
    versiones: IVersiones[]
    modelo: {
        codigo: string;
        nombre: string;
        origen: string[];
        color: string;
        anoModelo: string;
    },
    imagenes: {
        primera: IImagen,
        segunda: IImagen,
        tercera: IImagen,
        cuarta: IImagen,
    },
    factorAjusteManoObra: number;
    creado?: string;
    actualizado?: string;
    usuario?: IUsuario
}

export const versionEI: IVersiones = {
    codigo: "",
    descripcion: "",
    caracteristicas: undefined
}

export const modeloEI: IModelo = {
    versiones: [],
    imagenes: {
        primera: {
            url: "",
            tamano: "",
            relacionAspecto: "",
            extension: "",
            nombre: ""
        },
        segunda: {
            url: "",
            tamano: "",
            relacionAspecto: "",
            extension: "",
            nombre: ""
        },
        tercera: {
            url: "",
            tamano: "",
            relacionAspecto: "",
            extension: "",
            nombre: ""
        },
        cuarta: {
            url: "",
            tamano: "",
            relacionAspecto: "",
            extension: "",
            nombre: ""
        }
    },
    activo: false,
    vin: "",
    modelo: {
        codigo: "",
        nombre: "",
        origen: [],
        color: "",
        anoModelo: ""
    },
    factorAjusteManoObra: 0,
}

export interface IImagen {
    url: string;
    tamano: string;
    relacionAspecto: string;
    extension: string;
    nombre: string;
}

export interface IVersiones {
    codigo: string;
    descripcion: string;
    caracteristicas: any;
}

export interface IEliminar {
    id: string;
    usuario: IUsuario
}

export interface IConsultaId {
    id: string;
    usuario: IUsuario
}

export interface IConsulta {
    activo: boolean
    usuario: IUsuario
}

export interface IFrecuenciaKilometraje {
  _id: string;
  uuid: string;
  frecKm: number;
  frecService: string;
  frecMonth: number;
}

export const kilometrajeEI: IFrecuenciaKilometraje = {
    _id: "",
    uuid: "",
    frecKm: 0,
    frecService: "",
    frecMonth: 0
}