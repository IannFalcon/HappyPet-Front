import axios from "axios"
import { apiBaseUrl } from "./apiBaseUrl";
import { Proveedor } from "../interfaces/Proveedor";
import { formatoFecha } from "../utils/dateFormat";

export const obtenerProveedores = async () => {
  try {
    const reponse = await axios.get(`${apiBaseUrl}/Proveedor/listar`);
    if (reponse.status === 200) {
      const data = reponse.data.data.map((item: Proveedor) => ({
        idProveedor: item.idProveedor,
        rucProveedor: item.rucProveedor,
        nombreProveedor: item.nombreProveedor,
        nroTelefono: item.nroTelefono,
        correo: item.correo,
        direccion: item.direccion,
        fecRegistro: item.fecRegistro
      }));
      return data;
    } else {
      throw new Error("Error al obtener los proveedores");
    }
  } catch (error) {
    console.error(error);
  }
}

export const registrarProveedor = async (dataToSend: any) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/Proveedor/registrar`, dataToSend);
    if (response.status === 200) {
      alert(response.data.mensaje);
    } else {
      alert("Error al registrar proveedor");
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      alert(error.response.data.mensaje);
    } else {
      console.error(error);
      alert("Ocurrió un error al registrar el proveedor");
    }
  }
}

export const actualizarProveedor = async (idProveedor: number, dataToSend: any) => {
  try {
    const response = await axios.put(`${apiBaseUrl}/Proveedor/actualizar/${idProveedor}`, dataToSend);
    if (response.status === 200) {
      alert(response.data.mensaje);
    } else {
      alert("Error al actualizar proveedor");
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      alert(error.response.data.mensaje);
    } else {
      console.error(error);
      alert("Ocurrió un error al actualizar el proveedor");
    }
  }
}

export const eliminarProveedor = async (idProveedor: number) => {
  try {
    const response = await axios.delete(`${apiBaseUrl}/Proveedor/eliminar/${idProveedor}`);
    if (response.status === 200) {
      alert(response.data.mensaje);
    } else {
      alert("Error al eliminar proveedor");
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      alert(error.response.data.mensaje);
    } else {
      console.error(error);
      alert("Ocurrió un error al eliminar el proveedor");
    }
  }
}

export const exportarListadoProveedores = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/Proveedor/exportar`, { responseType: "blob" });
    if (response.status === 200) {
      alert("El listado de proveedores se descargará en breve.");
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      const date = new Date();
      link.setAttribute("download", `Listado-proveedores-${formatoFecha(date.toDateString())}.xlsx`);
      document.body.appendChild(link);
      link.click();
    } else {
      throw new Error("Error al exportar los clientes");
    }
  } catch (error) {
    console.error(error);
  }
}