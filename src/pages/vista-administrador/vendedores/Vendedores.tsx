import React, { useEffect, useState } from 'react'
import Contenedor from '../../../components/admin-components/Contenedor';
import ContenedorBotones from '../../../components/admin-components/ContenedorBotones';
import { Box, Button, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import ContenedorTabla from '../../../components/admin-components/ContenedorTabla';
import axios from 'axios';
import { formatoFecha } from '../../../utils/dateFormat';
import { BotonAgregar, BotonExportar } from '../../../components/admin-components/Botones';
import AgregarVendedor from './AgregarVendedor';
import { Vendedor } from '../../../models/Vendedor';

interface Columna {
  id: keyof Vendedor | "acciones";
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

const Vendedores: React.FC = () => {

  const [vendedores, setVendedores] = useState<Vendedor[]>([]);
  const [editarVendedor, setEditarVendedor] = useState<Vendedor | null>(null);

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = (vendedor?: Vendedor) => {
    setEditarVendedor(vendedor || null);
    setOpenModal(true);
  }

  const handleCloseModal = () => {
    setEditarVendedor(null);
    setOpenModal(false);
  }

  const obtenerVendedores = async () => {
    try {
      const response = await axios.get("http://192.168.0.3:5045/api/Vendedor");
      const data = response.data.data.map((item: Vendedor) => ({
        idUsuario: item.idUsuario,
        nombre: item.nombre,
        apellidoPaterno: item.apellidoPaterno,
        apellidoMaterno: item.apellidoMaterno,
        nroDocumento: item.nroDocumento,
        telefono: item.telefono,
        direccion: item.direccion,
        correo: item.correo,
        fecRegistro: formatoFecha(item.fecRegistro),
        usuTipoDoc: {
          idTipoDocumento: item.usuTipoDoc.idTipoDocumento,
          descripcion: item.usuTipoDoc.descripcion,
        },
        usuTipoUsu: {
          idTipoUsuario: item.usuTipoUsu.idTipoUsuario,
          descripcion: item.usuTipoUsu.descripcion,
        }  
      }));
      setVendedores(data);
    } catch (error) {
      console.error(error);
    }
  }

  const eliminarVendedor = async (idUsuario: number) => {

    try {
  
      // Enviar datos al servidor
      const response = await axios.delete(`http://192.168.0.3:5045/api/Vendedor/${idUsuario}`);

      // Mostrar mensaje de éxito o error
      if(response.status === 200) {
        alert(response.data.mensaje);
        window.location.reload();
      } else {
        alert("Error al eliminar al vendedor");
      }

    } catch (error) {
      console.error("Error: ", error);
      alert("Ocurrió un error durante la eliminación del vendedor");
    }

  }

  useEffect(() => {
    obtenerVendedores();
  }, []);

  return (
    <Contenedor>
      <ContenedorBotones>

        <BotonAgregar
          onClick={() => handleOpenModal()}
          text="Agregar vendedor"
        />

        <AgregarVendedor
          open={openModal}
          onClose={handleCloseModal}
          vendedor={editarVendedor}
        />

        <BotonExportar
          onClick={() => console.log("Exportar")}
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
          {vendedores.map((vendedor) => (
            <TableRow>
              {columnas.map((columna) => {
                const value = columna.id === "acciones" ? "" : (vendedor as any)[columna.id];
                return (
                  <TableCell key={columna.id} align={columna.align}>
                    {columna.id === "usuTipoDoc" ?
                      vendedor.usuTipoDoc.descripcion
                    : columna.id === "acciones" ? (
                      <Box>
                        <Button 
                          variant="contained" 
                          color="primary"
                          onClick={() => handleOpenModal(vendedor)}
                        >
                          Editar
                        </Button>
                        <Button 
                          variant="contained" 
                          color="error"
                          onClick={() => eliminarVendedor(vendedor.idUsuario)}
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

export default Vendedores;