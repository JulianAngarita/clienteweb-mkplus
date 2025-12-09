import { Routes } from '@angular/router';

export const TIENDA_ROUTES: Routes = [
  {
    path: 'home',
    loadComponent: () => 
      import('./tienda-home/tienda-home').then(
        m => m.TiendaHome
      )
  },
  {
    path: 'cotizador-tienda',
    loadComponent: () =>
      import('./cotizador-tienda/cotizador-tienda').then(
        (m) => m.CotizadorTienda
      ),
  },
  {
    path: 'formulario-cliente',
    loadComponent: () =>
      import('./formulario-cliente/formulario-cliente').then(
        (m) => m.FormularioCliente
      ),
  },
  {
    path: 'formulario-envio',
    loadComponent: () =>
      import('./formulario-envio/formulario-envio').then(
        (m) => m.FormularioEnvio
      ),
  },
  {
    path: 'formulario-vehiculo',
    loadComponent: () =>
      import('./formulario-vehiculo/formulario-vehiculo').then(
        (m) => m.FormularioVehiculo
      ),
  },
  {
    path: 'resumen-pedido',
    loadComponent: () =>
      import('./resumen-pedido/resumen-pedido').then(
        (m) => m.ResumenPedido
      ),
  },
  {
    path: 'seleccion-modelo',
    loadComponent: () =>
      import('./seleccion-modelo/seleccion-modelo').then(
        (m) => m.SeleccionModelo
      ),
  },
];
