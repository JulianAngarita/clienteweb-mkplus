import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CatalogoService } from '../catalogo/catalogo';
import { IRespuestaServicio } from '../../interfaces/general';
import { CipherService } from '../cipher/cipher';
import { Utilidades } from '../utilidades/utilidades';
import { Observable, Observer } from 'rxjs';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';


@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private catalogoService = inject(CatalogoService);
  private cipherService = inject(CipherService);
  private utilidadesService = inject(Utilidades);

  progresoCargarMultimedia = signal(0);

  progresoTexto = computed(() => `${this.progresoCargarMultimedia()}%`);

  setProgresoCargarMultimedia(valor: number) {
    this.progresoCargarMultimedia.set(valor);
  }

  private consultaCredenciales = async (): Promise<consultaCredenciales> => {
    let aws_secret_access_key = '';
    let aws_access_key_id = '';
    let aws_region = ''

    return new Promise( ( resolve, reject ) => {
      this.catalogoService.consultaDataAlmacenamiento()
      .subscribe({
        next: ( value ) => {
          const newValue = this.cipherService.desencriptarData(value as {data: string, iv: string});
          const respuesta: any|IRespuestaServicio = JSON.parse(newValue);
          if (respuesta.estatus) {
            aws_secret_access_key = respuesta.data.credenciales.aws_secret_access_key;
            aws_access_key_id = respuesta.data.credenciales.aws_access_key_id;
            aws_region = respuesta.data.credenciales.aws_region;

            resolve({
              aws_secret_access_key,
              aws_access_key_id,
              aws_region
            })
          } else {
            reject({
              aws_secret_access_key,
              aws_access_key_id
            })
            this.utilidadesService.abrirModalInfo(
              'Cargar archivos',
              respuesta.resultadoOperacion,
              'Entendido'
            )
          }
        }
      })
    })
  }

  public uploadFile(file: File, fileName: string): Observable<IRespuestaServicio> {
    return new Observable((observer: Observer<IRespuestaServicio>) => {
      this.consultaCredenciales()
        .then((credenciales) => {
          const s3 = new S3Client({
            forcePathStyle: true,
            region: credenciales.aws_region,
            credentials: {
              accessKeyId: credenciales.aws_access_key_id,
              secretAccessKey: credenciales.aws_secret_access_key,
            },
          });
          const upload = new Upload({
            client: s3,
            params: {
              Bucket: environment.bucket,
              Key: fileName,
              Body: file,
              ContentType: file.type,
            },
            queueSize: 1,
            partSize: 5 * 1024 * 1024,
            leavePartsOnError: false,
          });

          upload.on('httpUploadProgress', (evt) => {
            if (evt.loaded && evt.total) {
              const progreso = evt.loaded / evt.total;
              this.progresoCargarMultimedia.set(progreso);
            }
          });

          upload.done()
            .then((result) => {
              observer.next({
                estatus: true,
                resultadoOperacion: 'Se ha cargado con éxito.',
                data: result,
              });
              observer.complete();
            })
            .catch((err) => {
              console.error(err);
              this.utilidadesService.abrirModalInfo(
                'Carga de archivo',
                'No se pudo cargar el archivo',
                'Entendido'
              );
              observer.next({
                estatus: false,
                resultadoOperacion: 'No se pudo cargar el archivo',
              });
              observer.complete();
            });
        })
        .catch((err) => {
          observer.next({
            estatus: false,
            resultadoOperacion: 'No se pudieron obtener las credenciales',
          });
          observer.complete();
        });
    });
  }
}

export interface consultaCredenciales {
  aws_secret_access_key: string;
  aws_access_key_id: string;
  aws_region: string;
}

