import axios from "axios";
import { apiBaseUrl } from "./apiBaseUrl";

export const ObtenerContadorVentas = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/Contador/Ventas`);
    if(response.status === 200){
      const totalVentas = response.data.data.totalVentas;
      const totalImporteVentas = response.data.data.totalImporteVentas;
      return { totalVentas, totalImporteVentas };
    } else {
      alert(response.data.mensaje);
    }
  } catch(error) {
    manejarError(error);
  }
};

export const ObtenerContadorProductos = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/Contador/Productos`);
    if(response.status === 200){
      return response.data.data;
    } else {
      alert(response.data.mensaje);
    }
  } catch(error) {
    manejarError(error);
  }
}

export const ObtenerContadorCategorias = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/Contador/Categorias`);
    if(response.status === 200){
      return response.data.data;
    } else {
      alert(response.data.mensaje);
    }
  } catch(error) {
    manejarError(error);
  }
};

export const ObtenerContadorMarcas = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/Contador/Marcas`);
    if(response.status === 200){
      return response.data.data;
    } else {
      alert(response.data.mensaje);
    }
  } catch(error) {
    manejarError(error);
  }
};

export const ObtenerContadorClientes = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/Contador/Clientes`);
    if(response.status === 200){
      return response.data.data;
    } else {
      alert(response.data.mensaje);
    }
  } catch(error) {
    manejarError(error);
  }
};

export const ObtenerContadorEmpleados = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/Contador/Empleados`);
    if(response.status === 200){
      return response.data.data;
    } else {
      alert(response.data.mensaje);
    }
  } catch(error) {
    manejarError(error);
  }
};

const manejarError = (error: any) => {
  if (axios.isAxiosError(error) && error.response) {
    alert(error.response.data.mensaje);
  } else {
    console.error("Error: ", error);
  }
};