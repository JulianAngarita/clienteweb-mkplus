export enum TIPO_ESTADO_SOLICITUDES {
    CREADO = 'CREADO',
    PAGADO = 'PAGADO',
    VALIDADO = 'VALIDADO',
    ACTIVO = 'ACTIVO',
    SUSPENDIDO = 'SUSPENDIDO',
    DEVOLUCION = 'DEVOLUCION',
    CONSUMIDO = 'CONSUMIDO'
}

export const estadoSolicitudesListaOpciones = [
    {value: 'TODOS', text: 'Todos', key: 0},
    {value: TIPO_ESTADO_SOLICITUDES.ACTIVO, text: 'Activo', key: 1},
    {value: TIPO_ESTADO_SOLICITUDES.CONSUMIDO, text: 'Consumido', key: 2},
    {value: TIPO_ESTADO_SOLICITUDES.CREADO, text: 'Creado', key: 3},
    {value: TIPO_ESTADO_SOLICITUDES.DEVOLUCION, text: 'Devolucion', key: 4},
    {value: TIPO_ESTADO_SOLICITUDES.PAGADO, text: 'Pagado', key: 5},
    {value: TIPO_ESTADO_SOLICITUDES.SUSPENDIDO, text: 'Suspendido', key: 6},
    {value: TIPO_ESTADO_SOLICITUDES.VALIDADO, text: 'Validado', key: 7}
]

export const paqueteActivoOpciones = [
    { value: true, text: 'Activo', key: 1 },
    { value: false, text: 'Inactivo', key: 2 }
]