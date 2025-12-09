import { Component, inject } from '@angular/core';
import { NAVIGATION_MENUS } from '../../../config/navigation/navigation.config';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-administrador-home',
  imports: [
    RouterModule
  ],
  templateUrl: './administrador-home.html',
  styleUrl: './administrador-home.scss',
})
export class AdministradorHome {
  public router = inject(Router);

  public menuItems = NAVIGATION_MENUS.admin;
  generales = this.menuItems.filter(i => !i.config);
  configuraciones = this.menuItems.filter(i => i.config);

  navigate(route: string) {
    this.router.navigate([route]);
  }
}
