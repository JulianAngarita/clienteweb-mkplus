import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-inicio',
  imports: [RouterModule],
  templateUrl: './inicio.html',
  styleUrl: './inicio.scss',
})
export class Inicio {

  public usuario = localStorage.getItem('usuario');
  public rol = '';

  constructor() {
    const datosUsuario = JSON.parse(this.usuario ?? '');
    if(datosUsuario){
        this.rol = datosUsuario.rol;

    } 
  }
}
