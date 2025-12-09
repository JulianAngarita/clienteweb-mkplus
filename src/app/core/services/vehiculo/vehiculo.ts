import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IRespuestaServicio } from '../../interfaces/general';
import IVehiculos from '../../interfaces/vehiculos/vehiculos.interface';

@Injectable({
  providedIn: 'root',
})
export class VehiculoService {
  private http = inject(HttpClient);

  private readonly servicio = `${environment.api}${environment.paths.vehiculos}`;

  public validarVehiculoVIN = ( vin: string ): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post( this.servicio + '/validarVehiculoVin', {  vin: vin } )
    } catch (error: any) {
      return error
    }
  }

  public crearVehiculo = ( payload: IVehiculos ): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post( this.servicio + '/crear', payload );
    } catch (error: any) {
      return error
    }
  }

  public actualizarVehiculo = ( payload: IVehiculos ): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post( this.servicio + '/actualizar', payload );
    } catch (error: any) {
      return error
    }
  }
}
