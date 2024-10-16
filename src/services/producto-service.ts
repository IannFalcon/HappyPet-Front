import axios from "axios";
import { Producto } from "../models/Producto";
import { formatoFecha } from "../utils/dateFormat";
import { apiBaseUrl } from "./apiBaseUrl";

export const obtenerProductos = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/Producto`);
    if (response.status === 200) {
      const data = response.data.data.map((item: Producto) => ({
        idProducto: item.idProducto,
        nombre: item.nombre,
        idCategoria: item.idCategoria,
        idMarca: item.idMarca,
        descripcion: item.descripcion,
        precioUnitario: item.precioUnitario,
        stock: item.stock,
        nombreImagen: item.nombreImagen,
        rutaImagen: item.rutaImagen,
        fecVencimiento: item.fecVencimiento ? formatoFecha(item.fecVencimiento) : null,
        fecRegistro: formatoFecha(item.fecRegistro),
        productoCategoria: item.productoCategoria,
        productoMarca: item.productoMarca,
      }));
      return data;
    } else {
      throw new Error("Error al obtener los productos");
    }
  } catch (error) {
    console.error(error);
    alert("Ocurrió un error al obtener los productos");
  }
}