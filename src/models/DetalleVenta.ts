import { Producto } from "./Producto";

export interface DetalleVenta {
  idDetalleVenta: number,
  idVenta: number,
  idProducto: number,
  cantidad: number,
  total: number,
  productoDetalle: Producto
}