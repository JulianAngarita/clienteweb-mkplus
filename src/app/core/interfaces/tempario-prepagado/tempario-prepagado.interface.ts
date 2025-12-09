export interface IPrepagado {
    _id?: string;
    rutina: number;
    descuentos: {
        repuestosImportadora: number;
        repuestosConcesionario: number;
        totalDescuento: number;
    },
    hora: number;
}

export const temparioPrepagadoEI: IPrepagado = {
    rutina: 0,
    descuentos: {
        repuestosImportadora: 0,
        repuestosConcesionario: 0,
        totalDescuento: 0
    },
    hora: 0
}