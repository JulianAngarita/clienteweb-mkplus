export enum TIPO_DIRECCION {
    AVENIDA = 'AVENIDA',
    AVENIDA_CALLE = 'AVENIDA CALLE',
    AVENIDA_CARRERA = 'AVENIDA CARRERA',
    CALLE = 'CALLE',
    CARRERA = 'CARRERA',
    DIAGONAL = 'DIAGONAL',
    TRANSVERSAL = 'TRANSVERSAL'
}

export const tipoCallePrincipal = [
    {value: TIPO_DIRECCION.AVENIDA, text: 'Avenida', key: 1},
    {value: TIPO_DIRECCION.CALLE, text: 'Calle', key: 2},
    {value: TIPO_DIRECCION.CARRERA, text: 'Carrera', key: 3},
    {value: TIPO_DIRECCION.AVENIDA_CARRERA, text: 'Avenida carrera', key: 4},
    {value: TIPO_DIRECCION.AVENIDA_CALLE, text: 'Avenida calle', key: 5},
    {value: TIPO_DIRECCION.DIAGONAL, text: 'Diagonal', key: 6},
    {value: TIPO_DIRECCION.TRANSVERSAL, text: 'Transversal', key: 7},
]