import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IRespuestaServicio } from '../../interfaces/general';
import { IConsultarTerminos, ITerminosCondiciones } from '../../interfaces/terminos-condiciones/terminos-condiciones.interface';

@Injectable({
  providedIn: 'root',
})
export class TerminoCondicionesService {
  
  private http = inject(HttpClient);
  private readonly servicio = `${environment.api}${environment.paths.terminos}`;

  public consultarTerminos = (payload: IConsultarTerminos): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post(this.servicio + '/consulta', payload);
    } catch (error: any) {
      return error;
    }
  }

  public crearTerminos = (payload: ITerminosCondiciones): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post(this.servicio + '/crear', payload);
    } catch (error: any) {
      return error
    }
  }

  public actualizarTerminos = (payload: ITerminosCondiciones): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post(this.servicio + '/actualizar', payload);
    } catch (error: any) {
      return error;
    }
  }

  public eliminarTerminos = (payload: IEliminarTerminos): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post(this.servicio + '/eliminar', payload);
    } catch (error: any) {
      return error
    }
  }
}

interface IEliminarTerminos {
  id: string
}
