import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Contenedor from "../../components/VistaAdmin/Contenedor";
import { AddCircle, Download } from "@mui/icons-material";
import ContenedorBotones from "../../components/VistaAdmin/ContenedorBotones";
import { useEffect, useState } from "react";
import axios from "axios";
import ContenedorTabla from "../../components/VistaAdmin/ContenedorTabla";

interface Data {
  idProducto: number;
  nombre: string;
  descripcion: string;
  precioUnitario: number;
  stock: number;
  nombreImagen: string;
  rutaImagen: string;
  fecVencimiento: string;
  fecRegistro: string;
  productoCategoria: {
    idCategoria: number;
    nombre: string;
  };
  productoMarca: {
    idMarca: number;
    nombre: string;
  };
}

interface Columna {
  id: keyof Data | "acciones";
  label: string;
  minWidth?: number;
  align?: "left";
}

const columnas: Columna[] = [
  { id: "idProducto", label: "#", minWidth: 10 },
  { id: "nombre", label: "Nombre", minWidth: 100 },
  { id: "descripcion", label: "Descripción", minWidth: 100 },
  { id: "precioUnitario", label: "Precio", minWidth: 50 },
  { id: "stock", label: "Stock", minWidth: 50 },
  { id: "fecVencimiento", label: "Fecha Vencimiento", minWidth: 50 },
  { id: "fecRegistro", label: "Fecha Registro", minWidth: 50 },
  { id: "productoCategoria", label: "Categoría", minWidth: 50 },
  { id: "productoMarca", label: "Marca", minWidth: 50 },
  { id: "acciones", label: "Acciones", minWidth: 50 },
]

const Productos: React.FC = () => {

  const [productos, setProductos] = useState<Data[]>([]);

  const formatoFecha = (fecha: string) => {
    const date = new Date(fecha);
    const mes = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    return `${date.getDate()}-${mes}-${date.getFullYear()}`;
  }

  const obtenerProductos = async () => {
    try {
      const response = await axios.get("http://192.168.0.8:5045/api/Producto");
      const data = response.data.data.map((item: Data) => ({
        idProducto: item.idProducto,
        nombre: item.nombre,
        descripcion: item.descripcion,
        precioUnitario: item.precioUnitario,
        stock: item.stock,
        nombreImagen: item.nombreImagen,
        rutaImagen: item.rutaImagen,
        fecVencimiento: formatoFecha(item.fecVencimiento),
        fecRegistro: formatoFecha(item.fecRegistro),
        productoCategoria: item.productoCategoria,
        productoMarca: item.productoMarca,
      }));
      setProductos(data);
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al obtener los productos");
    }
  }

  useEffect(() => {
    obtenerProductos();
  }, []);

  return (
    <Contenedor>
      <ContenedorBotones>
        <Button
          variant="contained"
          color="success"
          startIcon={<AddCircle />}
        >
          Nuevo Producto
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ ml: "auto" }}
          startIcon={<Download />}
        >
          Exportar
        </Button>
      </ContenedorBotones>
      <ContenedorTabla>
        <TableHead>
          {columnas.map((columna) => (
            <TableCell
              key={columna.id}
              align={columna.align}
              style={{ minWidth: columna.minWidth }}
            >
              {columna.label}
            </TableCell>
          ))}
        </TableHead>
        <TableBody>
          {productos.map((producto) => (
            <TableRow>
              {columnas.map((columna) => {
                const value = columna.id === "acciones" ? "" : (producto as any)[columna.id];
                return (
                  <TableCell
                    key={columna.id}
                    align={columna.align}
                  >
                  {columna.id === "productoCategoria" 
                  ? (producto.productoCategoria.nombre) 
                  : columna.id === "productoMarca"
                  ? (producto.productoMarca.nombre)
                  : columna.id === "acciones" ? (
                    <Box>
                      <Button variant="contained" color="primary">Editar</Button>
                      <Button variant="contained" color="error">Eliminar</Button>
                    </Box>
                  ) : (
                    value
                  )}
                  </TableCell>
                )
              })}
            </TableRow>
          ))}
        </TableBody>
      </ContenedorTabla>
    </Contenedor>
  )
}

export default Productos;
