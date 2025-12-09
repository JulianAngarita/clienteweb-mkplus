export enum TIPO_AIRE_ACONDICIONADO {
    AIRE_ACONDICIONADO = 'CON AIRE',
    SIN_AIRE_ACONDICIONADO = 'SIN AIRE',
    APLICA_PARA_TODOS = 'APLICA PARA TODOS'
}

export const tipoAireAcondicionadoOpciones = [	
    {value: TIPO_AIRE_ACONDICIONADO.SIN_AIRE_ACONDICIONADO, text:'Sin aire', key: 1},
    {value: TIPO_AIRE_ACONDICIONADO.AIRE_ACONDICIONADO, text:'Con aire', key: 2},
    {value: TIPO_AIRE_ACONDICIONADO.APLICA_PARA_TODOS, text: 'Aplica para todos', key: 3}
]