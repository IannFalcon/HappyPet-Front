import axios from "axios";
import { apiBaseUrl } from "./apiBaseUrl";

export const obtenerDireccionesCliente = async (idCliente: number) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/DireccionCliente/listar/${idCliente}`);
    if (response.status === 200) {
      return response.data.data;
    } else {
      console.error(response);
      alert("Error al obtener las direcciones del cliente");
    }
  } catch (error) {
    console.error(error);
  }
}

export const agregarDireccionCliente = async (dataToSend: any) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/DireccionCliente/agregar`, dataToSend);
    if (response.status === 200) {
      const mensaje = response.data.mensaje;
      console.log(mensaje);
      return;
    } else {
      console.error(response);
      alert("Error al agregar una dirección");
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