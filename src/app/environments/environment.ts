// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api: 'http://localhost:3000/api/v1',
  frontend: 'http://localhost:4200/',
  bucket: 'ivuo-dev',
  paths: {
    usuario: '/usuario',
    operaciones: '/operaciones',
    firma_solicitud: '/firma-solicitud',
    servicio: '/servicio',
    terminos: '/terminosyCondiciones',
    repuesto: '/repuesto',
    versiones: '/version',
    paquetes: '/paquetes',
    concesion: '/concesion',
    autenticacion: '/autenticar',
    variables: '/variablesCalculo',
    solicitudes: '/solicitudAdquisicion',
    temparioPrepagado: '/prepagado',
    tempario: '/tempario',
    modelos: '/modelo',
    cotizador: '/cotizador',
    clientes: '/clientes',
    vehiculos: '/vehiculos',
    catalogo: '/catalogo'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
