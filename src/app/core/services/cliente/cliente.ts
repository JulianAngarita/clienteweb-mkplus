import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IRespuestaServicio } from '../../interfaces/general';
import ICliente from '../../interfaces/clientes/clientes.interface';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private http = inject(HttpClient);

  private readonly servicio = `${environment.api}${environment.paths.clientes}`;

  public registrarCliente = ( payload: ICliente ): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post( this.servicio + '/registrar-cliente', payload )
    } catch (error: any) {
      return error
    }
  }

  public actualizarCliente = ( payload: ICliente ): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post(this.servicio + '/actualizar', payload);
    } catch (error: any) {
      return error;
    }
  }

  public crearCliente = ( payload: ICliente ): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post( this.servicio + '/crear', payload );
    } catch (error: any) {
      return error;
    }
  }
}
