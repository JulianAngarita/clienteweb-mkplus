import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Utilidades } from '../utilidades/utilidades';
import { catchError, map, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private http = inject(HttpClient);
  private utilidadesService = inject(Utilidades);

  private readonly api = environment.api;
  private readonly servicio = `${environment.api}${environment.paths.cotizador}`;

  email = signal<string>('');
  pdfBytes = signal<Uint8Array | null>(null);

  setEmail(email: string): void {
    this.email.set(email);
  }

  setPdfBytes(pdf: Uint8Array): void {
    this.pdfBytes.set(pdf);
  }

  sendEmailWithPdf(pdfBytes: Uint8Array, correo: string) {
    const formData = new FormData();
    formData.append('email', correo);

    const safeBuffer = pdfBytes.buffer.slice(
      pdfBytes.byteOffset,
      pdfBytes.byteOffset + pdfBytes.byteLength
    );

    const blob = new Blob([safeBuffer as ArrayBuffer], { type: 'application/pdf' });

    formData.append('file', blob, 'document.pdf');

    this.http.post(`${this.api}/email-prepagado`, formData).subscribe({
      next: () => {
        this.utilidadesService.abrirModalInfo(
          'Información',
          'PDF enviado correctamente.',
          'Cerrar'
        );
      },
      error: (err) => {
        console.error('Error al enviar el PDF:', err);
        this.utilidadesService.abrirModalInfo(
          'Información',
          'No se pudo enviar el PDF. Intenta nuevamente.',
          'Cerrar'
        );
      }
    });
  }





  descargarResumenPedidoPdf(modelo: any): Observable<Blob> {
    return this.http
      .post(`${this.servicio}/generarPdf`, modelo, {
        responseType: 'blob',
      })
      .pipe(
        map((response) => response as Blob),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ha ocurrido un error inesperado.';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error del cliente: ${error.error.message}`;
    } else {
      errorMessage = `Error ${error.status}: ${error.message}`;
    }

    console.error('[EmailPrepagadoService] Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
