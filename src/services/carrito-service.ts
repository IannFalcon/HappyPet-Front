import axios from "axios";
import { apiBaseUrl } from "./apiBaseUrl";
import { Carrito } from "../interfaces/Carrito";
import { obtenerIdCliente } from "../utils/localStorage";

const idCliente = obtenerIdCliente();

export const obtenerProductosCarrito = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/Carrito/productos/${idCliente}`);
    if (response.status === 200) {
      return response.data.data;
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

export const accionesCarrito = async (dataToSend: any) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/Carrito/acciones`, dataToSend);
    if (response.status === 200) {
      const mensaje = response.data.mensaje;
      console.log(mensaje);
      return;
    } else {
      console.error(response);
      alert("Error al agregar o eliminar un producto del carrito");
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      alert(error.response.data.mensaje);
    } else {
      console.error("Error: ", error);
      alert("Ocurrió un error inesperado. Por favor, inténtelo de nuevo");
    }
  }
};