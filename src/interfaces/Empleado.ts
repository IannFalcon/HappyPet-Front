export interface Empleado {
  idEmpleado: number;
  cargo: {
    idCargo: number;
    nombreCargo: string;
  }
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  tipoDocumento: {
    idTipoDoc: number;
    nombreTipoDoc: string;
  }
  nroDocumento: string;
  telefono: string;
  correo: string;
  direccion: string;
  fecRegistro: string;
}
