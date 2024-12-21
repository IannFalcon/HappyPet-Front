export interface Venta {
  idVenta: number;
  idTransaccion: string;
  nombreCliente: string;
  direccionEnvio: string;
  totalProductos: number;
  montoTotal: number;
  fecVenta: string;
}