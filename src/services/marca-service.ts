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

export const registrarMarca = async (dataToSend: any) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/Marca`, dataToSend);
    if(response.status === 200) {
      alert(response.data.mensaje);
    } else {
      alert("Error al registrar marca");
    }
  } catch (error) {
    console.error("Error: ", error);
    alert("Ocurrió un error al registrar la marca");
  }
}

export const actualizarMarca = async (dataToSend: any) => {
  try {
    const response = await axios.put(`${apiBaseUrl}/Marca`, dataToSend);
    if(response.status === 200) {
      alert(response.data.mensaje);
    } else {
      alert("Error al actualizar marca");
    }
  } catch (error) {
    console.error("Error: ", error);
    alert("Ocurrió un error al actualizar la marca");
  }
}

export const eliminarMarca = async (idMarca: number) => {
  try {
    const response = await axios.delete(`${apiBaseUrl}/Marca/${idMarca}`);
    if(response.status === 200) {
      alert(response.data.mensaje);
    } else {
      alert("Error al eliminar la marca");
    }
  } catch (error) {
    console.error("Error: ", error);
    alert("Ocurrió un error al eliminar la marca");
  }
}