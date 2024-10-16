import axios from "axios";
import { apiBaseUrl } from "./apiBaseUrl";

export const obtenerCategorias = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/Categoria`);
    if (response.status === 200) {
      return response.data.data;
    } else {
      throw new Error("Error al obtener las categorías");
    }
  } catch (error) {
    console.error(error);
  }
}