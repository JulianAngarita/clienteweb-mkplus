import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import IPaquetes, { IConsultaPaquetes, IConsultaPorVersion } from '../../interfaces/paquetes/paquetes.interface';
import { Observable } from 'rxjs';
import { IRespuestaServicio } from '../../interfaces/general';

@Injectable({
  providedIn: 'root',
})
export class PaquetesService {
  
  private http = inject(HttpClient);
  private readonly servicio = `${environment.api}${environment.paths.paquetes}`;

  public crearPaquete = (payload: IPaquetes): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post(this.servicio + '/crear', payload);
    } catch (error: any) {
      return error;
    }
  }

  public actualizarPaquete = (payload: IPaquetes): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post(this.servicio + '/actualizar', payload);
    } catch (error: any) {
      return error;
    }
  }

  public consultarPaquete = (payload: IConsultaPaquetes): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post(this.servicio + '/consulta', payload);
    } catch (error: any) {
      return error;
    }
  }

  public consultarPaqueteId = (payload: IEliminarOConsultaId): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post(this.servicio + '/consultaId', payload);
    } catch (error: any) {
      return error;
    }
  }

  public eliminarPaquete = (payload: IEliminarOConsultaId): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post(this.servicio + '/eliminar', payload);
    } catch (error: any) {
      return error;
    }
  }

  public consultarPaqueteVersion = (payload: IConsultaPorVersion): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post(this.servicio + '/consultaPorVersion', payload);
    } catch (error: any) {
      return error;
    }
  }
}

interface IEliminarOConsultaId {
  id: string
}
