import { Producto } from "./Producto";

export interface Carrito {
  idCarrito: number;
  idUsuario: number;
  idProducto: number;
  cantidad: number;
  productosCarrito: Producto;
}