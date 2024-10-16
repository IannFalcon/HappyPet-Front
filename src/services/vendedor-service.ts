import axios from "axios";
import { Vendedor } from "../models/Vendedor";
import { formatoFecha } from "../utils/dateFormat";

export const obtenerVendedores = async () => {
  try {
    const response = await axios.get("http://192.168.0.3:5045/api/Vendedor");
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