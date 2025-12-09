import { IUsuario } from '../usuarios/usuarios.interface';

export default interface IVehiculos {
    _id?: string;
    vin: string;
    version: string;
    descripcionVersion: string;
    modelo: {
        codigo: string;
        nombre: string;
        origen: string;
        color: string;
        anoModelo: string;
    },
    placa: string;
}

export interface IEliminar {
    id: string;
}

export interface IConsulta {
    vin: string;
    placa: string;
}

export interface IConsultaId {
    id: string;
}

export interface IValidarVehiculoVin {
    vin: string;
    usuario: IUsuario
}

export interface IvehiculoSocase {
    cod_modelo_imp: string;
    cod_modelo_pos: string;
    cod_version: string;
    des_acta_entrega: string;
    des_ano_modelo: 2021
    des_color: string;
    des_entrega_retail: string;
    des_fecha_entrega: string;
    des_fecha_fac: string;
    des_fecha_promesa_sug: string;
    des_modelo_imp: string;
    des_naconalizado: string;
    des_pais_origen: string;
    des_placa: string;
    des_promesa_imp: string;
    des_punto_venta: null
    des_ubicacion:string;
    des_version: string;
    fecha_runt_placa: string;
    vin_completo: string;
}

export const vehiculoEI: IVehiculos = {
    vin: '',
    version: '',
    descripcionVersion: '',
    modelo: {
        codigo: '',
        nombre: '',
        origen: '',
        color: '',
        anoModelo: ''
    },
    placa: ''
}