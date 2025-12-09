import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import moment from 'moment-timezone';
import { ConcesionarioService } from '../../../core/services/concesionario/concesionario';
import { IRespuestaServicio } from '../../../core/interfaces/general';
import { Utilidades } from '../../../core/services/utilidades/utilidades';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-reportes',
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './reportes.html',
  styleUrl: './reportes.scss',
})
export class Reportes {
  private fb = inject(FormBuilder);
  private concesionarioService = inject(ConcesionarioService);
  private utilidadesService = inject(Utilidades);
  public cargando: boolean = false;


  listaGrupos: any[] = [];
  listaEstadoRedencion = [
    { key:0, text: 'Todos', value: 'TODOS' },
    { key:1, text: 'Redimido', value: 'Redimido' },
    { key:3, text: 'Pendiente', value: 'Pendiente' }
  ];

  filtroSolicitudes = this.fb.group({
    desde: moment().subtract(1, 'month').format('YYYY-MM-DD'),
    hasta: moment().format('YYYY-MM-DD'),
    asesor_cedula: '',
    concesionario_cl: '',
    concesionario_grupo: 'TODOS',
    estado: 'TODOS',
  });

  filtroServicios = this.fb.group({
    desde: moment().subtract(1, 'month').format('YYYY-MM-DD'),
    hasta: moment().format('YYYY-MM-DD'),
    concesionario_grupo: 'TODOS',
    estado: 'TODOS',
  });

  ngOnInit() {
    this.consultaConcesiones();
  }

  async consultaConcesiones() {
    this.cargando = true;
    this.concesionarioService.consultarcl().subscribe({
      next: (respuesta: IRespuestaServicio) => {
        this.cargando = false;
        if (respuesta.estatus) {
          const concesiones = respuesta.data;
          const prepararGrupos = [
            { key: 0, text: 'Todos', value: 'TODOS' }
          ];
          
          concesiones.map((i: any) => {
            prepararGrupos.push({
              key: i.grupo,
              text: i.grupo,
              value: i.grupo
            });
          });
          this.listaGrupos = prepararGrupos;
        }
      },
      error: (error: HttpErrorResponse) => {
        this.cargando = false;
        this.utilidadesService.abrirModalInfo(
          'Información',
          error.error.resultadoOperacion,
          'Aceptar'
        );
      }
    });
  }

  descargarReporteSolicitudes() {
    const f = this.filtroSolicitudes.value;
    const url =
      `${environment.api}api/v1/reportes/reporte-solicitudes?` +
      `desde=${f.desde}&hasta=${f.hasta}&asesor_cedula=${f.asesor_cedula}` +
      `&concesionario_cl=${f.concesionario_cl}&concesionario_grupo=${f.concesionario_grupo}` +
      `&estado=${f.estado}`;
    console.log(url);
    window.open(url);
  }

  descargarReporteServicios() {
    const f = this.filtroServicios.value;

    const url =
      `${environment.api}api/v1/reportes/reporte-servicios?` +
      `desde=${f.desde}&hasta=${f.hasta}&concesionario_grupo=${f.concesionario_grupo}` +
      `&estado=${f.estado}`;
    console.log(url);
    window.open(url);
  }
}
