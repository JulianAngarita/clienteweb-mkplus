export interface IRespuestaServicio {
    estatus: boolean;
    resultadoOperacion: string;
    data?: any;
    error?: any;
    token?: string;
    usuario?: any
}