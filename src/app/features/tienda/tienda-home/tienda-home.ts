import { Component, inject } from '@angular/core';
import { ModelosService } from '../../../core/services/modelos/modelos';
import { IRespuestaServicio } from '../../../core/interfaces/general';
import IModelo from '../../../core/interfaces/modelos/modelos.interface';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tienda-home',
  imports: [CommonModule],
  templateUrl: './tienda-home.html',
  styleUrl: './tienda-home.scss',
})
export class TiendaHome {

  private modelosService = inject(ModelosService);
  private router = inject(Router)
  public modelos: IModelo[] = [];
  loading = true;

  ngOnInit(): void {
    this.consultaModelos();
  }

  consultaModelos = () => {
    this.modelosService.consultaModelos({ activo: true })
    .subscribe({
      next: ( respuesta: IRespuestaServicio) => {
        if ( respuesta.estatus) {
          this.modelos = respuesta.data
        }
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
      },
    })
  }

  seleccionModelo = ( modelo: IModelo) => {
    this.router.navigate(['/tienda/cotizador-tienda'], {
      queryParams:{
        modelo: modelo.modelo?.codigo
      }
    })
  }
}
