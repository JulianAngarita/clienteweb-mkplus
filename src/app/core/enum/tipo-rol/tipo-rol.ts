export enum TIPO_ROL {
  ADMINISTRADOR_SISTEMA = 'ADMINISTRADOR SISTEMA',
  IMPORTADORA = 'IMPORTADORA',
  ADMINISTRADOR_CONCESIONARIO = 'ADMINISTRADOR CONCESIONARIO',
  ASESOR = 'ASESOR'
}
const rolUsuario = localStorage.getItem('rol')
export let tipoRolesOpciones: {value: string, text: string}[] = []

if (rolUsuario !== TIPO_ROL.ADMINISTRADOR_CONCESIONARIO) {
    tipoRolesOpciones = [
        { value: '', text: 'Seleccione un rol'},
        { value: TIPO_ROL.ADMINISTRADOR_CONCESIONARIO, text: 'Administrador Concesionario'},
        { value: TIPO_ROL.ADMINISTRADOR_SISTEMA, text: 'Administrador Sistema'},
        { value: TIPO_ROL.ASESOR, text: 'Asesor'},
        { value: TIPO_ROL.IMPORTADORA, text: 'Importadora'}
    ]
} else {
    tipoRolesOpciones = [
        { value: '', text: 'Seleccione un rol'},
        { value: TIPO_ROL.ASESOR, text: 'Asesor'}
    ]
}

