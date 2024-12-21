import { Cliente } from "./Cliente";

export interface Venta {
  idVenta: number;
  idUsuario: number;
  totalProductos: number;
  montoTotal: number;
  idTransaccion: string;
  fecVenta: string;
  usuarioVenta: Cliente;
}