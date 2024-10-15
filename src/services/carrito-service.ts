import axios from "axios";
import { apiBaseUrl } from "./apiBaseUrl";
import { Carrito } from "../models/Carrito";
import { obtenerIdUsuario } from "../utils/localStorage";

const idUsuario = obtenerIdUsuario();

export const obtenerProductosCarrito = async () => {
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
};

export const cantidadProductosCarrito = async () => {
  try {
    const data = await obtenerProductosCarrito(); // Se obtienen los productos del carrito
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

export const accionesCarrito = async (idProducto: number, accion: boolean) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/Carrito?idUsuario=${idUsuario}&idProducto=${idProducto}&accion=${accion}`);
    if (response.status === 200) {
      const mensaje = response.data.mensaje;
      switch (mensaje) {
        case "AUMENTADO":
          alert("La cantidad del producto ha sido aumentada");
          break;
        case "REDUCIDO":
          alert("La cantidad del producto ha sido reducida");
          break;
        case "ELIMINADO":
          alert("El producto ha sido eliminado del carrito");
          break;
        case "AÑADIDO":
          alert("El producto ha sido añadido al carrito");
          break;
        case "SIN_STOCK":
          alert("No hay suficiente stock del producto");
          break;
        default:
          alert("Error al agregar o eliminar un producto del carrito");
          break;
      }
      
      return;
    } else {
      console.error(response);
      alert("Error al agregar o eliminar un producto del carrito");
    }
  } catch (error) {
    console.error(error);
  }
};