import { Box, Button, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import Contenedor from '../../components/VistaAdmin/Contenedor'
import ContenedorBotones from '../../components/VistaAdmin/ContenedorBotones';
import { AddCircle } from '@mui/icons-material';
import ContenedorTabla from '../../components/VistaAdmin/ContenedorTabla';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Data {
  idCategoria: number;
  nombre: string;
}

interface Columna {
  id: keyof Data | "acciones";
  label: string;
  minWidth?: number;
  align?: "left";
}

const columnas: Columna[] = [
  { id: "idCategoria", label: "#", minWidth: 10 },
  { id: "nombre", label: "Nombre", minWidth: 100 },
  { id: "acciones", label: "Acciones", minWidth: 50 },
]

const Categorias: React.FC = () => {

  const [categorias, setCategorias] = useState<Data[]>([]);

  const obtenerCategorias = async () => {
    try {
      const response = await axios.get("http://192.168.0.8:5045/api/Categoria");
      const data = response.data.data.map((item: Data) => ({
        idCategoria: item.idCategoria,
        nombre: item.nombre,
      }));
      setCategorias(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    obtenerCategorias();
  }, []);

  return (
    <Contenedor>
      <ContenedorBotones>
        <Button
          variant="contained"
          color="success"
          startIcon={<AddCircle />}
        >
          Agregar categoría
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
          {categorias.map((categoria) => (
            <TableRow>
              {columnas.map((columna) => {
                const value = columna.id === "acciones" ? "" : (categoria as any)[columna.id];
                return (
                  <TableCell key={columna.id} align={columna.align}>
                    {columna.id === "acciones" ? (
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

export default Categorias;
