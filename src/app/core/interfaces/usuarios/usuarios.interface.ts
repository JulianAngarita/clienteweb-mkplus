export interface IUsuario {
    _id?: string;
    email: string;
    nombre: INombre,
    identificacion: {
        numero: string;
        tipo: string;
    },
    contrasena: string;
    concesiones: string[],
    activo: boolean;
    rol: RolUsuario;
    cargo: string;
    permisos: {
        lectura: boolean;
        escritura: boolean;
        eliminar: boolean;
    },
    creado?: string;
    grupo: string;
}

export const nombreEI: INombre = {
    nombres: "",
    apellidos: ""
}

export const usuarioEI: IUsuario = {
  email: "",
  nombre: Object.assign({}, nombreEI),
  identificacion: {
    numero: "",
    tipo: ""
  },
  contrasena: "",
  concesiones: [],
  activo: false,
  rol: "ADMINISTRADOR SISTEMA",
  cargo: "",
  permisos: {
    lectura: false,
    escritura: false,
    eliminar: false
  },
  grupo: ""
}

export interface IConsultarUsuario {
  email: string,
  nombre: INombre,
  identificacion: IIdentificacion,
  activo: boolean,
  salto: number,
  limite: number,
  concesiones: string[]
}

export const identificacionEI: IIdentificacion = {
    numero: ""
}
export const consultarUsuarioEI: IConsultarUsuario = {
    email: "",
    nombre: Object.assign({}, nombreEI),
    identificacion: identificacionEI,
    activo: true,
    salto: 0,
    limite: 10,
    concesiones: []
}



export interface INombre {
  nombres: string,
  apellidos: string
}

export interface IIdentificacion {
  numero: string
}

export type RolUsuario = 'ADMINISTRADOR SISTEMA' | 'IMPORTADORA' | 'ADMINISTRADOR CONCESIONARIO' | 'ASESOR'
