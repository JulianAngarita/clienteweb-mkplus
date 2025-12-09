export enum TIPO_COMBUSTIBLE {
    GASOLINA = 'G',
    HIBRIDO_GASOLINA = 'H',
    DIESEL = 'D',
    ELECTRICO = 'E',
    HIBRIDO_DIESEL = 'HD',
    APLICA_PARA_TODOS = 'APLICA PARA TODOS'
}

export const tipoCombustibleOpciones = [
    { value: TIPO_COMBUSTIBLE.GASOLINA, text: 'Gasolina', key: 1 },
    { value: TIPO_COMBUSTIBLE.HIBRIDO_GASOLINA, text: 'Hibrido', key: 2 },
    { value: TIPO_COMBUSTIBLE.DIESEL, text: 'Diesel', key: 3 },
    { value: TIPO_COMBUSTIBLE.ELECTRICO, text: 'Electrico', key: 4 },
    { value: TIPO_COMBUSTIBLE.HIBRIDO_DIESEL, text: 'Hibrido Diesel', key: 5 },
    { value: TIPO_COMBUSTIBLE.APLICA_PARA_TODOS, text: 'Aplica para todos', key: 6 }
]