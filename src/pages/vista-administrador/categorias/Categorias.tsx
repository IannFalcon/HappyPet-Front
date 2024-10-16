import { Box, Button, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import Contenedor from '../../../components/admin-components/Contenedor'
import ContenedorBotones from '../../../components/admin-components/ContenedorBotones';
import ContenedorTabla from '../../../components/admin-components/ContenedorTabla';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BotonAgregar } from '../../../components/admin-components/Botones';
import AgregarCategoria from './AgregarCategoria';
import { Categoria } from '../../../models/Categoria';
import { obtenerCategorias } from '../../../services/categoria-service';
import { apiBaseUrl } from '../../../services/apiBaseUrl';

interface Columna {
  id: keyof Categoria | "acciones";
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

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [editarCategoria, setEditarCategoria] = useState<Categoria | null>(null);

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = (categoria?: Categoria) => {
    setEditarCategoria(categoria || null);
    setOpenModal(true);
  }

  const handleCloseModal = () => {
    setEditarCategoria(null);
    setOpenModal(false);
  }

  const listarCategorias = async () => {
    try {
      const data = await obtenerCategorias();
      setCategorias(data);
    } catch (error) {
      console.error(error);
    }
  }

  const eliminarCategoria = async (idCategoria: number) => {

    try {
  
      // Enviar datos al servidor
      const response = await axios.delete(`${apiBaseUrl}/Categoria/${idCategoria}`);

      // Mostrar mensaje de éxito o error
      if(response.status === 200) {
        alert(response.data.mensaje);
        window.location.reload();
      } else {
        alert("Error al eliminar la categoría");
      }

    } catch (error) {
      console.error("Error: ", error);
      alert("Ocurrió un error al eliminar la categoría");
    }

  }

  useEffect(() => {
    listarCategorias();
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
                        <Button 
                          variant="contained" 
                          color="error"
                          onClick={() => eliminarCategoria(categoria.idCategoria)}
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

export default Categorias;
