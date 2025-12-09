import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IRespuestaServicio } from '../../interfaces/general';
import { IPrepagado } from '../../interfaces/tempario-prepagado/tempario-prepagado.interface';

@Injectable({
  providedIn: 'root',
})
export class TemparioPrepagadoService {
  
  private http = inject(HttpClient);
  private readonly servicio = `${environment.api}${environment.paths.temparioPrepagado}`;

  public consultarTempariosPrepagado = (): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post(this.servicio + '/consulta', {});
    } catch (error: any) {
      return error;
    }
  }

  public crearTemparioPrepagado = (payload: IPrepagado): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post(this.servicio + '/crear', payload);
    } catch (error: any) {
      return error;
    }
  }

  public actualizarTemparioPrepagado = (payload: IPrepagado): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post(this.servicio + '/actualizar', payload);
    } catch (error: any) {
      return error;
    }
  }

  public eliminarTemparioPrepagado = (payload: IEliminarTemparioPrepagado): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post(this.servicio + '/eliminar', payload);
    } catch (error: any) {
      return error;
    }
  }
}

interface IEliminarTemparioPrepagado {
  id: string
}
