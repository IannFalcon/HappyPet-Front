import { useEffect, useState } from "react";
import Contenedor from "../../../components/admin-components/Contenedor"
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import ContenedorBotones from "../../../components/admin-components/ContenedorBotones";
import ContenedorTabla from "../../../components/admin-components/ContenedorTabla";
import { BotonAgregar, BotonesAccion, BotonExportar } from "../../../components/admin-components/Botones";
import AgregarMarca from "./AgregarMarca";
import { Marca } from "../../../interfaces/Marca";
import { eliminarMarca, exportarListadoMarcas, obtenerMarcas } from "../../../services/marca-service";

interface Columna {
  id: keyof Marca | "acciones";
  label: string;
  width: number | "auto";
  align: "left" | "center";
}

const columnas: Columna[] = [
  { id: "idMarca", label: "#", width: 70, align: "center" },
  { id: "nombre", label: "Nombre", width: "auto", align: "left" },
  { id: "acciones", label: "Acciones", width: 300, align: "center" },  
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
    listarMarcas();
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

  const handleEliminarMarca = async (idMarca: number) => {

    try {
      await eliminarMarca(idMarca);
      listarMarcas();
    } catch (error) {
      console.error("Error: ", error);
      alert("Ocurrió un error al eliminar la marca");
    }

  }

  const handleExportar = async () => {
    try {
      await exportarListadoMarcas();
    } catch (error) {
      console.error("Error: ", error);
      alert("Ocurrió un error al exportar las marcas");
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

        <BotonExportar
          onClick={() => handleExportar()}
          text="Exportar"
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
              style={{ width: columna.width }}
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
                      <BotonesAccion 
                        editar={() => handleOpenModal(marca)}
                        eliminar={() => handleEliminarMarca(marca.idMarca)}
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

export default Marcas;
