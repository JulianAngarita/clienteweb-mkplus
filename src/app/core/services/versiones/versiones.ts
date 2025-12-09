import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IRespuestaServicio } from '../../interfaces/general';
import IVersion from '../../interfaces/versiones/versiones.interface';

@Injectable({
  providedIn: 'root',
})
export class VersionesService {
  
  private http = inject(HttpClient);
  private readonly servicio = `${environment.api}${environment.paths.versiones}`;

  public crearVersion = (payload: IVersion): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post(this.servicio + '/crear', payload)
    } catch (error: any) {
      return error;
    }
  }

  public consultarVersiones = (payload: IConsultarVersion): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post(this.servicio + '/consulta', payload)
    } catch (error: any) {
      return error;
    }
  }

  public actualizarVersion = (payload: IVersion): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post(this.servicio + '/actualizar', payload)
    } catch (error: any) {
      return error;
    }
  }

  public eliminarVersion = (payload: IEliminarVersion): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post(this.servicio + '/eliminar', payload)
    } catch (error: any) {
      return error;
    }
  }
}

interface IEliminarVersion {
  id: string
}

interface IConsultarVersion {
  activo: boolean
}