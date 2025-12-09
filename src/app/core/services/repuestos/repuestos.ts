import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import IRepuestos, { IConsultaRepuestos } from '../../interfaces/repuestos/repuestos.interface';
import { Observable } from 'rxjs';
import { IRespuestaServicio } from '../../interfaces/general';

@Injectable({
  providedIn: 'root',
})
export class RepuestosService {
  
  private http = inject(HttpClient);
  private readonly servicio = `${environment.api}${environment.paths.repuesto}`;

  public consultarRepuestos = (payload: IConsultaRepuestos): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post(this.servicio + '/consulta', payload);
    } catch (error: any) {
      return error;
    }
  }

  public crearRepuesto = (payload: IRepuestos): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post(this.servicio + '/crear', payload);
    } catch (error: any) {
      return error;
    }
  }

  public actualizarRepuesto = (payload: IRepuestos): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post(this.servicio + '/actualizar', payload);
    } catch (error: any) {
      return error;
    }
  }

  
  public eliminarRepuesto = (payload: IEliminarRepuesto): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post(this.servicio + '/eliminar', payload);
    } catch (error: any) {
      return error;
    }
  }
}

export interface IEliminarRepuesto {
  id: string
}
