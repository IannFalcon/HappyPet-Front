import { TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import Contenedor from '../../../components/admin-components/Contenedor'
import ContenedorBotones from '../../../components/admin-components/ContenedorBotones';
import ContenedorTabla from '../../../components/admin-components/ContenedorTabla';
import { useEffect, useState } from 'react';
import { BotonAgregar, BotonesAccion, BotonExportar } from '../../../components/admin-components/Botones';
import AgregarCategoria from './AgregarCategoria';
import { Categoria } from '../../../models/Categoria';
import { eliminarCategoria, exportarListadoCategorias, obtenerCategorias } from '../../../services/categoria-service';

interface Columna {
  id: keyof Categoria | "acciones";
  label: string;
  width: number | "auto";
  align: "left" | "center";
}

const columnas: Columna[] = [
  { id: "idCategoria", label: "#", width: 70, align: "center" },
  { id: "nombre", label: "Nombre", width: "auto", align: "left" },
  { id: "acciones", label: "Acciones", width: 300, align: "center" },
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
    listarCategorias();
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

  const handleEliminarCategoria = async (idCategoria: number) => {
    try {
      await eliminarCategoria(idCategoria);
      listarCategorias();
    } catch (error) {
      console.error(error);
    }
  }

  const handleExportar = async () => {
    try {
      await exportarListadoCategorias();
    } catch (error) {
      console.error(error);
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

        <BotonExportar 
          onClick={() => handleExportar()}
          text="Exportar"
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
              style={{ width: columna.width }}
            >
              {columna.label}
            </TableCell>
          ))}
        </TableHead>
        <TableBody>
          {categorias.map((categoria) => (
            <TableRow key={categoria.idCategoria}>
              {columnas.map((columna) => {
                const value = columna.id === "acciones" ? "" : (categoria as any)[columna.id];
                return (
                  <TableCell key={columna.id} align={columna.align}>
                    {columna.id === "acciones" ? (
                      <BotonesAccion 
                        editar={() => handleOpenModal(categoria)}
                        eliminar={() => handleEliminarCategoria(categoria.idCategoria)}
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

export default Categorias;
