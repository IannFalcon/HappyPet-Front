import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import Contenedor from "../../../components/admin-components/Contenedor";
import ContenedorBotones from "../../../components/admin-components/ContenedorBotones";
import { BotonAgregar, BotonesAccion, BotonExportar } from "../../../components/admin-components/Botones";
import ContenedorTabla from "../../../components/admin-components/ContenedorTabla";
import AgregarProveedor from "./AgregarProveedor";
import { Proveedor } from "../../../interfaces/Proveedor";
import { eliminarProveedor, exportarListadoProveedores, obtenerProveedores } from "../../../services/proveedor-service";

interface Columna {
  id: keyof Proveedor | "acciones";
  label: string;
  width: number | "auto";
  align: "left" | "center";
}

const columnas: Columna[] = [
  { id: "rucProveedor", label: "Nombre", width: "auto", align: "left" },
  { id: "nombreProveedor", label: "Apellido Paterno", width: "auto", align: "left" },
  { id: "nroTelefono", label: "Apellido Materno", width: "auto", align: "left" },
  { id: "correo", label: "Correo", width: "auto", align: "left" },
  { id: "direccion", label: "Dirección", width: "auto", align: "left" },
  { id: "fecRegistro", label: "Fecha Registro", width: "auto", align: "center" },
  { id: "acciones", label: "Acciones", width: 300, align: "center" },
]

const Proveedores: React.FC = () => {

  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [editarProveedor, setEditarProveedor] = useState<Proveedor | null>(null);

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = (proveedor?: Proveedor) => {
    setEditarProveedor(proveedor || null);
    setOpenModal(true);
  }

  const handleCloseModal = () => {
    setEditarProveedor(null);
    listarProveedores();
    setOpenModal(false);
  }

  const listarProveedores = async () => {
    try {
      const data = await obtenerProveedores();
      setProveedores(data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleEliminarProveedor = async (idProveedor: number) => {
    try {
      await eliminarProveedor(idProveedor);
      listarProveedores();
    } catch (error) {
      console.error("Error: ", error);
      alert("Ocurrió un error durante la eliminación del proveedor.");
    }
  }

  const handleExportar = async () => {
    try {
      await exportarListadoProveedores();
    } catch (error) {
      console.error("Error: ", error);
      alert("Ocurrió un error durante la exportación del listado de proveedores.");
    }
  }

  useEffect(() => {
    listarProveedores();
  }, []);

  return (
    <Contenedor>
      <ContenedorBotones>

        <BotonAgregar
          onClick={() => handleOpenModal()}
          text="Agregar proveedor"
        />

        <AgregarProveedor
          open={openModal}
          onClose={handleCloseModal}
          proveedor={editarProveedor}
        />

        <BotonExportar
          onClick={() => handleExportar()}
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
          {proveedores.map((proveedor) => (
            <TableRow>
              {columnas.map((columna) => {
                const value = columna.id === "acciones" ? "" : (proveedor as any)[columna.id];
                return (
                  <TableCell key={columna.id} align={columna.align}>
                    {columna.id === "acciones" ? (
                      <BotonesAccion 
                        editar={() => handleOpenModal(proveedor)}
                        eliminar={() => handleEliminarProveedor(proveedor.idProveedor)}
                      />
                    ) : value}
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

export default Proveedores;
