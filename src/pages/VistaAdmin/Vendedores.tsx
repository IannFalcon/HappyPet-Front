import React, { useEffect, useState } from 'react'
import Contenedor from '../../components/VistaAdmin/Contenedor';
import ContenedorBotones from '../../components/VistaAdmin/ContenedorBotones';
import { Box, Button, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { AddCircle, Download } from '@mui/icons-material';
import ContenedorTabla from '../../components/VistaAdmin/ContenedorTabla';
import axios from 'axios';

interface Data {
  idUsuario: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  nroDocumento: string;
  telefono: string;
  direccion: string;
  correo: string;
  fecRegistro: string;
  usuTipoDoc: {
    idTipoDocumento: number;
    descripcion: string;
  }
  usuTipoUsu: {
    idTipoUsuario: number;
    descripcion: string;
  }
}

interface Columna {
  id: keyof Data | "acciones";
  label: string;
  minWidth?: number;
  align?: "left";
}

const columnas: Columna[] = [
  { id: "idUsuario", label: "#", minWidth: 10 },
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

  const [vendedores, setVendedores] = useState<Data[]>([]);

  const obtenerVendedores = async () => {
    try {
      const response = await axios.get("http://192.168.0.8:5045/api/Vendedor");
      const data = response.data.data.map((item: Data) => ({
        idUsuario: item.idUsuario,
        nombre: item.nombre,
        apellidoPaterno: item.apellidoPaterno,
        apellidoMaterno: item.apellidoMaterno,
        nroDocumento: item.nroDocumento,
        telefono: item.telefono,
        direccion: item.direccion,
        correo: item.correo,
        fecRegistro: item.fecRegistro,
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

  useEffect(() => {
    obtenerVendedores();
  }, []);

  return (
    <Contenedor>
      <ContenedorBotones>
        <Button
          variant="contained"
          color="success"
          startIcon={<AddCircle />}
        >
          Nuevo Vendedor
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
                        <Button variant="contained" color="primary">Editar</Button>
                        <Button variant="contained" color="error">Eliminar</Button>
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