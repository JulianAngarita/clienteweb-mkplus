import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConcesionarioService } from '../../../core/services/concesionario/concesionario';

@Component({
  selector: 'app-modal-resumen-pedido',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './modal-resumen-pedido.html',
  styleUrl: './modal-resumen-pedido.scss',
})
export class ModalResumenPedido {
  public activeModal = inject(NgbActiveModal);
  private concesionarioService = inject(ConcesionarioService);

  @Input() action?: 'Descargar' | 'Enviar';
  grupo: string = '';
  concesion: string = '';
  gruposDropdown: any[] = [];
  concesionDropdown: any[] = [];
  @Output() submitData: EventEmitter<{
    grupo: string;
    concesion: string;
  }> = new EventEmitter();
  
  async ngOnInit(): Promise<void> {
    this.cargarGrupos();
    const user = await this.getUserSession();
    this.grupo = user.grupo;
    this.concesionDropdown = user.concesiones;
  }

  async getUserSession(): Promise<any> {
    const usuarioStorage = localStorage.getItem('usuario') || '';
    const usuario = JSON.parse(usuarioStorage);
    return usuario;
  }

  cargarGrupos(): void {
    this.concesionarioService.consultarcl().subscribe({
      next: async (res: any) => {
        this.gruposDropdown = await res.data;
      },
      error: (error: HttpErrorResponse) => {
        return error;
      },
    });
  }

  obtenerConcesion(): void {
    const concesiones = this.gruposDropdown.find((c) => c.grupo == this.grupo);
    this.concesionDropdown = concesiones.concesiones;
  }

  submit() {
    const data = {
      grupo: this.grupo,
      concesion: this.concesion,
    };
    this.submitData.emit(data);
    this.activeModal.close();
  }

  cancelar() {
    this.activeModal.dismiss();
  }

}
