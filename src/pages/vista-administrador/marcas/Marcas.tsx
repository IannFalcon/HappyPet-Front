import { useEffect, useState } from "react";
import Contenedor from "../../../components/admin-components/Contenedor"
import axios from "axios";
import { Box, Button, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import ContenedorBotones from "../../../components/admin-components/ContenedorBotones";
import ContenedorTabla from "../../../components/admin-components/ContenedorTabla";
import { BotonAgregar } from "../../../components/admin-components/Botones";
import AgregarMarca from "./AgregarMarca";

interface Data {
  idMarca: number;
  nombre: string;
}

interface Columna {
  id: keyof Data | "acciones";
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

  const [marcas, setMarcas] = useState<Data[]>([]);

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = (marca?: Data) => {
    setOpenModal(true);
  }

  const handleCloseModal = () => {
    setOpenModal(false);
  }

  const obtenerMarcas = async () => {
    try {
      const response = await axios.get("http://192.168.0.3:5045/api/Marca");
      const data = response.data.data.map((item: Data) => ({
        idMarca: item.idMarca,
        nombre: item.nombre,
      }));
      setMarcas(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    obtenerMarcas();
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
          marca={null}
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

export default Marcas;
