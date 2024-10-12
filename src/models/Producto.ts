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
  productoCategoria: {
    idCategoria: number;
    nombre: string;
  };
  productoMarca: {
    idMarca: number;
    nombre: string;
  };
}
