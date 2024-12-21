import axios from "axios";
import { Empleado } from "../interfaces/Empleado";
import { formatoFecha } from "../utils/dateFormat";
import { apiBaseUrl } from "./apiBaseUrl";

export const obtenerEmpleados = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/Empleado/listar`);
    if (response.status === 200) {
      const data = response.data.data.map((item: Empleado) => ({
        idEmpleado: item.idEmpleado,
        cargo: {
          idCargo: item.cargo.idCargo,
          nombreCargo: item.cargo.nombreCargo,
        },
        nombres: item.nombres,
        apellidoPaterno: item.apellidoPaterno,
        apellidoMaterno: item.apellidoMaterno,
        tipoDocumento: {
          idTipoDoc: item.tipoDocumento.idTipoDoc,
          nombreTipoDoc: item.tipoDocumento.nombreTipoDoc,
        },
        nroDocumento: item.nroDocumento,
        telefono: item.telefono,
        correo: item.correo,
        direccion: item.direccion,
        fecRegistro: formatoFecha(item.fecRegistro),
      }));
      return data;
    } else {
      throw new Error("Error al obtener los empleados");
    }
  } catch (error) {
    console.error(error);
  }
}

export const obtenerDatosEmpleado = async (idEmpleado: number) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/Empleado/obtener/${idEmpleado}`);
    if (response.status === 200) {
      const data = response.data.data.map((item: Empleado) => ({
        idEmpleado: item.idEmpleado,
        cargo: {
          idCargo: item.cargo.idCargo,
          nombreCargo: item.cargo.nombreCargo,
        },
        nombres: item.nombres,
        apellidoPaterno: item.apellidoPaterno,
        apellidoMaterno: item.apellidoMaterno,
        tipoDocumento: {
          idTipoDoc: item.tipoDocumento.idTipoDoc,
          nombreTipoDoc: item.tipoDocumento.nombreTipoDoc,
        },
        nroDocumento: item.nroDocumento,
        telefono: item.telefono,
        correo: item.correo,
        direccion: item.direccion,
        fecRegistro: formatoFecha(item.fecRegistro),
      }));
      return data;
    } else {
      throw new Error("Error al obtener los datos del empleado");
    }
  } catch (error) {
    console.error(error);
  }
}

export const registrarEmpleado = async (dataToSend: any) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/Empleado/registrar`, dataToSend);
    if(response.status === 200) {
      alert(response.data.mensaje);
    } else {
      alert("Error al registrar al empleado");
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      alert(error.response.data.mensaje);
    } else {
      console.error("Error: ", error);
      alert("Ocurrió un error al registrar al empleado");
    }
  }
}

export const actualizarEmpleado = async (idEmpleado: number, dataToSend: any) => {
  try {
    const response = await axios.put(`${apiBaseUrl}/Empleado/actualizar/${idEmpleado}`, dataToSend);
    if(response.status === 200) {
      alert(response.data.mensaje);
    } else {
      alert("Error al registrar al empleado");
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      alert(error.response.data.mensaje);
    } else {
      console.error("Error: ", error);
      alert("Ocurrió un error al actualizar al empleado");
    }
  }
}

export const eliminarEmpleado = async (idEmpleado: number) => {
  try {
    const response = await axios.delete(`${apiBaseUrl}/Empleado/eliminar/${idEmpleado}`);
    if(response.status === 200) {
      alert(response.data.mensaje);
    } else {
      alert("Error al eliminar al empleado");
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      alert(error.response.data.mensaje);
    } else {
      console.error("Error: ", error);
      alert("Ocurrió un error durante la eliminación del empleado");
    }
  }
}

export const exportarListadoEmpleados = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/Empleado/exportar`, { responseType: "blob" });
    if (response.status === 200) {
      alert("El listado de empleados se descargará en breve.");
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      const date = new Date();
      link.setAttribute("download", `Listado-empleados-${formatoFecha(date.toDateString())}.xlsx`);
      document.body.appendChild(link);
      link.click();
    } else {
      throw new Error("Error al exportar los empleados");
    }
  } catch (error) {
    console.error(error);
  }
}