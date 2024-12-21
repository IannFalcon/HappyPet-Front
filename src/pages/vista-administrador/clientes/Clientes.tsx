import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import Contenedor from "../../../components/admin-components/Contenedor";
import ContenedorBotones from "../../../components/admin-components/ContenedorBotones";
import { BotonAgregar, BotonesAccion, BotonExportar } from "../../../components/admin-components/Botones";
import ContenedorTabla from "../../../components/admin-components/ContenedorTabla";
import AgregarCliente from "./AgregarCliente";
import { Cliente } from "../../../interfaces/Cliente";
import { eliminarCliente, exportarListadoClientes, obtenerClientes } from "../../../services/cliente-service";

interface Columna {
  id: keyof Cliente | "nombreCompleto" | "acciones";
  label: string;
  width: number | "auto";
  align: "center";
}

const columnas: Columna[] = [
  { id: "nombreCompleto", label: "Nombre del cliente", width: "auto", align: "center" },
  { id: "tipoDocumento", label: "Tipo Doc.", width: "auto", align: "center" },
  { id: "nroDocumento", label: "Nro. Doc.", width: "auto", align: "center" },
  { id: "telefono", label: "Teléfono", width: "auto", align: "center" },
  { id: "correo", label: "Dirección", width: "auto", align: "center" },
  { id: "fecRegistro", label: "Fecha Registro", width: "auto", align: "center" },
  { id: "acciones", label: "Acciones", width: 300, align: "center" },
]

const Clientes: React.FC = () => {

  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [editarCliente, setEditarCliente] = useState<Cliente | null>(null);

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = (cliente?: Cliente) => {
    setEditarCliente(cliente || null);
    setOpenModal(true);
  }

  const handleCloseModal = () => {
    setEditarCliente(null);
    listarClientes();
    setOpenModal(false);
  }

  const listarClientes = async () => {
    try {
      const data = await obtenerClientes();
      setClientes(data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleEliminarCliente = async (idUsuario: number) => {
    try {
      await eliminarCliente(idUsuario);
      listarClientes();
    } catch (error) {
      console.error("Error: ", error);
      alert("Ocurrió un error durante la eliminación del cliente");
    }
  }

  const handleExportar = async () => {
    try {
      await exportarListadoClientes();
    } catch (error) {
      console.error("Error: ", error);
      alert("Ocurrió un error durante la exportación del listado de clientes");
    }
  }

  useEffect(() => {
    listarClientes();
  }, []);

  return (
    <Contenedor>
      <ContenedorBotones>

        <BotonAgregar
          onClick={() => handleOpenModal()}
          text="Agregar cliente"
        />

        <AgregarCliente
          open={openModal}
          onClose={handleCloseModal}
          cliente={editarCliente}
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
          {clientes.map((cliente) => (
            <TableRow>
              {columnas.map((columna) => {
                const value = columna.id === "acciones" ? "" : (cliente as any)[columna.id];
                return (
                  <TableCell key={columna.id} align={columna.align}>
                    {columna.id === "nombreCompleto" ?
                      `${cliente.nombres} ${cliente.apellidoPaterno} ${cliente.apellidoMaterno}` 
                    : columna.id === "tipoDocumento" ?
                      cliente.tipoDocumento.nombreTipoDoc
                    : columna.id === "acciones" ? (
                      <BotonesAccion 
                        editar={() => handleOpenModal(cliente)}
                        eliminar={() => handleEliminarCliente(cliente.idCliente)}
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

export default Clientes;
