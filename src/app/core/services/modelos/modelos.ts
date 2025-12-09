import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IRespuestaServicio } from '../../interfaces/general';
import { Observable } from 'rxjs';
import IModelo from '../../interfaces/modelos/modelos.interface';

export interface IConsultaModeloCodigo {
  codigo: string
}

@Injectable({
  providedIn: 'root',
})

export class ModelosService {
  private http = inject(HttpClient);
  private readonly servicio = `${environment.api}${environment.paths.modelos}`;

  public consultaModelos = ( payload: any): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post( this.servicio + '/consulta', payload )
    } catch (error: any) {
      return error
    }
  }

  public crearModelos = ( payload: IModelo): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post( this.servicio + '/crear', payload )
    } catch (error: any) {
      return error
    }
  }

  public actualizarModelos = (payload: IModelo): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post( this.servicio + '/actualizar', payload )
    } catch (error: any) {
      return error
    }
  }

  public eliminarModelo = (payload: IEliminarModelo): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post( this.servicio + '/eliminar', payload )
    } catch (error: any) {
      return error
    }
  }

  public consultaModeloCodigo = ( payload: IConsultaModeloCodigo): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post( this.servicio + '/consulta-codigo', payload )
    } catch (error: any) {
      return error
    }
  }
}

export interface IEliminarModelo {
  id: string
}