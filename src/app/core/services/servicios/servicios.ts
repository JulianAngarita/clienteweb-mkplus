import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import IServicio, { IConsultaServicio } from '../../interfaces/servicios/servicios.interface';
import { Observable } from 'rxjs';
import { IRespuestaServicio } from '../../interfaces/general';

@Injectable({
  providedIn: 'root',
})
export class ServiciosServicios {
  
  private http = inject(HttpClient);
  private readonly servicio = `${environment.api}${environment.paths.servicio}`;

  public consultarServicios = (payload: IConsultaServicio): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post(this.servicio + '/consulta', payload);
    } catch (error: any) {
      return error;
    }
  }

  public consultarServicioId = (payload: IEliminarServicio): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post(this.servicio + '/consultaId', payload);
    } catch (error: any) {
      return error;
    }
  }

  public eliminarServicio = (payload: IEliminarServicio): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post(this.servicio + '/eliminar', payload);
    } catch (error: any) {
      return error;
    }
  }

  public crearServicio = (payload: IServicio): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post(this.servicio + '/crear', payload);
    } catch (error: any) {
      return error;
    }
  }

  public actualizarServicios = (payload: IServicio): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post(this.servicio + '/actualizar', payload);
    } catch (error: any) {
      return error;
    }
  }
}

interface IEliminarServicio {
  id: string
}
