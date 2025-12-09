import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IRespuestaServicio } from '../../interfaces/general';

@Injectable({
  providedIn: 'root',
})
export class CatalogoService {
  private http = inject(HttpClient);
  private readonly servicio = `${environment.api}${environment.paths.catalogo}`;

  public consultaDataAlmacenamiento = ( ): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.get( this.servicio + '/consulta-data-almacenamiento')
    } catch (error: any) {
      return error
    }
  }

  public obtenerUrl = ( payload: IObtenerUrl ): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post( this.servicio + '/obtener-url-firmada', payload)
    } catch (error: any) {
      return error
    }
  }
}

export interface IObtenerUrl {
  key: string
}
