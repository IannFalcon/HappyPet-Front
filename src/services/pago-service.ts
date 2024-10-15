import axios from "axios";
import { apiBaseUrl } from "./apiBaseUrl";
import { obtenerIdUsuario } from "../utils/localStorage";

export const realizarPago = async (montoTotal: number) => {
  try{
    const response = await axios.post(`${apiBaseUrl}/Venta/${obtenerIdUsuario()}/${montoTotal}`);
    if(response.status === 200){
      window.location.replace(response.data.urlAprobada);
    } else {
      alert(response.data.mensaje);
    }
  } catch(error){
    manejarError(error);
  }
};

// Manejar la redirección de PayPal después de la aprobación o cancelación
export const manejarRedireccion = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const paymentId = urlParams.get('paymentId');
  const token = urlParams.get('token');
  const PayerID = urlParams.get('PayerID');
  const idUsuario = obtenerIdUsuario();

  if (paymentId && token && PayerID) {
    try {
      const response = await axios.get(`${apiBaseUrl}/Venta/ConfirmarVenta`, {
        params: { idUsuario, paymentId, token, PayerID }
      });
      if (response.status === 200) {
        alert(response.data.mensaje);
      } else {
        alert(response.data.mensaje);
      }
    } catch (error) {
      manejarError(error);
    } finally {
      window.location.replace("http://localhost:3000/happyPet/carrito");
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