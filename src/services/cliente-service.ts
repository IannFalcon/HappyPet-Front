import axios from "axios";
import { Cliente } from "../interfaces/Cliente";
import { formatoFecha } from "../utils/dateFormat";
import { apiBaseUrl } from "./apiBaseUrl";

export const obtenerClientes = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/Cliente`);
    if (response.status === 200) {
      const data = response.data.data.map((item: Cliente) => ({
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
      throw new Error("Error al obtener los clientes");
    }
  } catch (error) {
    console.error(error);
  }
}

export const obtenerDatosCliente = async (idUsuario: number) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/Cliente/${idUsuario}`);
    if (response.status === 200) {
      const data = response.data.data;
      return {
        idUsuario: data.idUsuario,
        nombre: data.nombre,
        apellidoPaterno: data.apellidoPaterno,
        apellidoMaterno: data.apellidoMaterno,
        nroDocumento: data.nroDocumento,
        telefono: data.telefono,
        direccion: data.direccion,
        correo: data.correo,
        fecRegistro: formatoFecha(data.fecRegistro),
        usuTipoDoc: {
          idTipoDocumento: data.usuTipoDoc.idTipoDocumento,
          descripcion: data.usuTipoDoc.descripcion,
        },
        usuTipoUsu: {
          idTipoUsuario: data.usuTipoUsu.idTipoUsuario,
          descripcion: data.usuTipoUsu.descripcion,
        }
      };
    } else {
      throw new Error("Error al obtener los datos del cliente");
    }
  } catch (error) {
    console.error(error);
  }
}

export const registrarCliente = async (dataToSend: any) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/Cliente`, dataToSend);
    if (response.status === 200) {
      alert(response.data.mensaje);
    } else {
      alert("Error al registrar cliente");
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      alert(error.response.data.mensaje);
    } else {
      console.error("Error: ", error);
      alert("Ocurrió un error al registrar el cliente");
    }
  }
}

export const actualizarCliente = async (dataToSend: any) => {
  try {
    const response = await axios.put(`${apiBaseUrl}/Cliente`, dataToSend);
    if (response.status === 200) {
      alert(response.data.mensaje);
    } else {
      alert("Error al registrar cliente");
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      alert(error.response.data.mensaje);
    } else {
      alert("Ocurrió un error al registrar el cliente");
    }
  }
}

export const eliminarCliente = async (idUsuario: number) => {
  try {
    const response = await axios.delete(`${apiBaseUrl}/Cliente/${idUsuario}`);
    if(response.status === 200) {
      alert(response.data.mensaje);
    } else {
      alert("Error al eliminar al cliente");
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      alert(error.response.data.mensaje);
    } else {
      console.error("Error: ", error);
      alert("Ocurrió un error durante la eliminación del cliente");
    }
  }
}

export const exportarListadoClientes = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/Cliente/exportar`, { responseType: "blob" });
    if (response.status === 200) {
      alert("El listado de clientes se descargará en breve.");
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      const date = new Date();
      link.setAttribute("download", `Listado-clientes-${formatoFecha(date.toDateString())}.xlsx`);
      document.body.appendChild(link);
      link.click();
    } else {
      throw new Error("Error al exportar los clientes");
    }
  } catch (error) {
    console.error(error);
  }
}