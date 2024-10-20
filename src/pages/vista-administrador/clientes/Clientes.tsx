import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import Contenedor from "../../../components/admin-components/Contenedor";
import ContenedorBotones from "../../../components/admin-components/ContenedorBotones";
import { BotonAgregar, BotonesAccion, BotonExportar } from "../../../components/admin-components/Botones";
import ContenedorTabla from "../../../components/admin-components/ContenedorTabla";
import AgregarCliente from "./AgregarCliente";
import { Cliente } from "../../../models/Cliente";
import { eliminarCliente, obtenerClientes } from "../../../services/cliente-service";

interface Columna {
  id: keyof Cliente | "acciones";
  label: string;
  width: number | "auto";
  align: "left" | "center";
}

const columnas: Columna[] = [
  { id: "nombre", label: "Nombre", width: "auto", align: "left" },
  { id: "apellidoPaterno", label: "Apellido Paterno", width: "auto", align: "left" },
  { id: "apellidoMaterno", label: "Apellido Materno", width: "auto", align: "left" },
  { id: "usuTipoDoc", label: "Tipo Doc.", width: "auto", align: "center" },
  { id: "nroDocumento", label: "Nro. Doc.", width: "auto", align: "center" },
  { id: "telefono", label: "Teléfono", width: "auto", align: "center" },
  { id: "direccion", label: "Dirección", width: "auto", align: "left" },
  { id: "correo", label: "Correo", width: "auto", align: "left" },
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
          onClick={() => console.log("Exportar clientes")}
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
                    {columna.id === "usuTipoDoc" ?
                      cliente.usuTipoDoc.descripcion
                    : columna.id === "acciones" ? (
                      <BotonesAccion 
                        editar={() => handleOpenModal(cliente)}
                        eliminar={() => handleEliminarCliente(cliente.idUsuario)}
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
