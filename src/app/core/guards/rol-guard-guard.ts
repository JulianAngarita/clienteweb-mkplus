import { CanActivateFn } from '@angular/router';

export const rolGuardGuard: CanActivateFn = (route, state) => {
  const usuario = localStorage.getItem('usuario');

  if (!usuario) {
    return false;
  }

  let datosUsuario;
  try {
    datosUsuario = JSON.parse(usuario);
  } catch (e) {
    return false;
  }

  const rol = datosUsuario?.rol;

  return rol === 'ADMINISTRADOR SISTEMA' || rol === 'IMPORTADORA';
}
