export interface ITempario {
  _id?: string;
  cl: string;
  codigoModelo: string;
  nombre: string;
  insumos: number;
  manoObra: number;
  rutinaMantenimiento: {
    kilometros: number;
    horas: number;
  };
  creado?: string | Date;
  actualizado?: string | Date;
}

export interface IConsultaTempario {
    cl: string | string[];
    codigoModelo: string;
    nombre: string,
    salto: number,
    limite: number
}

export const temparioEI: ITempario = {
    cl: "",
    codigoModelo: "",
    nombre: "",
    insumos: 0,
    manoObra: 0,
    rutinaMantenimiento: {
        kilometros: 0,
        horas: 0
    },
}

export const filtroTemparioEI: IConsultaTempario = {
    cl: '',
    codigoModelo: "",
    nombre: "",
    salto: 0,
    limite: 10
}