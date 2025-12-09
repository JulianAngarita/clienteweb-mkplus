import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import IVersion, { ICampos, IClaves, versionEI } from '../../../../core/interfaces/versiones/versiones.interface';
import { FormsModule } from '@angular/forms';
import { listaContenidoVersion } from '../../../../core/enum/tipo-contenido-version/tipo-contenido-version';
import { VersionesService } from '../../../../core/services/versiones/versiones';
import { IRespuestaServicio } from '../../../../core/interfaces/general';
import { Utilidades } from '../../../../core/services/utilidades/utilidades';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-modal-versiones',
  imports: [
    FormsModule
  ],
  templateUrl: './modal-versiones.html',
  styleUrl: './modal-versiones.scss',
})
export class ModalVersiones {
  public listaSecciones: {key: string, titulo: string}[] = [
    { key: 'codigoModelo', titulo: 'Código Modelo' },
    { key: 'aireAcondicionado', titulo: 'Aire Acondicionado' },
    { key: 'codigoEquipamiento', titulo: 'Código Equipamiento' },
    { key: 'transmision', titulo: 'Transmisión' },
    { key: 'espacioLibre', titulo: 'Espacio Libre' },
    { key: 'generacionVehiculo', titulo: 'Generación Vehículo' },
    { key: 'motor', titulo: 'Motor' },
    { key: 'numeroPuertas', titulo: 'Número Puertas' },
    { key: 'prefijoFabrica', titulo: 'Prefijo fábrica' },
    { key: 'traccion', titulo: 'Tracción' },
    { key: 'uso', titulo: 'Uso' },
    { key: 'versionCodigoEquipamiento', titulo: 'Control de cambio' }
  ];
  public listadoContenidoVersionOpciones = listaContenidoVersion;
  public cargando: boolean = false;

  tempCampo: ICampos = {
    contenido: '',
    caracteres: 0,
    posicion: 0
  };

  tempClave: IClaves = {
    nombre: '',
    valor: ''
  };
  tempClaves: Record<string, IClaves> = {};

  public modalActivo = inject(NgbActiveModal);
  private versionesService = inject(VersionesService);
  private utilidadesServices = inject(Utilidades);

  @Input() evento: 'EVENTO_ACTUALIZAR' | 'EVENTO_GUARDAR' = 'EVENTO_GUARDAR';
  @Input() datosVersion: IVersion = Object.assign({}, versionEI);


  ngOnInit() {
    this.listaSecciones.forEach(s => {
      this.tempClaves[s.key] = { nombre: '', valor: '' };
    });
  }

  agregarCampo() {
    if (!this.tempCampo.contenido || !this.tempCampo.caracteres || !this.tempCampo.posicion) {
      return;
    }

    this.datosVersion.campos.push({
      contenido: this.tempCampo.contenido,
      caracteres: this.tempCampo.caracteres,
      posicion: this.tempCampo.posicion
    });

    this.tempCampo = { contenido: '', caracteres: 0, posicion: 0 };
  }
  
  eliminarCampo(index: number) {
    this.datosVersion.campos.splice(index, 1);
  }


  agregarClave(key: string) {
    const temp = this.tempClaves[key];
    if (!temp.nombre || !temp.valor) return;

    this.getDatosVersionArray(key).push({ ...temp });

    this.tempClaves[key] = { nombre: '', valor: '' };
  }

  eliminarClave(key: string, index: number) {
    this.getDatosVersionArray(key).splice(index, 1);
  }

  getDatosVersionArray(key: string): any[] {
    const value = this.datosVersion[key as keyof IVersion];
    return Array.isArray(value) ? value : [];
  }

  public actualizar = () => {
    if ("creado" in this.datosVersion) {
      delete (this.datosVersion as any).creado;
    }
    if ("actualizado" in this.datosVersion) {
      delete (this.datosVersion as any).actualizado;
    }
    if ("__v" in this.datosVersion) {
      delete (this.datosVersion as any).__v;
    }
    if ("editado" in this.datosVersion) {
      delete (this.datosVersion as any).editado;
    }
    this.cargando = true;
    this.versionesService.actualizarVersion(this.datosVersion).subscribe({
      next: (respuesta: IRespuestaServicio) => {
        this.cargando = false;
        this.utilidadesServices.abrirModalInfo(
          'Información',
          respuesta.resultadoOperacion,
          'Aceptar'
        );
        if (respuesta.estatus) this.modalActivo.close(true);
      },
      error: (error: HttpErrorResponse) => {
        this.cargando = false;
        this.utilidadesServices.abrirModalInfo(
          'Información',
          error.error.resultadoOperacion,
          'Aceptar'
        )
      }
    })
  }

  public guardar = () => {
    this.cargando = true;
    this.versionesService.crearVersion(this.datosVersion).subscribe({
      next: (respuesta: IRespuestaServicio) => {
        this.cargando = false;
        this.utilidadesServices.abrirModalInfo(
          'Información',
          respuesta.resultadoOperacion,
          'Aceptar'
        );
        if (respuesta.estatus) this.modalActivo.close(true);
      },
      error: (error: HttpErrorResponse) => {
        this.cargando = false;
        this.utilidadesServices.abrirModalInfo(
          'Información',
          error.error.resultadoOperacion,
          'Aceptar'
        )
      }
    })
  }
}
