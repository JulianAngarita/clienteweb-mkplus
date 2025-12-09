import { Component, inject, Input } from '@angular/core';
import { soporteLista } from '../../../../core/enum/tipo-soporte/tipo-soporte';
import { FormsModule } from '@angular/forms';
import { ISolicitudAdquisicion, ISoportes, solicitudAdquisicionEI, soporteEI } from '../../../../core/interfaces/solicitudes/solicitudes.interface';
import { UploadService } from '../../../../core/services/upload/upload';
import { IRespuestaServicio } from '../../../../core/interfaces/general';
import moment from 'moment-timezone';
import { SolicitudesService } from '../../../../core/services/solicitudes/solicitudes';
import { Utilidades } from '../../../../core/services/utilidades/utilidades';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-modal-anadir-soporte',
  imports: [
    FormsModule
  ],
  templateUrl: './modal-anadir-soporte.html',
  styleUrl: './modal-anadir-soporte.scss',
})
export class ModalAnadirSoporte {

  private uploadService = inject(UploadService);
  private solicitudesService = inject(SolicitudesService);
  private utilidadesService = inject(Utilidades);
  public activeModal = inject(NgbActiveModal);

  @Input() datosSolicitud: ISolicitudAdquisicion = structuredClone(solicitudAdquisicionEI);
  public soporte: ISoportes = structuredClone(soporteEI);

  public tipoSoporteOpciones = soporteLista;
  public fileName: string | null = null;
  public file: any;
  public cargando: boolean = false;

  public cargarSoporte = () => {
    if (this.fileName === null ) return;
    let conjuntoSoporte = this.datosSolicitud.soportes;
    const soporte = this.soporte;
    const respuesta$ = this.uploadService.uploadFile(this.file, this.fileName);

    respuesta$.subscribe({
      next: (respuesta: IRespuestaServicio) => {
        console.log(respuesta);
        if (respuesta.estatus) {
          conjuntoSoporte.push({
            ...soporte,
            nombre: respuesta.data.Key,
            url: respuesta.data.Location,
            extension: respuesta.data.Location,
            fechaCarga: moment().format()
          });
          this.datosSolicitud.soportes = conjuntoSoporte;
          this.actualizarSolicitud();
        }
      }
    })
  }

  public actualizarSolicitud = () => {
    this.cargando = true;
    this.solicitudesService.actualizarSolicitud(this.datosSolicitud).subscribe({
      next: (respuesta: IRespuestaServicio) => {
        this.cargando = false;
        this.utilidadesService.abrirModalInfo(
          'Información',
          respuesta.resultadoOperacion,
          'Aceptar'
        );
        if (respuesta.estatus) this.activeModal.close(true);
      },
      error: (error: HttpErrorResponse) => {
        this.cargando = false;
        this.utilidadesService.abrirModalInfo(
          'Información',
          error.error.resultadoOperacion,
          'Aceptar'
        );
      }
    })
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.file = file;
    this.fileName = file ? file.name : null;
  }
}
