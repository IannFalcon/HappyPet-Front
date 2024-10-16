import axios from "axios";
import { apiBaseUrl } from "./apiBaseUrl";

export const obtenerMarcas = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/Marca`);
    if (response.status === 200) {
      return response.data.data;
    } else {
      throw new Error("Error al obtener las marcas");
    }
  } catch (error) {
    console.error(error);
  }
}