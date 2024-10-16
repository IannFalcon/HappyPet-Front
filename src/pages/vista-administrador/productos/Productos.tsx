import { Box, Button, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import Contenedor from "../../../components/admin-components/Contenedor";
import ContenedorBotones from "../../../components/admin-components/ContenedorBotones";
import { useEffect, useState } from "react";
import axios from "axios";
import ContenedorTabla from "../../../components/admin-components/ContenedorTabla";
import { BotonAgregar, BotonExportar } from "../../../components/admin-components/Botones";
import AgregarProductos from "./AgregarProducto";
import { Producto } from "../../../models/Producto";
import { obtenerProductos } from "../../../services/producto-service";
import { apiBaseUrl } from "../../../services/apiBaseUrl";

interface Columna {
  id: keyof Producto | "acciones";
  label: string;
  minWidth?: number;
  align?: "left";
}

const columnas: Columna[] = [
  { id: "rutaImagen", label: "Imagen", minWidth: 100 },
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

  const [productos, setProductos] = useState<Producto[]>([]);
  const [editarProducto, setEditarProducto] = useState<Producto | null>(null);

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = (producto?: Producto) => {
    setEditarProducto(producto || null);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setEditarProducto(null);
    setOpenModal(false);
  };

  const listarProductos = async () => {
    try {
      const data = await obtenerProductos();
      setProductos(data);
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al obtener los productos");
    }
  }

  const eliminarProducto = async (idProducto: number) => {

    try {
  
      // Enviar datos al servidor
      const response = await axios.delete(`${apiBaseUrl}/Producto/${idProducto}`);

      // Mostrar mensaje de éxito o error
      if(response.status === 200) {
        alert(response.data.mensaje);
        window.location.reload();
      } else {
        alert("Error al eliminar el producto");
      }

    } catch (error) {
      console.error("Error: ", error);
      alert("Ocurrió un error durante la eliminación del producto");
    }

  }

  useEffect(() => {
    listarProductos();
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
          producto={editarProducto}
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
                  { columna.id === "rutaImagen"
                  ? <img src={producto.rutaImagen} alt={producto.nombre} style={{ width: 70, height: 60 }} />
                  : columna.id === "productoCategoria" 
                  ? (producto.productoCategoria.nombre) 
                  : columna.id === "productoMarca"
                  ? (producto.productoMarca.nombre)
                  : columna.id === "fecVencimiento"
                  ? (producto.fecVencimiento ?? "No aplica")
                  : columna.id === "acciones" ? (
                    <Box>
                      <Button 
                        variant="contained" 
                        color="primary"
                        onClick={() => handleOpenModal(producto)}
                      >
                        Editar
                      </Button>
                      <Button 
                        variant="contained" 
                        color="error"
                        onClick={() => eliminarProducto(producto.idProducto)}
                      >
                        Eliminar
                      </Button>
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
