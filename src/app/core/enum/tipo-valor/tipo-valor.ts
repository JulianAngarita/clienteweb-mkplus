
export enum TIPO_VALOR {
    PORCENTAJE = 'PORCENTAJE',
    FACTOR = 'FACTOR',
    NUMERICO = 'NUMERICO'
}

export const tipoValorOpciones = [
    {value: TIPO_VALOR.PORCENTAJE, text:'Porcentaje', key: 1},
    {value: TIPO_VALOR.FACTOR, text: 'Factor', key: 2},
    {value: TIPO_VALOR.NUMERICO, text: 'Numerico', key: 3}
]