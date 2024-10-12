import { Box, Button, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import Contenedor from '../../../components/admin-components/Contenedor'
import ContenedorBotones from '../../../components/admin-components/ContenedorBotones';
import ContenedorTabla from '../../../components/admin-components/ContenedorTabla';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BotonAgregar } from '../../../components/admin-components/Botones';
import AgregarCategoria from './AgregarCategoria';

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
  const [editarCategoria, setEditarCategoria] = useState<Data | null>(null);

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = (categoria?: Data) => {
    setEditarCategoria(categoria || null);
    setOpenModal(true);
  }

  const handleCloseModal = () => {
    setEditarCategoria(null);
    setOpenModal(false);
  }

  const obtenerCategorias = async () => {
    try {
      const response = await axios.get("http://192.168.0.3:5045/api/Categoria");
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

        <BotonAgregar
          onClick={() => handleOpenModal()}
          text="Agregar categoría"
        />

        <AgregarCategoria
          open={openModal}
          onClose={handleCloseModal}
          categoria={editarCategoria}
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
          {categorias.map((categoria) => (
            <TableRow>
              {columnas.map((columna) => {
                const value = columna.id === "acciones" ? "" : (categoria as any)[columna.id];
                return (
                  <TableCell key={columna.id} align={columna.align}>
                    {columna.id === "acciones" ? (
                      <Box>
                        <Button 
                          variant="contained" 
                          color="primary"
                          onClick={() => handleOpenModal(categoria)}
                        >
                          Editar
                        </Button>
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
