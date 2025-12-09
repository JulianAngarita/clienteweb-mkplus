import { Routes } from "@angular/router";

export const INICIO_ROUTES: Routes = [
    {
        path: 'prepagado',
        loadComponent: () => import('./inicio/inicio').then(m => m.Inicio)
    }
]