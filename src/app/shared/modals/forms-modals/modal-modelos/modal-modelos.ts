import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import IModelo, { IImagen, IVersiones, modeloEI, versionEI } from '../../../../core/interfaces/modelos/modelos.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UploadService } from '../../../../core/services/upload/upload';
import { IRespuestaServicio } from '../../../../core/interfaces/general';
import { CatalogoService } from '../../../../core/services/catalogo/catalogo';
import { ModelosService } from '../../../../core/services/modelos/modelos';
import { Utilidades } from '../../../../core/services/utilidades/utilidades';
import { HttpErrorResponse } from '@angular/common/http';

interface IImagenSubir {
  file: any,
  size: number
}

type TipoImagen = 'primera' | 'segunda' | 'tercera' | 'cuarta';

@Component({
  selector: 'app-modal-modelos',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './modal-modelos.html',
  styleUrl: './modal-modelos.scss',
})
export class ModalModelos {

  @Input() modelo: IModelo = modeloEI;
  @Input() evento: 'EVENTO_ACTUALIZAR' | 'EVENTO_GUARDAR' = 'EVENTO_GUARDAR';
  public vistaPrevia1: string = '';
  public vistaPrevia2: string = '';
  public vistaPrevia3: string = '';
  public vistaPrevia4: string = '';
  public origen: string = '';
  public version: IVersiones;
  public imagenPrimeraVistaPrevia: string = ''
  public imagenes: IImagen[] = [];
  public imagenSubir: IImagenSubir = {
    file: undefined,
    size: 0
  }
  tiposImagen = ['primera', 'segunda', 'tercera', 'cuarta'] as const;
  vistaPrevia: Record<TipoImagen, string | null> = {
    primera: null,
    segunda: null,
    tercera: null,
    cuarta: null,
  };
  public cargando: boolean = false;

  public modalActive = inject(NgbActiveModal);
  private uploadService = inject(UploadService);
  private catalogoService = inject(CatalogoService);
  private modelosService = inject(ModelosService);
  private utilidadesService = inject(Utilidades);

  constructor() {
    this.version = Object.assign({}, versionEI)
  }

  public guardarPaises = () => {
    this.modelo.modelo.origen.push(this.origen);
    this.origen = '';
  }

  public guardarVersiones = () => {
    this.modelo.versiones.push({ ...this.version });
    this.version = Object.assign({}, versionEI);                
  }

  public eliminarVersion = (version: IVersiones) => {
    this.modelo.versiones = this.modelo.versiones.filter(v => v !== version);
  }

  public eliminarPaises = (origen: string) => {
    this.modelo.modelo.origen = this.modelo.modelo.origen.filter(v => v !== origen);
  }

  public actualizarModelo = () => {
    this.cargando = true;
    console.log((this.modelo as any).__v)

    if ("__v" in this.modelo) {
      delete (this.modelo as any).__v;
    }

    this.modelosService.actualizarModelos(this.limpiarFirmasModelo(this.modelo)).subscribe({
      next: (respuesta: IRespuestaServicio) => {
        if (respuesta.estatus) {
          this.utilidadesService.abrirModalInfo(
            'Información',
            `Modelo ${this.modelo.modelo.nombre} actualizado con éxito.`,
            'Aceptar'
          );
        } else {
          this.utilidadesService.abrirModalInfo(
            'Información',
            'No se ha podido actualizar el modelo.',
            'Aceptar'
          );
        }
        this.cargando = false;
        this.modalActive.close(true);
      },
      error: (error: HttpErrorResponse) => {
        this.utilidadesService.abrirModalInfo(
          'Información',
          error.error.resultadoOperacion,
          'Aceptar'
        )
        this.cargando = false;
      }
    })
  }

  public limpiarFirmasModelo = (modelo: any) => {
    if (!modelo?.imagenes) return modelo;

    const imagenes = modelo.imagenes;

    for (const tipo of ['primera', 'segunda', 'tercera', 'cuarta'] as const) {
      const img = imagenes[tipo];

      if (img && img.url) {
        try {
          const u = new URL(img.url);
          img.url = `${u.origin}${u.pathname}`;
        } catch {

        }
      }
    }

    return modelo;
  };

  public guardarModelo = () => {
    this.cargando = true;
    if (this.modelo._id) {
      delete this.modelo._id;
    }
    this.modelosService.crearModelos(this.modelo).subscribe({
      next: (respuesta: IRespuestaServicio) => {
        if (respuesta.estatus) {
          this.utilidadesService.abrirModalInfo(
            'Información',
            `Modelo ${this.modelo.modelo.nombre} creado con éxito.`,
            'Aceptar'
          );
        } else {
          this.utilidadesService.abrirModalInfo(
            'Información',
            'No se ha podido crear el modelo.',
            'Aceptar'
          );
        }
        this.cargando = false;
        this.modalActive.close(true);
      },
      error: (error: HttpErrorResponse) => {
        this.utilidadesService.abrirModalInfo(
          'Información',
          error.error.resultadoOperacion,
          'Aceptar'
        )
        this.cargando = false;
      }
    })
  }

  public onChangeVersionesEditar = (value: any, index: number, campo: keyof IVersiones) => {
    this.modelo.versiones[index][campo] = value;
  };

  onSubirImagen(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    this.imagenSubir.file = input.files[0];
    this.imagenSubir.size = input.files[0].size;
  }

  public esUrlFirmada = (url: string): boolean => {
    if (!url) return false;

    try {
      const u = new URL(url);
      const clavesFirma = [
        "X-Amz-Algorithm",
        "X-Amz-Credential",
        "X-Amz-Date",
        "X-Amz-SignedHeaders",
        "X-Amz-Signature",
      ];

      return clavesFirma.some(param => u.searchParams.has(param));

    } catch {
      return false;
    }
  };


  public async guardarImagen(tipo: TipoImagen) {
    if (!this.imagenSubir.file) return;

    try {
      const respuesta$ = this.uploadService.uploadFile(this.imagenSubir.file, this.imagenSubir.file.name);

      respuesta$.subscribe({
        next: (resp: IRespuestaServicio) => {
          if (resp.estatus) {
            const location = resp.data.Location;
            const key = resp.data.Key;

            this.modelo.imagenes[tipo].url = location;
            this.modelo.imagenes[tipo].nombre = key;

            const extension = location.split('.').pop();
            this.modelo.imagenes[tipo].extension = extension || '';
            this.modelo.imagenes[tipo].tamano = this.imagenSubir.size.toString();
            this.imagenSubir = {file: undefined, size: 0};
            this.catalogoService.obtenerUrl({ key }).subscribe({
              next: (res: IRespuestaServicio) => {
                if (res.estatus) {
                  if (res.estatus) this.vistaPrevia[tipo] = res.data;
                }
              }
            });
          }
        }
      });

    } catch (e) {
      console.error('Error subiendo imagen:', e);
    }
  }

}
