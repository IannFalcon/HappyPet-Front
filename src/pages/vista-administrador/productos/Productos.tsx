import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import Contenedor from "../../../components/admin-components/Contenedor";
import ContenedorBotones from "../../../components/admin-components/ContenedorBotones";
import { useEffect, useState } from "react";
import ContenedorTabla from "../../../components/admin-components/ContenedorTabla";
import { BotonAgregar, BotonesAccion, BotonExportar } from "../../../components/admin-components/Botones";
import AgregarProductos from "./AgregarProducto";
import { Producto } from "../../../models/Producto";
import { eliminarProducto, obtenerProductos } from "../../../services/producto-service";

interface Columna {
  id: keyof Producto | "acciones";
  label: string;
  width: number | "auto";
  align: "left" | "center";
}

const columnas: Columna[] = [
  { id: "rutaImagen", label: "Imagen", width: 140, align: "center" },
  { id: "nombre", label: "Nombre", width: "auto", align: "left" },
  { id: "descripcion", label: "Descripción", width: "auto", align: "left" },
  { id: "precioUnitario", label: "Precio", width: "auto", align: "center" },
  { id: "stock", label: "Stock", width: "auto", align: "center" },
  { id: "fecVencimiento", label: "Fecha Vencimiento", width: "auto", align: "center" },
  { id: "fecRegistro", label: "Fecha Registro", width: "auto", align: "center" },
  { id: "productoCategoria", label: "Categoría", width: "auto", align: "center" },
  { id: "productoMarca", label: "Marca", width: "auto", align: "center" },
  { id: "acciones", label: "Acciones", width: 300, align: "center" },
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
    listarProductos();
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

  const handleEliminarProducto = async (idProducto: number) => {
    try {
      await eliminarProducto(idProducto);
      listarProductos();
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
              style={{ width: columna.width }}
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
                  ? <img src={producto.rutaImagen} alt={producto.nombre} style={{ width: "100%", height: 100 }} />
                  : columna.id === "productoCategoria" 
                  ? (producto.productoCategoria.nombre) 
                  : columna.id === "productoMarca"
                  ? (producto.productoMarca.nombre)
                  : columna.id === "fecVencimiento"
                  ? (producto.fecVencimiento ?? "No aplica")
                  : columna.id === "precioUnitario"
                  ? (producto.precioUnitario.toFixed(2))
                  : columna.id === "acciones" ? (
                    <BotonesAccion 
                      editar={() => handleOpenModal(producto)}
                      eliminar={() => handleEliminarProducto(producto.idProducto)}
                    />
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
