export interface Venta {
  idVenta: number;
  idUsuario: number;
  totalProductos: number;
  montoTotal: number;
  idTransaccion: string;
  fecVenta: string;
  usuarioVenta: {
    idUsuario: number;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
  }
}