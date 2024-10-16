import { Box, Button, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import Contenedor from "../../../components/admin-components/Contenedor";
import ContenedorBotones from "../../../components/admin-components/ContenedorBotones";
import { BotonAgregar, BotonExportar } from "../../../components/admin-components/Botones";
import ContenedorTabla from "../../../components/admin-components/ContenedorTabla";
import axios from "axios";
import AgregarCliente from "./AgregarCliente";
import { Cliente } from "../../../models/Cliente";
import { obtenerClientes } from "../../../services/cliente-service";
import { apiBaseUrl } from "../../../services/apiBaseUrl";

interface Columna {
  id: keyof Cliente | "acciones";
  label: string;
  minWidth?: number;
  align?: "left";
}

const columnas: Columna[] = [
  { id: "nombre", label: "Nombre", minWidth: 100 },
  { id: "apellidoPaterno", label: "Apellido Paterno", minWidth: 100 },
  { id: "apellidoMaterno", label: "Apellido Materno", minWidth: 100 },
  { id: "usuTipoDoc", label: "Tipo Doc.", minWidth: 100 },
  { id: "nroDocumento", label: "Nro. Doc.", minWidth: 100 },
  { id: "telefono", label: "Teléfono", minWidth: 100 },
  { id: "direccion", label: "Dirección", minWidth: 100 },
  { id: "correo", label: "Correo", minWidth: 100 },
  { id: "fecRegistro", label: "Fecha Registro", minWidth: 100 },
  { id: "acciones", label: "Acciones", minWidth: 50 },
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

  const eliminarCliente = async (idUsuario: number) => {

    try {
  
      // Enviar datos al servidor
      const response = await axios.delete(`${apiBaseUrl}/Cliente/${idUsuario}`);

      // Mostrar mensaje de éxito o error
      if(response.status === 200) {
        alert(response.data.mensaje);
        window.location.reload();
      } else {
        alert("Error al eliminar al cliente");
      }

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
              style={{ minWidth: columna.minWidth }}
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
                      <Box>
                        <Button 
                          variant="contained" 
                          color="primary"
                          onClick={() => handleOpenModal(cliente)}
                        >
                          Editar
                        </Button>
                        <Button 
                          variant="contained" 
                          color="error"
                          onClick={() => eliminarCliente(cliente.idUsuario)}
                        >
                          Eliminar
                        </Button>
                      </Box>
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
