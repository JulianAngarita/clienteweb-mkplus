import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IRespuestaServicio } from '../../interfaces/general';

@Injectable({
  providedIn: 'root',
})
export class FirmaSolicitudService {
  private http = inject(HttpClient);
  private readonly servicio = `${environment.api}${environment.paths.firma_solicitud}`;

  public consultaFirma = (payload: IConsultarFirma): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post(this.servicio + '/consulta-firma', payload);
    } catch (error: any) {
      return error;
    }
  }

  public crearActualizarFirma = (payload: ICrearActualizarFirmas): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post(this.servicio + '/crear-actualizar-firma', payload);
    } catch (error: any) {
      return error;
    }
  }
}

interface IConsultarFirma {
  idSolicitud: string
}

interface ICrearActualizarFirmas {
  solicitud: string,
  creado: string,
  firmas: {
    cliente: string,
    concesionario: string
  }
}