import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IRespuestaServicio } from '../../interfaces/general';
import { IVariableCalculo } from '../../interfaces/variables-calculo/variables-calculo.interface';

@Injectable({
  providedIn: 'root',
})
export class VariablesService {
  
  private http = inject(HttpClient);
  private readonly servicio = `${environment.api}${environment.paths.variables}`

  public consultarVariables = (): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post(this.servicio + '/consulta', {})
    } catch (error: any) {
      return error;
    }
  }

  public crearVariable = (payload: IVariableCalculo): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post(this.servicio + '/crear', payload)
    } catch (error: any) {
      return error;
    }
  }

  public eliminarVariable = (payload: IEliminarVariable): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post(this.servicio + '/eliminar', payload)
    } catch (error: any) {
      return error;
    }
  }

  public actualizarVariable = (payload: IVariableCalculo): Observable<IRespuestaServicio|any> => {
    try {
      return this.http.post(this.servicio + '/actualizar', payload)
    } catch (error: any) {
      return error;
    }
  }
}

interface IEliminarVariable {
  id: string
}