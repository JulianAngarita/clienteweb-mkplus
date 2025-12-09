export enum TIPO_SOPORTE {
    FORMULARIO = 'FORMULARIO',
    FACTURA_VEHICULO = 'FACTURA VEHICULO',
    COMPROBANTE_PAGO_PLAN = 'COMPROBANTE',
    ACUERDO = 'ACUERDO',
    SOPORTE_REDENCION = 'SOPORTE REDENCION',
    OTROS = 'OTROS'
}

export const soporteLista = [
    {value: TIPO_SOPORTE.ACUERDO, text: 'Acuerdo', key: 1},
    {value: TIPO_SOPORTE.COMPROBANTE_PAGO_PLAN, text: 'Comprobante de Pago del Plan', key: 2},
]