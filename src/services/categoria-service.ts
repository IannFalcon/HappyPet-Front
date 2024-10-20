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

export const registrarCategoria = async (dataToSend: any) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/Categoria`, dataToSend);
    if(response.status === 200) {
      alert(response.data.mensaje);
    } else {
      alert("Error al registrar categoría");
    }
  } catch (error) {
    console.error("Error: ", error);
    alert("Ocurrió un error al registrar la categoría");
  }
}

export const actualizarCategoria = async (dataToSend: any) => {
  try {
    const response = await axios.put(`${apiBaseUrl}/Categoria`, dataToSend);
    if(response.status === 200) {
      alert(response.data.mensaje);
    } else {
      alert("Error al actualizar categoría");
    }
  } catch (error) {
    console.error("Error: ", error);
    alert("Ocurrió un error al actualizar la categoría");
  }
}

export const eliminarCategoria = async (idCategoria: number) => {
  try {
    const response = await axios.delete(`${apiBaseUrl}/Categoria/${idCategoria}`);
    if(response.status === 200) {
      alert(response.data.mensaje);
      window.location.reload();
    } else {
      alert("Error al eliminar la categoría");
    }
  } catch (error) {
    console.error("Error: ", error);
    alert("Ocurrió un error al eliminar la categoría");
  }
}