import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/components/navbar/navbar';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Mantenimiento Prepagado');

  private titleService = inject(Title);
  
  constructor() {
    // Para inicializar el título de la página
    this.titleService.setTitle(this.title());
  }
}
