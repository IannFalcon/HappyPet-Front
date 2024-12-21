export interface Cliente {
  idUsuario: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  nroDocumento: string;
  telefono: string;
  direccion: string;
  correo: string;
  fecRegistro: string;
  usuTipoDoc: {
    idTipoDocumento: number;
    descripcion: string;
  }
  usuTipoUsu: {
    idTipoUsuario: number;
    descripcion: string;
  }
}