import axios from "axios";
import { Vendedor } from "../interfaces/Vendedor";
import { formatoFecha } from "../utils/dateFormat";
import { apiBaseUrl } from "./apiBaseUrl";

export const obtenerVendedores = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/Vendedor`);
    if (response.status === 200) {
      const data = response.data.data.map((item: Vendedor) => ({
        idUsuario: item.idUsuario,
        nombre: item.nombre,
        apellidoPaterno: item.apellidoPaterno,
        apellidoMaterno: item.apellidoMaterno,
        nroDocumento: item.nroDocumento,
        telefono: item.telefono,
        direccion: item.direccion,
        correo: item.correo,
        fecRegistro: formatoFecha(item.fecRegistro),
        usuTipoDoc: {
          idTipoDocumento: item.usuTipoDoc.idTipoDocumento,
          descripcion: item.usuTipoDoc.descripcion,
        },
        usuTipoUsu: {
          idTipoUsuario: item.usuTipoUsu.idTipoUsuario,
          descripcion: item.usuTipoUsu.descripcion,
        }  
      }));
      return data;
    } else {
      throw new Error("Error al obtener los vendedores");
    }
  } catch (error) {
    console.error(error);
  }
}

export const registrarVendedor = async (dataToSend: any) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/Vendedor`, dataToSend);
    if(response.status === 200) {
      alert(response.data.mensaje);
    } else {
      alert("Error al registrar vendedor");
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      alert(error.response.data.mensaje);
    } else {
      console.error("Error: ", error);
      alert("Ocurrió un error al registrar el vendedor");
    }
  }
}

export const actualizarVendedor = async (dataToSend: any) => {
  try {
    const response = await axios.put(`${apiBaseUrl}/Vendedor`, dataToSend);
    if(response.status === 200) {
      alert(response.data.mensaje);
    } else {
      alert("Error al registrar vendedor");
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      alert(error.response.data.mensaje);
    } else {
      console.error("Error: ", error);
      alert("Ocurrió un error al registrar el vendedor");
    }
  }
}

export const eliminarVendedor = async (idUsuario: number) => {
  try {
    const response = await axios.delete(`${apiBaseUrl}/Vendedor/${idUsuario}`);
    if(response.status === 200) {
      alert(response.data.mensaje);
    } else {
      alert("Error al eliminar al vendedor");
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      alert(error.response.data.mensaje);
    } else {
      console.error("Error: ", error);
      alert("Ocurrió un error durante la eliminación del vendedor");
    }
  }
}

export const exportarListadoVendedores = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/Vendedor/exportar`, { responseType: "blob" });
    if (response.status === 200) {
      alert("El listado de vendedores se descargará en breve.");
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      const date = new Date();
      link.setAttribute("download", `Listado-vendedores-${formatoFecha(date.toDateString())}.xlsx`);
      document.body.appendChild(link);
      link.click();
    } else {
      throw new Error("Error al exportar los vendedores");
    }
  } catch (error) {
    console.error(error);
  }
}