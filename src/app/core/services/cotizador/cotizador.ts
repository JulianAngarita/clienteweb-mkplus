import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IRespuestaServicio } from '../../interfaces/general';
import { Observable } from 'rxjs';

export interface ICotizar {
  codigoModelo: string;
  codigoVersion: string;
  kinicial: number;
  kfinal: number;
  frecMonth: number;
  frecKm: number;
}

@Injectable({
  providedIn: 'root',
})
export class CotizadorService {

  private http = inject(HttpClient);

  private readonly servicio = `${environment.api}${environment.paths.cotizador}`;

  public  cotizar = ( payload: ICotizar ): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post( this.servicio + '/crear-paquete-personalizado', payload )
    } catch (error: any) {
      return error
    }
  }

  public consultaFrecuenciaSocase(version: string): Observable<any> {
    const model = {
      version: version,
    };
    try {
      return this.http.post(this.servicio + '/consultaSocase', model);
    } catch (error: any) {
      return error;
    }
  }
}
