import axios from "axios";
import { Producto } from "../models/Producto";
import { formatoFecha } from "../utils/dateFormat";
import { apiBaseUrl } from "./apiBaseUrl";
import { buildUrlWithParams } from "../utils/buildUrlWithParams";

export const obtenerProductos = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/Producto`);
    if (response.status === 200) {
      const data = response.data.data.map((item: Producto) => ({
        idProducto: item.idProducto,
        nombre: item.nombre,
        idCategoria: item.idCategoria,
        idMarca: item.idMarca,
        descripcion: item.descripcion,
        precioUnitario: item.precioUnitario,
        stock: item.stock,
        nombreImagen: item.nombreImagen,
        rutaImagen: item.rutaImagen,
        fecVencimiento: item.fecVencimiento ? formatoFecha(item.fecVencimiento) : null,
        fecRegistro: formatoFecha(item.fecRegistro),
        productoCategoria: item.productoCategoria,
        productoMarca: item.productoMarca,
      }));
      return data;
    } else {
      throw new Error("Error al obtener los productos");
    }
  } catch (error) {
    console.error(error);
    alert("Ocurrió un error al obtener los productos");
  }
}

export const obtenerProductosFiltrados = async (idCategoria?: number, idMarca?: number, nombre?: string) => {
  try {
    const url = buildUrlWithParams(`${apiBaseUrl}/Producto`, {
      id_categoria: idCategoria,
      id_marca: idMarca,
      nombre: nombre
    });
    const response = await axios.get(url);
    if (response.status === 200) {
      return response.data.data;
    } else {
      throw new Error("Error al obtener los productos");
    }
  } catch (error) {
    console.log(error);
  }
}

export const obtenerProductoPorId = async (idProducto: number) => {
  try{
    const response = await axios.get(`${apiBaseUrl}/Producto/${idProducto}`);
    if(response.status === 200) {
      return response.data.data;
    } else {
      alert("Error al obtener el producto");
    }
  } catch (error) {
    console.error("Error: ", error);
    alert("Ocurrió un error al obtener el producto");
  }
}

export const registrarProducto = async (dataToSend: any) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/Producto`, dataToSend);
    if(response.status === 200) {
      alert(response.data.mensaje);
    } else {
      alert("Error al registrar producto");
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      alert(error.response.data.mensaje);
    } else {
      console.error("Error: ", error);
      alert("Ocurrió un error al registrar el producto");
    }
  }
}

export const actualizarProducto = async (dataToSend: any) => {
  try {
    const response = await axios.put(`${apiBaseUrl}/Producto`, dataToSend);
    if(response.status === 200) {
      alert(response.data.mensaje);
    } else {
      alert("Error al registrar producto");
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      alert(error.response.data.mensaje);
    } else {
      alert("Ocurrió un error al registrar el producto");
    }
  }
}

export const eliminarProducto = async (idProducto: number) => {
  try {
    const response = await axios.delete(`${apiBaseUrl}/Producto/${idProducto}`);
    if(response.status === 200) {
      alert(response.data.mensaje);
      window.location.reload();
    } else {
      alert("Error al eliminar el producto");
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      alert(error.response.data.mensaje);
    } else {
      console.error("Error: ", error);
      alert("Ocurrió un error durante la eliminación del producto");
    }
  }
}

export const exportarListadoProductos = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/Producto/exportar`, { responseType: "blob" });
    if (response.status === 200) {
      alert("La lista de productos se descargará en breve.");
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      const date = new Date();
      link.setAttribute("download", `Listado-productos-${formatoFecha(date.toDateString())}.xlsx`);
      document.body.appendChild(link);
      link.click();
    } else {
      throw new Error("Error al exportar los productos");
    }
  } catch (error) {
    console.error(error);
  }
}