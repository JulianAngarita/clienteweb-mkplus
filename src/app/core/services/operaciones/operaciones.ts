import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import IOperaciones, { IConsultaOperaciones } from '../../interfaces/operaciones/operaciones.interface';
import { Observable } from 'rxjs';
import { IRespuestaServicio } from '../../interfaces/general';

@Injectable({
  providedIn: 'root',
})
export class OperacionesService {
  
  private http = inject(HttpClient);
  private readonly servicio = `${environment.api}${environment.paths.operaciones}`;

  public consultaOperaciones = (payload: IConsultaOperaciones): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post(this.servicio + '/consulta', payload);
    } catch (error: any) {
      return error;
    }
  }
  
  public crearOperaciones = (payload: IOperaciones): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post(this.servicio + '/crear', payload);
    } catch (error: any) {
      return error;
    }
  }

  public actualizarOperaciones = (payload: IOperaciones): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post(this.servicio + '/actualizar', payload);
    } catch (error: any) {
      return error;
    }
  }

  public eliminarOperacion = (payload: IEliminarOperacion): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post(this.servicio + '/eliminar', payload);
    } catch (error: any) {
      return error;
    }
  }
}

interface IEliminarOperacion {
  id: string
}