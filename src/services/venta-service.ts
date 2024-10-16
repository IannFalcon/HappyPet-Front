import axios from "axios";
import { Venta } from "../models/Venta";
import { apiBaseUrl } from "./apiBaseUrl";

export const obtenerVentas = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/Venta`);
    if (response.status === 200) {
      const data = response.data.data.map((item: Venta) => ({
        idVenta: item.idVenta,
        idUsuario: item.idUsuario,
        totalProductos: item.totalProductos,
        montoTotal: item.montoTotal,
        idTransaccion: item.idTransaccion,
        fecVenta: item.fecVenta,
        usuarioVenta: {
          idUsuario: item.usuarioVenta.idUsuario,
          nombre: item.usuarioVenta.nombre,
          apellidoPaterno: item.usuarioVenta.apellidoPaterno,
          apellidoMaterno: item.usuarioVenta.apellidoMaterno,
        }
      }));
      return data;
    } else {
      throw new Error("Error al obtener las ventas");
    }
  } catch (error) {
    console.error("Error: ", error);
  }
}