import { Categoria } from "./Categoria";
import { Marca } from "./Marca";

export interface Producto {
  idProducto: number;
  nombre: string;
  idCategoria: number;
  idMarca: number;
  descripcion: string;
  precioUnitario: number;
  stock: number;
  nombreImagen: string;
  rutaImagen: string;
  fecVencimiento: string;
  fecRegistro: string;
  productoCategoria: Categoria;
  productoMarca: Marca;
}
