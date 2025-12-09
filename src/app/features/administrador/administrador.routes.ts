import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./administrador-home/administrador-home').then(m => m.AdministradorHome)
  },
  {
    path: 'carga-reporte-retail',
    loadComponent: () =>
      import('./carga-reporte-retail/carga-reporte-retail').then((m) => m.CargaReporteRetail),
  },
  {
    path: 'clientes',
    loadComponent: () =>
      import('./clientes/clientes').then((m) => m.Clientes),
  },
  {
    path: 'comisiones',
    loadComponent: () =>
      import('./comisiones/comisiones').then((m) => m.Comisiones),
  },
  {
    path: 'complementarios',
    loadComponent: () =>
      import('./complementarios/complementarios').then((m) => m.Complementarios),
  },
  {
    path: 'concesiones',
    loadComponent: () =>
      import('./concesiones/concesiones').then((m) => m.Concesiones),
  },
  {
    path: 'detalles-servicio/:id',
    loadComponent: () => 
      import('./detalles-servicio/detalles-servicio').then((m) => m.DetallesServicio)
  },
  {
    path: 'detalles/:id',
    loadComponent: () =>
      import('./detalles/detalles').then((m) => m.Detalles),
  },
  {
    path: 'modelos',
    loadComponent: () =>
      import('./modelos/modelos').then((m) => m.Modelos),
  },
  {
    path: 'operaciones',
    loadComponent: () =>
      import('./operaciones/operaciones').then((m) => m.Operaciones),
  },
  {
    path: 'paquetes',
    loadComponent: () =>
      import('./paquetes/paquetes').then((m) => m.Paquetes),
  },
  {
    path: 'presentacion-modelos',
    loadComponent: () =>
      import('./presentacion-modelos/presentacion-modelos').then((m) => m.PresentacionModelos),
  },
  {
    path: 'principal',
    loadComponent: () =>
      import('./principal/principal').then((m) => m.Principal),
  },
  {
    path: 'redimir',
    loadComponent: () =>
      import('./redimir/redimir').then((m) => m.Redimir),
  },
  {
    path: 'reportes',
    loadComponent: () =>
      import('./reportes/reportes').then((m) => m.Reportes),
  },
  {
    path: 'repuestos',
    loadComponent: () =>
      import('./repuestos/repuestos').then((m) => m.Repuestos),
  },
  {
    path: 'servicios',
    loadComponent: () =>
      import('./servicios/servicios').then((m) => m.Servicios),
  },
  {
    path: 'solicitudes',
    loadComponent: () =>
      import('./solicitudes/solicitudes').then((m) => m.Solicitudes),
  },
  {
    path: 'nueva-solicitud/:id',
    loadComponent: () =>
      import('./nueva-solicitud/nueva-solicitud').then((m) => m.NuevaSolicitud),
  },
  {
    path: 'temparios-normal',
    loadComponent: () =>
      import('./temparios-normal/temparios-normal').then((m) => m.TempariosNormal),
  },
  {
    path: 'temparios-prepagado',
    loadComponent: () =>
      import('./temparios-prepagado/temparios-prepagado').then((m) => m.TempariosPrepagado),
  },
  {
    path: 'terminos-condiciones',
    loadComponent: () =>
      import('./terminos-condiciones/terminos-condiciones').then((m) => m.TerminosCondiciones),
  },
  {
    path: 'usuarios',
    loadComponent: () =>
      import('./usuarios/usuarios').then((m) => m.Usuarios),
  },
  {
    path: 'variables',
    loadComponent: () =>
      import('./variables/variables').then((m) => m.Variables),
  },
  {
    path: 'vehiculos',
    loadComponent: () =>
      import('./vehiculos/vehiculos').then((m) => m.Vehiculos),
  },
  {
    path: 'versiones',
    loadComponent: () =>
      import('./versiones/versiones').then((m) => m.Versiones),
  },
  {
    path: 'vistas-presentacion-modelos',
    loadComponent: () => import('./vistas-presentacion-modelos/vistas-presentacion-modelos').then((m) => m.VistasPresentacionModelos),
  },
];
