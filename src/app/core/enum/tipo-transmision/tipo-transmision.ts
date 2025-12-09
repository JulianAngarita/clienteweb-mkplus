export enum TIPO_TRANSMISION {
    INTELIGENTE_MANUAL = 'IMT',
    DOBLE_EMBRAGUE = 'DCT',
    AUTOMATICA = 'AT',
    MECANICA = 'MT',
    APLICA_PARA_TODOS = 'APLICA PARA TODOS'
}

export const tipoTransmisionOpciones = [
    {value: TIPO_TRANSMISION.AUTOMATICA, text:	'Automatica', key: 1},
    {value: TIPO_TRANSMISION.MECANICA, text: 'Mecanica', key: 2},
    {value: TIPO_TRANSMISION.APLICA_PARA_TODOS, text: 'Aplica para todos', key: 3}
]