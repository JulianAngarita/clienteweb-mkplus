import moment from "moment-timezone";
import ICliente from "../clientes/clientes.interface";
import IPaquetes from "../paquetes/paquetes.interface";

export interface ISolicitudAdquisicion {
    _id?: string;
    solicitud: {
        concesionario: string;
        numero: string;
        vin: string;
        placa: string;
        transaccion: string
    };
    asesor: {
        email: string;
        nombre: {
            nombres: string;
            apellidos: string;
        };
        identificacion: {
            numero: string;
            tipo: string;
        }
    };
    cliente: string;
    detallesCliente: ICliente;
    vehiculo: string;
    paquetes: IPaquetes[];
    paquetesId: string[];
    creado: string;
    valor: {
        valorTotal: number;
        iva: number;
        comision: number;
        ivaComision: number;
    };
    estado: string;
    actualizado: string;
    resumenEstados: IResumenEstados[];
    soportes: ISoportes[];
    concesionario: {
        cl: string;
        nombre: string;
        grupo: string;
    };
    notificaciones: {
        solicitud_trajeta: {
            enviado: boolean;
            fecha: string;
        },
        bienvenida: {
            enviado: boolean;
            fecha: string;
        }
    }
}

export interface IResumenEstados {
    estado: string;
    fecha: string;
    usuario: string;
}

export interface ISoportes {
    nombre: string;
    tipo: string;
    url: string;
    extension: string;
    revisado: boolean;
    comentarios: string;
    fechaCarga: string;
}

export const soporteEI: ISoportes = {
    nombre: "",
    tipo: "",
    url: "",
    extension: "",
    revisado: false,
    comentarios: "",
    fechaCarga: ""
}

export interface IConsultaSolicitudPorDocumento {
    identificacion?: {
        tipo?: string;
        numero?: string;
    };
    concesionario?: string;
    estado?: string;
}

export interface IConsultaId {
    id: string;
}

export interface IEliminar {
    id: string;
}

export interface IConsultaSolicitudesLista {
    solicitud: {
        concesionario: string[];
        numero: string;
        vin: string;
    }
    fecha: {
        desde: string;
        hasta: string;
    }
    estado: string;
    limite: number;
    salto: number;
}

export const filtroSolicitudesListaEI: IConsultaSolicitudesLista = {
    solicitud: {
        concesionario: [],
        numero: "",
        vin: ""
    },
    fecha: {
        desde: moment().subtract(1, 'month').format('yyyy-MM-DD'),
        hasta: moment().add(1, 'day').format('yyyy-MM-DD')
    },
    estado: "TODOS",
    limite: 10,
    salto: 0
}

export interface IConsultaServiciosDisponibles {
    id: string;
    kilometraje: number;
}

export interface IActualizarEstadoSolicitud {
    id: string;
    estado: string;
}

export interface IConsultaSolicitudRedencion {
    vin: string;
    kilometraje: string;
}

export interface IRedimirServicio {
    idServicio: string;
    idSolicitud: string;
    nombres: {
        nombres: string;
        apellidos: string;
    };
    identificacion: {
        tipo: string;
        numero: string;
    };
    linkInspeccion: string;
    usuarioQueRedime: {
        nombreCompleto: string;
        identificacion: string;
        email: string;
    };
    concesionario: {
        nombre: string;
        grupo: string;
        cl: string;
        tarifaManoObra: string;
    };
    fechaRedencion: string;
    kilometrajeActual: string;
    numeroOrdenTrabajo: string;
    fechaEntregaVehiculo: string;
    alertarImportadora: boolean;
    comentarios?: string;
}

export interface IEliminarPaqueteSolicitud {
    idSolicitud: string;
    idPaquete: string;
}

export interface IConsultaServicioARedimir {
    idSolicitud: string;
    idServicio: string;
}

export interface IConsultaSolicitudes {
    identificacion: {
        numero: string;
        tipo: string;
    };
    concesionario: string;
}

export const filtroSolicitudEI: IConsultaSolicitudes = {
    identificacion: {
        numero: "",
        tipo: ""
    },
    concesionario: ""
}

export const solicitudAdquisicionEI: ISolicitudAdquisicion = {
    solicitud: {
        concesionario: "",
        numero: "",
        vin: "",
        placa: "",
        transaccion: ""
    },
    asesor: {
        email: "",
        nombre: {
            nombres: "",
            apellidos: ""
        },
        identificacion: {
            numero: "",
            tipo: ""
        }
    },
    cliente: "",
    detallesCliente: {
        direccion: {
            callePrincipal: "",
            calleSecundaria: "",
            numero: "",
            otros: "",
            barrio: "",
            ciudad: "",
            departamento: ""
        },
        email: "",
        identificacion: {
            numero: "",
            tipo: "CC"
        },
        nombre: {
            nombres: "",
            apellidos: ""
        },
        telefonos: {
            celular: "",
            fijo: "",
            otros: ""
        }
    },
    vehiculo: "",
    paquetes: [],
    paquetesId: [],
    creado: "",
    valor: {
        valorTotal: 0,
        iva: 0,
        comision: 0,
        ivaComision: 0
    },
    estado: "",
    actualizado: "",
    resumenEstados: [],
    soportes: [],
    concesionario: {
        cl: "",
        nombre: "",
        grupo: ""
    },
    notificaciones: {
        solicitud_trajeta: {
            enviado: false,
            fecha: ""
        },
        bienvenida: {
            enviado: false,
            fecha: ""
        }
    }
}