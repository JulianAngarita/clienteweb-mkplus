import { Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { tipoTransmisionOpciones } from '../../../../core/enum/tipo-transmision/tipo-transmision';
import { tipoAireAcondicionadoOpciones } from '../../../../core/enum/tipo-aire-acondicionado/tipo-aire-acondicionado';
import { tipoCombustibleOpciones } from '../../../../core/enum/tipo-combustible/tipo-combustible';
import { RepuestosService } from '../../../../core/services/repuestos/repuestos';
import { csvAJson } from '../../../utils/utils';
import { CommonModule } from '@angular/common';
import { Utilidades } from '../../../../core/services/utilidades/utilidades';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-modal-repuestos-csv',
  imports: [
    NgbModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './modal-repuestos-csv.html',
  styleUrl: './modal-repuestos-csv.scss',
})
export class ModalRepuestosCsv {


  private modalActivo = inject(NgbActiveModal);
  private repuestosService = inject(RepuestosService);
  private utilidadesService = inject(Utilidades)

  verInstrucciones = signal(false);
  nombreArchivo = signal('');
  iniciarCarga = signal(false);

  totalRegistros = signal(0);
  totalRegistrosProcesados = signal(0);

  repuestos = signal<any[]>([]);
  headers = signal<string[]>([]);


  indicaciones = [
    {
      variable: 'tipoCombustible',
      descripcion: 'Claves válidas para tipo de combustible',
      claves: tipoCombustibleOpciones,
    },
    {
      variable: 'aireAcondicionado',
      descripcion: 'Claves válidas para el aire acondicionado',
      claves: tipoAireAcondicionadoOpciones,
    },
    {
      variable: 'transmision',
      descripcion: 'Claves válidas para la transmisión',
      claves: tipoTransmisionOpciones,
    },
  ];

  constructor() {
    effect(() => {
      if (this.totalRegistros() > 0 && this.iniciarCarga()) {
        this.cargarRepuestoActual();
      }
    });
  }

  handleFile(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file || file.type !== 'text/csv') {
      alert('Debe elegir un archivo .csv separado por comas ","');
      this.repuestos.set([]);
      this.nombreArchivo.set('');
      return;
    }

    this.nombreArchivo.set(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      const texto = e.target?.result as string;

      const json = JSON.parse(csvAJson(texto));

      this.repuestos.set(json);
      this.headers.set(Object.keys(json[0] ?? {}));
      this.totalRegistros.set(json.length);
    };

    reader.readAsText(file);
  }

  cargarRepuestoActual() {
    const total = this.totalRegistros();

    if (total === 0) {
      this.iniciarCarga.set(false);
      return;
    }
    const item = structuredClone(this.repuestos()[total - 1]);

    const rep = this.mapearRepuesto(item);

    this.repuestosService.crearRepuesto(rep).subscribe({
      error: (error: HttpErrorResponse) => this.utilidadesService.abrirModalInfo(
        'Información',
        error.error.resultadoOperacion,
        'Aceptar'
      )
    });

    this.totalRegistros.set(total - 1);
    this.totalRegistrosProcesados.update((x) => x + 1);
  }

  private mapearRepuesto(rep: any) {
    const res: any = { ...rep };

    res.activo = Number(rep.activo) === 1;
    res.iva = Number(rep.iva) === 1;

    res.caracteristicas = {
      tipoCombustible: rep.tipoCombustible,
      aireAcondicionado: rep.aireAcondicionado,
      transmision: rep.transmision,
      cilindrada: Number(rep.cilindrada),
    };

    delete res.tipoCombustible;
    delete res.aireAcondicionado;
    delete res.transmision;
    delete res.cilindrada;

    res.precioVenta = {
      publico: Number(rep.publico),
      concesionario: Number(rep.concesionario),
    };

    delete res.publico;
    delete res.concesionario;

    res.margen = {
      precioVentaConcesionario: rep.margenConcesionario ?? '0',
      precioVentaPublico: rep.margenPublico ?? '0',
    };

    delete res.margenConcesionario;
    delete res.margenPublico;

    return res;
  }

  cerrar() {
    this.modalActivo.close();
  }
}

