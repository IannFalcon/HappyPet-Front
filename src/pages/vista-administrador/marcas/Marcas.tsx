import { useEffect, useState } from "react";
import Contenedor from "../../../components/admin-components/Contenedor"
import axios from "axios";
import { Box, Button, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import ContenedorBotones from "../../../components/admin-components/ContenedorBotones";
import ContenedorTabla from "../../../components/admin-components/ContenedorTabla";
import { BotonAgregar } from "../../../components/admin-components/Botones";
import AgregarMarca from "./AgregarMarca";
import { Marca } from "../../../models/Marca";
import { apiBaseUrl } from "../../../services/apiBaseUrl";
import { obtenerMarcas } from "../../../services/marca-service";

interface Columna {
  id: keyof Marca | "acciones";
  label: string;
  minWidth?: number;
  align?: "left";
}

const columnas: Columna[] = [
  { id: "idMarca", label: "#", minWidth: 10 },
  { id: "nombre", label: "Nombre", minWidth: 100 },
  { id: "acciones", label: "Acciones", minWidth: 50 },  
]

const Marcas: React.FC = () => {

  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [editarMarca, setEditarMarca] = useState<Marca | null>(null);

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = (marca?: Marca) => {
    setEditarMarca(marca || null);
    setOpenModal(true);
  }

  const handleCloseModal = () => {
    setEditarMarca(null);
    setOpenModal(false);
  }

  const listarMarcas = async () => {
    try {
      const data = await obtenerMarcas();
      setMarcas(data);
    } catch (error) {
      console.error(error);
    }
  }

  const eliminarMarca = async (idMarca: number) => {

    try {
  
      // Enviar datos al servidor
      const response = await axios.delete(`${apiBaseUrl}/Marca/${idMarca}`);

      // Mostrar mensaje de éxito o error
      if(response.status === 200) {
        alert(response.data.mensaje);
        window.location.reload();
      } else {
        alert("Error al eliminar la marca");
      }

    } catch (error) {
      console.error("Error: ", error);
      alert("Ocurrió un error al eliminar la marca");
    }

  }

  useEffect(() => {
    listarMarcas();
  }, []);

  return (
    <Contenedor>
      <ContenedorBotones>
        
        <BotonAgregar
          onClick={() => handleOpenModal()}
          text="Agregar marca"
        />

        {/* Modal */}
        <AgregarMarca
          open={openModal}
          onClose={handleCloseModal}
          marca={editarMarca}
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
          {marcas.map((marca) => (
            <TableRow>
              {columnas.map((columna) => {
                const value = columna.id === "acciones" ? "" : (marca as any)[columna.id];
                return (
                  <TableCell key={columna.id} align={columna.align}>
                    {columna.id === "acciones" ? (
                      <Box>
                        <Button 
                          variant="contained" 
                          color="primary"
                          onClick={() => handleOpenModal(marca)}
                        >
                          Editar
                        </Button>
                        <Button 
                          variant="contained" 
                          color="error"
                          onClick={() => eliminarMarca(marca.idMarca)}
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

export default Marcas;
