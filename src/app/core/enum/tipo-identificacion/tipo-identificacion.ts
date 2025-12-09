export enum TIPO_IDENTIFICACION {
    CEDULA_CIUDADANIA = 'CC',
    CEDULA_EXTRANJERIA= 'CE',
    PASAPORTE = 'PS',
    LICENCIA = 'LC'
}

export const tipoIdentificacionOpciones = [
    {value: '', text: 'Seleccione tipo ID'},
    {value: TIPO_IDENTIFICACION.CEDULA_CIUDADANIA, text: 'Cedula Ciudadania'},
    {value: TIPO_IDENTIFICACION.CEDULA_EXTRANJERIA, text: 'Cedula Extranjeria'},
    {value: TIPO_IDENTIFICACION.PASAPORTE, text: 'Pasaporte'},
    {value: TIPO_IDENTIFICACION.LICENCIA, text: 'Licencia'},
]