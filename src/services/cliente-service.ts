import axios from "axios";
import { Cliente } from "../models/Cliente";
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
