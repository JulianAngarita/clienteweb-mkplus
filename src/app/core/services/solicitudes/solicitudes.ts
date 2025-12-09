import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IRespuestaServicio } from '../../interfaces/general';
import { Observable } from 'rxjs';
import { IConsultaServicioARedimir, IConsultaSolicitudes, IConsultaSolicitudesLista, IConsultaSolicitudRedencion, IRedimirServicio, ISolicitudAdquisicion } from '../../interfaces/solicitudes/solicitudes.interface';

@Injectable({
  providedIn: 'root',
})
export class SolicitudesService {

  private http = inject(HttpClient);
  private readonly servicio = `${environment.api}${environment.paths.solicitudes}`;

  public crearSolicitud = ( payload: ICrearSolicitud): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post( this.servicio + '/crear-solicitud-desde-cotizador', payload )
    } catch (error: any) {
      return error
    }
  }

  public consultaSolicitudRedencion = (payload: IConsultaSolicitudRedencion): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post( this.servicio + '/consultaSolicitudRedencion', payload);
    } catch (error: any) {
      return error;
    }
  }

  public consultaServicioRedimir = (payload: IConsultaServicioARedimir): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post(this.servicio + '/consulta-servicio-a-redimir', payload);
    } catch (error: any) {
      return error;
    }
  }

  public consultaSolicitudes = (payload: IConsultaSolicitudes): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post(this.servicio + '/consultaSolicitudes', payload);
    } catch (error: any) {
      return error;
    }
  }

  public consultaListaSolicitudes = (payload: IConsultaSolicitudesLista): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post(this.servicio + '/consulta', payload);
    } catch (error: any) {
      return error;
    }
  }

  public consultaSolicitudId = (payload: IConsultaSolicitudId): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post(this.servicio + '/consultaId', payload);
    } catch (error: any) {
      return error;
    }
  }

  public actualizarSolicitud = (payload: ISolicitudAdquisicion): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post(this.servicio + '/actualizar', payload);
    } catch (error: any) {
      return error;
    }
  }

  public eliminarPaqueteSolicitud = (payload: IEliminarPaqueteSolicitud): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post(this.servicio + '/eliminarPaqueteSolicitud', payload);
    } catch (error: any) {
      return error;
    }
  }

  public actualizarEstadoSolicitud = (payload: IActualizarEstatusSolicitud): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post(this.servicio + '/actualizarEstadoSolicitud', payload);
    } catch (error: any) {
      return error;
    }
  }

  public redimirServicio = (payload: IRedimirServicio ): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post(this.servicio + '/redemirServicio', payload);
    } catch (error: any) {
      return error;
    }
  }

  public eliminarSolicitud = (payload: IConsultaSolicitudId ): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post(this.servicio + '/eliminar', payload);
    } catch (error: any) {
      return error;
    }
  }
}

interface IConsultaSolicitudId {
  id: string
}

interface ICrearSolicitud {}

interface IEliminarPaqueteSolicitud {
  idPaquete: string,
  idSolicitud: string
}

interface IActualizarEstatusSolicitud {
  id: string,
  estado: string
}