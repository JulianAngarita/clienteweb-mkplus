import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IRespuestaServicio } from '../../interfaces/general';

export interface IIniciarSesion {
  email: string;
  contrasena: string;
}

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private readonly servicio = `${environment.api}${environment.paths.autenticacion}`;

  /**
   * Inicia sesión del usuario
   * @param payload Credenciales del usuario
   */
  iniciarSesion(payload: IIniciarSesion): Observable<IRespuestaServicio> {
    return this.http
      .post<IRespuestaServicio>(`${this.servicio}/iniciarSesion`, payload)
      .pipe(
        tap((respuesta) => {
          if (respuesta?.estatus && respuesta?.token) {
            this.guardarSesion(respuesta.token, respuesta.usuario);
          }
        }),
        catchError((error) => {
          console.error('Error en iniciarSesion:', error);
          return throwError(() => new Error('Error al iniciar sesión.'));
        })
      );
  }

  /**
   * Guarda token y usuario en localStorage
   */
  private guardarSesion(token: string, usuario: any): void {
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  /**
   * Elimina sesión y redirige al login
   */
  cerrarSesion(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/auth/log-in']);
  }

  /**
   * Retorna el token actual si existe
   */
  obtenerToken(): string | null {
    return JSON.parse(localStorage.getItem('token') || 'null');
  }

  /**
   * Verifica si el usuario está autenticado
   */
  estaAutenticado(): boolean {
    return !!this.obtenerToken();
  }
}
