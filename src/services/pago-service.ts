import axios from "axios";
import { apiBaseUrl } from "./apiBaseUrl";
import { obtenerIdCliente } from "../utils/localStorage";

export const realizarPago = async (montoTotal: number) => {
  try {
    localStorage.setItem('totalPago', montoTotal.toString());
    const idUsuario = obtenerIdCliente();
    const request = {
      IdCliente: idUsuario,
      TotalPago: montoTotal,
      IdTransaccion: "", // Inicialmente vacío, se llenará después de la aprobación
      PayerID: "", // Inicialmente vacío, se llenará después de la aprobación
      pais: "Perú",
      ciudad: "Lima",
      direccion: "Av. San Martin",
      codigoPostal: "12354"
    };

    const response = await axios.post(`${apiBaseUrl}/Venta/realizar`, request);
    if (response.status === 200) {
      window.location.replace(response.data.urlAprobada);
    } else {
      alert(response.data.mensaje);
    }
  } catch (error) {
    manejarError(error);
  }
};

// Manejar la redirección de PayPal después de la aprobación o cancelación
export const manejarRedireccion = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const paymentId = urlParams.get('paymentId');
  const token = urlParams.get('token');
  const PayerID = urlParams.get('PayerID');
  const idUsuario = obtenerIdCliente();

  if (paymentId && token && PayerID) {
    try {
      const totalPago = localStorage.getItem('totalPago') || 0;

      const request = {
        IdCliente: idUsuario,
        IdTransaccion: paymentId,
        PayerID: PayerID,
        TotalPago: totalPago,
        pais: "Perú",
        ciudad: "Lima",
        direccion: "Av. San Martin",
        codigoPostal: "12354"
      };

      const response = await axios.post(`${apiBaseUrl}/Venta/ConfirmarVenta`, request);
      if (response.status === 200) {
        alert(response.data.mensaje);
      } else {
        alert(response.data.mensaje);
      }
    } catch (error) {
      manejarError(error);
    } finally {
      window.location.replace("http://localhost:3000/carrito");
    }
  }
  return;
};

const manejarError = (error: any) => {
  if (axios.isAxiosError(error) && error.response) {
    alert(error.response.data.mensaje);
  } else {
    console.error("Error: ", error);
  }
};