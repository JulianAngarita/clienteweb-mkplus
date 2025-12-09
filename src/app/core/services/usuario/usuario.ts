import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IConsultarUsuario, IUsuario } from '../../interfaces/usuarios/usuarios.interface';
import { Observable } from 'rxjs';
import { IRespuestaServicio } from '../../interfaces/general';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private http = inject(HttpClient);
  private readonly servicio = `${environment.api}${environment.paths.usuario}`;

  public crearUsuario = (usuario: IUsuario): Observable<IRespuestaServicio|any> => {
    console.log('usuario: ', usuario)
    try {
      return this.http.post(this.servicio + '/crear', usuario);
    } catch (error: any) {
      return error;
    }
  }

  public eliminarUsuario = (usuario: IEliminarUsuario): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post(this.servicio + '/eliminar', usuario);
    } catch (error: any) {
      return error;
    }
  }

  public actualizarUsuario = (usuario: IUsuario): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post(this.servicio + '/actualizar', usuario);
    } catch (error: any) {
      return error;
    }
  }

  public consultarUsuarios = (usuario: IConsultarUsuario): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post(this.servicio + '/consulta', usuario);
    } catch (error: any) {
      return error;
    }
  }
}


export interface IEliminarUsuario {
  id: string
}

export interface INombre {
  nombres: string,
  apellidos: string
}

export interface IIdentificacion {
  numero: string
}