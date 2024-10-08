import { Box, Button, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import Contenedor from "../../../components/VistaAdmin/Contenedor";
import ContenedorBotones from "../../../components/VistaAdmin/ContenedorBotones";
import { useEffect, useState } from "react";
import axios from "axios";
import ContenedorTabla from "../../../components/VistaAdmin/ContenedorTabla";
import { formatoFecha } from "../../../utils/utils";
import { BotonAgregar, BotonExportar } from "../../../components/VistaAdmin/Botones";
import AgregarProductos from "./AgregarProducto";

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

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = (producto?: Data) => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const obtenerProductos = async () => {
    try {
      const response = await axios.get("http://192.168.0.3:5045/api/Producto");
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
        <BotonAgregar
          onClick={() => handleOpenModal()}
          text="Agregar producto"
        />

        <AgregarProductos 
          open={openModal}
          onClose={handleCloseModal}
          producto={null}
        />

        <BotonExportar
          onClick={() => console.log("Exportar productos")}
          text="Exportar"
        />
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
