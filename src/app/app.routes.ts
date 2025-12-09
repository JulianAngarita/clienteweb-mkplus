import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
    },
    {
        path: 'admin-tienda',
        canActivate: [authGuard],
        loadChildren: () => import('./features/administrador-tienda/administrador-tienda.routes').then(m => m.ADMIN_TIENDA_ROUTES)
    },
    {
        path: 'admin',
        canActivate: [authGuard],
        loadChildren: () => import('./features/administrador/administrador.routes').then(m => m.ADMIN_ROUTES)
    },
    {
        path: 'tienda',
        canActivate: [authGuard],
        loadChildren: () => import('./features/tienda/tienda.routes').then(m => m.TIENDA_ROUTES)
    },
    {
        path: 'inicio',
        canActivate: [authGuard],
        loadChildren: () => import('./features/inicio/inicio.routes').then(m => m.INICIO_ROUTES)
    },
    {
        path: 'public',
        loadChildren: () => import('./features/public/public.routes').then(m => m.PUBLIC_ROUTES)
    },
    {
        path: '',
        redirectTo: 'inicio/prepagado',
        pathMatch: 'full',
    },
    {
        path: '**',
        redirectTo: 'inicio/prepagado',
    },
];
