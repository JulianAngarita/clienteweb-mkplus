import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IRespuestaServicio } from '../../interfaces/general';
import { IConcesion, IConsultarConcesionarios } from '../../interfaces/concesiones/concesiones.interface';

@Injectable({
  providedIn: 'root',
})
export class ConcesionarioService {
  private http = inject(HttpClient);
  private readonly servicio = `${environment.api}${environment.paths.concesion}`;

  public consultarcl(): Observable<any> {
    try {
      return this.http.post(this.servicio + '/consultaCLPorGrupo', {});
    } catch (error: any) {
      return error;
    }
  }

  public consultarConcesionarios = (payload: IConsultarConcesionarios): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post(this.servicio + '/consulta', payload);
    } catch (error: any) {
      return error;
    }
  }

  public eliminarConcesionario = (payload: IEliminarConcesionario): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post(this.servicio + '/eliminar', payload);
    } catch (error: any) {
      return error;
    }
  }

  public crearConcesionario = (payload: IConcesion): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post(this.servicio + '/crear', payload);
    } catch (error: any) {
      return error;
    }
  }

  public actualizarConcesionario = (payload: IConcesion): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post(this.servicio + '/actualizar', payload);
    } catch (error: any) {
      return error;
    }
  }
}

interface IEliminarConcesionario {
  id: string
}