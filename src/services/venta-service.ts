import axios from "axios";
import { Venta } from "../interfaces/Venta";
import { apiBaseUrl } from "./apiBaseUrl";
import { formatoFecha } from "../utils/dateFormat";

export const obtenerVentas = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/Venta/listar`);
    if (response.status === 200) {
      const data = response.data.data.map((item: Venta) => ({
        idVenta: item.idVenta,
        idTransaccion: item.idTransaccion,
        nombreCliente: item.nombreCliente,
        direccionEnvio: item.direccionEnvio,
        totalProductos: item.totalProductos,
        montoTotal: item.montoTotal,
        fecVenta: item.fecVenta,
      }));
      return data;
    } else {
      throw new Error("Error al obtener las ventas");
    }
  } catch (error) {
    console.error("Error: ", error);
  }
}

export const exportarListadoVentas = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/Venta/exportar`, { responseType: "blob" });
    if (response.status === 200) {
      alert("El listado de ventas se descargará en breve.");
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      const date = new Date();
      link.setAttribute("download", `Listado-ventas-${formatoFecha(date.toDateString())}.xlsx`);
      document.body.appendChild(link);
      link.click();
    } else {
      throw new Error("Error al exportar las ventas");
    }
  } catch (error) {
    console.error(error);
  }
}