export const obtenerUsuario = () => {
  const usuario = localStorage.getItem('usuario');
  return usuario ? JSON.parse(usuario) : null;
}

export const obtenerIdUsuario = () => {
  const usuario = obtenerUsuario();
  return usuario ? usuario.data.idUsuario : null;
}

export const obtenerIdCliente = () => {
  const usuario = obtenerUsuario();
  return usuario ? usuario.data.idCliente : null;
}

export const obtenerRolUsuario = () => {
  const usuario = obtenerUsuario();
  return usuario ? usuario.data.rol : null;
}

export const obtenerNombreUsuario = () => {
  const usuario = obtenerUsuario();
  return usuario ? usuario.data.nombreUsuario : null;
}
