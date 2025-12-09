import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IvehiculoSocase } from '../../../core/interfaces/vehiculos/vehiculos.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-resultado-vines',
  imports: [
    CommonModule
  ],
  templateUrl: './modal-resultado-vines.html',
  styleUrl: './modal-resultado-vines.scss',
})
export class ModalResultadoVines {
  public activeModal = inject(NgbActiveModal);

  @Input() vines: Array<IvehiculoSocase> = []
  @Output() seleccionar: EventEmitter<IvehiculoSocase> = new EventEmitter();
  constructor( public modalActivo: NgbActiveModal) { }

  ngOnInit(): void {
  }

  seleccionarVehiculo = ( vehiculo: IvehiculoSocase ) => {
    this.seleccionar.emit( vehiculo );
    this.modalActivo.close( vehiculo );
  }

}
