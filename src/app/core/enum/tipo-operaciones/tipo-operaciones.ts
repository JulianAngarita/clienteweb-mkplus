export enum TIPO_OPERACIONES {
    PREVENTIVO = 'Preventivo',
    CORRECTIVO ='Correctivo'
}

export const operacionesListado = [
    {
        value: TIPO_OPERACIONES.CORRECTIVO,
        text: TIPO_OPERACIONES.CORRECTIVO,
        key: 0
    },
    {
        value: TIPO_OPERACIONES.PREVENTIVO,
        text: TIPO_OPERACIONES.PREVENTIVO,
        key: 1
    },
]