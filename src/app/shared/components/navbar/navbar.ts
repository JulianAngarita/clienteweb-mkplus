import { Component, inject, signal } from '@angular/core';
import { LogoKia } from '../logo-kia/logo-kia';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';
import { NAVIGATION_NAVBAR_MENUS } from '../../../config/navigation/navigation.config';
import { NgClass } from '@angular/common';
import { AuthService } from '../../../core/services/auth/auth';

@Component({
  selector: 'app-navbar',
  imports: [LogoKia, RouterModule, NgClass],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  menuOpen = false;
  private router = inject(Router);
  private authService = inject(AuthService);

  menu = signal<{ label: string; path: string }[]>([]);

  constructor() {
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd)
    ).subscribe(
      (event) => this.actualizarMenu(event.urlAfterRedirects)
    );
  }

  public cerrarSesion = () => {
    this.authService.cerrarSesion();
  }

  private actualizarMenu(url: string) {
    if (url.startsWith('/tienda')) {
      this.menu.set(NAVIGATION_NAVBAR_MENUS.tienda);
    } else if (url.startsWith('/admin')) {
      this.menu.set(NAVIGATION_NAVBAR_MENUS.admin);
    } else if (url.startsWith('/auth')) {
      this.menu.set([])
    } else if (url.startsWith('/public')) {
      this.menu.set([]);
    } else {
      this.menu.set(NAVIGATION_NAVBAR_MENUS.default);
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }
}
