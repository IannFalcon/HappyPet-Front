import axios from "axios";
import { apiBaseUrl } from "./apiBaseUrl";
import { formatoFecha } from "../utils/dateFormat";

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

export const exportarListadoMarcas = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/Marca/exportar`, { responseType: "blob" });
    if (response.status === 200) {
      alert("La lista de marcas se descargará en breve.");
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      const date = new Date();
      link.setAttribute("download", `Listado-marcas-${formatoFecha(date.toDateString())}.xlsx`);
      document.body.appendChild(link);
      link.click();
    } else {
      throw new Error("Error al exportar las marcas");
    }
  } catch (error) {
    console.error(error);
  }
}