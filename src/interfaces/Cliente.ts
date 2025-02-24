export interface Cliente {
  idCliente: number;
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
  fecRegistro: string;
}