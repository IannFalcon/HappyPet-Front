import axios from "axios";
import { apiBaseUrl } from "./apiBaseUrl";
import { Carrito } from "../models/Carrito";

export const obtenerProductos = async (idUsuario: number) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/Carrito/${idUsuario}`);
    if (response.status === 200) {
      const data = response.data.data.map((item: Carrito) => ({
        idCarrito: item.idCarrito,
        idUsuario: item.idUsuario,
        idProducto: item.idProducto,
        cantidad: item.cantidad,
        productosCarrito: item.productosCarrito,
      }));
      return data;
    } else {
      console.error(response);
      alert("Error al obtener los productos del carrito");
    }
  } catch (error) {
    console.error(error);
  }
}

export const cantidadProductosCarrito = async (idUsuario: number) => {
  try {
    const data = await obtenerProductos(idUsuario); // Se obtienen los productos del carrito
    if (data) {
      // Se suman las cantidades de los productos del carrito
      const cantidadProductos = data.reduce((acc: number, item: Carrito) => acc + item.cantidad, 0);
      // Se retorna la cantidad de productos del carrito
      return cantidadProductos;
    } else {
      console.error("Error al obtener los productos del carrito");
      alert("Error al obtener la cantidad de productos del carrito");
    }
  } catch (error) {
    console.error(error);
  }
};