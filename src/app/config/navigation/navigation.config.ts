export const NAVIGATION_NAVBAR_MENUS = {
  tienda: [
    { label: 'Inicio', path: '/inicio/prepagado' },
  ],
  admin: [
    { label: 'Inicio', path: '/inicio/prepagado' },
    { label: 'Tienda', path: '/tienda/home' },
  ],
  default: [
    // { label: 'Administrador', path: '/admin/home' },
    { label: 'Tienda', path: '/tienda/home' },
  ],
};

export const NAVIGATION_MENUS = {
  tienda: [
    { label: 'Selección Modelo', path: '/tienda/seleccion-modelo' },
    { label: 'Cotizador Tienda', path: '/tienda/cotizador-tienda' },
    { label: 'Detalles Modelo', path: '/tienda/detalles-modelo' },
    { label: 'Formulario Cliente', path: '/tienda/formulario-cliente' },
    { label: 'Formulario Envío', path: '/tienda/formulario-envio' },
    { label: 'Formulario Vehículo', path: '/tienda/formulario-vehiculo' },
    { label: 'Resumen Pedido', path: '/tienda/resumen-pedido' },
  ],
  admin: [
    {
      label: 'Acuerdo',
      path: '/admin/acuerdo',
      descripcion: 'Gestión de acuerdos comerciales y condiciones entre concesionarios.', config: true
    },
    {
      label: 'Carga Reporte Retail',
      path: '/admin/carga-reporte-retail',
      descripcion: 'Sube y administra reportes de ventas y desempeño retail.',
      config: true
    },
    {
      label: 'Comisiones',
      path: '/admin/comisiones',
      descripcion: 'Control y configuración de las comisiones generadas por los servicios.',
      config: true
    },
    {
      label: 'Complementarios',
      path: '/admin/complementarios',
      descripcion: 'Administra los servicios o productos complementarios disponibles.',
      config: true
    },
    {
      label: 'Concesiones',
      path: '/admin/concesiones',
      descripcion: 'Gestión integral de concesionarios y sus parámetros de operación.',
      config: true
    },
    {
      label: 'Modelos',
      path: '/admin/modelos',
      descripcion: 'Gestión de los modelos de vehículos registrados en la plataforma.',
      config: true
    },
    {
      label: 'Operaciones',
      path: '/admin/operaciones',
      descripcion: 'Supervisa y administra las operaciones diarias del sistema.',
      config: true
    },
    {
      label: 'Gestión de paquetes',
      path: '/admin/paquetes',
      descripcion: 'Crea, edita y gestiona paquetes de servicios o mantenimiento.',
      config: true
    },
    {
      label: 'Paquetes',
      path: '/admin/presentacion-modelos',
      descripcion: 'Paquetes disponibles en la oferta comercial',
      config: false
    },
    {
      label: 'Redimir',
      path: '/admin/redimir',
      descripcion: 'Gestión del proceso de redención de servicios o beneficios.',
      config: false
    },
    {
      label: 'Reportes',
      path: '/admin/reportes',
      descripcion: 'Genera, descarga y analiza reportes del sistema y del negocio.',
      config: false
    },
    {
      label: 'Repuestos',
      path: '/admin/repuestos',
      descripcion: 'Gestión del inventario y catálogo de repuestos disponibles.',
      config: true
    },
    {
      label: 'Servicios',
      path: '/admin/servicios',
      descripcion: 'Control y configuración de los servicios ofrecidos al cliente.',
      config: true
    },
    {
      label: 'Solicitudes',
      path: '/admin/solicitudes',
      descripcion: 'Supervisa las solicitudes de servicio o mantenimiento registradas.',
      config: false
    },
    {
      label: 'Nueva solicitud',
      path: '/admin/nueva-solicitud/id',
      descripcion: 'Genera una nueva solicitud.',
      config: false
    },
    {
      label: 'Temparios Normal',
      path: '/admin/temparios-normal',
      descripcion: 'Configura y consulta los tiempos estándar de servicio normal.',
      config: true
    },
    {
      label: 'Temparios Prepagado',
      path: '/admin/temparios-prepagado',
      descripcion: 'Control de tiempos y costos para servicios prepagados.',
      config: true
    },
    {
      label: 'Términos y Condiciones',
      path: '/admin/terminos-condiciones',
      descripcion: 'Edita y publica los términos legales de la plataforma.',
      config: true
    },
    {
      label: 'Usuarios',
      path: '/admin/usuarios',
      descripcion: 'Gestión completa de usuarios, roles y permisos de acceso.',
      config: true
    },
    {
      label: 'Variables',
      path: '/admin/variables',
      descripcion: 'Configura las variables globales y parámetros del sistema.',
      config: true
    },
    // {
    //   label: 'Vehículos',
    //   path: '/admin/vehiculos',
    //   descripcion: 'Administración del catálogo de vehículos registrados.',
    //   config: true
    // },
    {
      label: 'Versiones',
      path: '/admin/versiones',
      descripcion: 'Control de versiones y variantes de los modelos de vehículos.',
      config: true
    },
    // {
    //   label: 'Vistas Presentación Modelos',
    //   path: '/admin/vistas-presentacion-modelos',
    //   descripcion: 'Gestiona las vistas y layouts de presentación de modelos en el front.',
    //   config: true
    // },
  ]

};
