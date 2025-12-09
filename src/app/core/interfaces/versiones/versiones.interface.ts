import { IUsuario } from '../usuarios/usuarios.interface';

export default interface IVersion {
    _id?: string;
    activo: boolean;
    versionControl: string;
    campos: ICampos[];
    codigoModelo: IClaves[];
    aireAcondicionado: IClaves[];
    cilindraje: IClaves[];
    codigoEquipamiento: IClaves[];
    espacioLibre: IClaves[];
    generacionVehiculo: IClaves[];
    motor: IClaves[];
    numeroPuertas: IClaves[];
    prefijoFabrica: IClaves[];
    traccion: IClaves[];
    transmision: IClaves[];
    uso: IClaves[];
    versionCodigoEquipamiento: IClaves[];
}

export const versionEI: IVersion = {
    activo: false,
    versionControl: '',
    campos: [],
    codigoModelo: [],
    aireAcondicionado: [],
    cilindraje: [],
    codigoEquipamiento: [],
    espacioLibre: [],
    generacionVehiculo: [],
    motor: [],
    numeroPuertas: [],
    prefijoFabrica: [],
    traccion: [],
    transmision: [],
    uso: [],
    versionCodigoEquipamiento: []
}

export interface ICampos {
    contenido: string;
    caracteres: number;
    posicion: number;
}

export interface IClaves {
    nombre: string;
    valor: string;
}

export interface IEliminar {
    id: string;
    usuario: IUsuario;
}

export interface ICaracteristicasSegunVersion {
    version?: string;
}

export interface IDetalleCaracteristica {
    clave: string;
    valor: string
}

export interface ICaracteristicas {
    version: string;
    codigoModelo:       IDetalleCaracteristica;
    aireAcondicionado:  IDetalleCaracteristica;
    cilindraje:         IDetalleCaracteristica;
    codigoEquipamiento: IDetalleCaracteristica;
    espacioLibre:       IDetalleCaracteristica;
    generacionVehiculo: IDetalleCaracteristica;
    motor:              IDetalleCaracteristica;
    numeroPuertas:      IDetalleCaracteristica;
    prefijoFabrica:     IDetalleCaracteristica;
    traccion:           IDetalleCaracteristica;
    transmision:        IDetalleCaracteristica;
    uso:                IDetalleCaracteristica;
    versionCodigoEquipamiento: IDetalleCaracteristica;
}