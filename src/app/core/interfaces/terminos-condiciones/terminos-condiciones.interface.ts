export interface Articulo {
    titulo: string;
    subtitulo: string;
    contenido: string;
}

export interface ITerminosCondiciones {
    _id?: string,
    activo: boolean;
    creado?: Date | string;
    version: string;
    vigencia: string;
    titulo: string;
    subtitulo: string;
    articulos: Articulo[];
}

export const terminosCondicionesEI: ITerminosCondiciones = {
    activo: false,
    version: "",
    vigencia: "",
    titulo: "",
    subtitulo: "",
    articulos: []
}

export const articuloEI: Articulo = {
    titulo: "",
    subtitulo: "",
    contenido: ""
}

export interface IConsultarTerminos {
    activo: boolean
}

export const consultarTerminosEI: IConsultarTerminos = {
    activo: true
}