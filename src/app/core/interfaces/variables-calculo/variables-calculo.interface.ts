export interface IVariableCalculo {
    _id?: string;
    nombre: string;
    descripcion: string;
    precedencia: number;
    valor: {
        numero: number;
        tipo: string;
    },
    creado?: string;
    actualizado?: string;
    activo: boolean;
    aplicaPara: string;
}

export const variableCalculoEI: IVariableCalculo = {
    nombre: "",
    descripcion: "",
    precedencia: 0,
    valor: {
        numero: 0,
        tipo: ""
    },
    activo: false,
    aplicaPara: ""
}