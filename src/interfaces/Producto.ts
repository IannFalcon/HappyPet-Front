import { Categoria } from "./Categoria";
import { Marca } from "./Marca";

export interface Producto {
  idProducto: number;
  nombre: string;
  categoria: Categoria;
  marca: Marca;
  descripcion: string;
  precioUnitario: number;
  stock: number;
  nombreImagen: string;
  rutaImagen: string;
  fecVencimiento: string;
  fecRegistro: string;
}
