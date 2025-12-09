import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IConsultaTempario, ITempario } from '../../interfaces/temparios/temparios.interface';
import { Observable } from 'rxjs';
import { IRespuestaServicio } from '../../interfaces/general';

@Injectable({
  providedIn: 'root',
})
export class TemparioService {
  private http = inject(HttpClient);
  private readonly servicio = `${environment.api}${environment.paths.tempario}`;

  public consultarTemparios = (payload: IConsultaTempario): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post(this.servicio + '/consulta', payload);
    } catch (error: any) {
      return error
    }
  }

  public eliminarTempario = (payload: IEliminarTempario): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post(this.servicio + '/eliminar', payload);
    } catch (error: any) {
      return error
    }
  }

  public crearTempario = (payload: ITempario): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post(this.servicio + '/crear', payload);
    } catch (error: any) {
      return error
    }
  }

  public actualizarTempario = (payload: ITempario): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post(this.servicio + '/actualizar', payload);
    } catch (error: any) {
      return error
    }
  } 
}

export interface IEliminarTempario {
  id: string
}
