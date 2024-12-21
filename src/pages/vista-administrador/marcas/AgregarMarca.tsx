import { Box, TextField } from "@mui/material";
import ContenedorModal from "../../../components/admin-components/ContenedorModal";
import TituloModal from "../../../components/admin-components/TituloModal";
import { useEffect, useState } from "react";
import { Marca } from "../../../interfaces/Marca";
import { BotonesModal } from "../../../components/admin-components/Botones";
import { actualizarMarca, registrarMarca } from "../../../services/marca-service";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  marca: Marca | null;
}

const AgregarMarca: React.FC<ModalProps> = ({ open, onClose, marca }) => {

  const [formData, setFormData] = useState({
    idMarca: "",
    nombre: "",
  });

  const handleLimpiarFormulario = () => {
    setFormData({
      idMarca: "",
      nombre: "",
    });
  }

  useEffect(() => {
    if(marca) {
      setFormData({
        idMarca: marca.idMarca.toString(),
        nombre: marca.nombre,
      });
    } else {
      handleLimpiarFormulario();
    }
  }, [marca]);

  const handleCloseModal = () => {
    onClose();
    handleLimpiarFormulario();
  }

  const handleRegistrarMarca = async (e: React.MouseEvent<HTMLButtonElement>) => {

    e.preventDefault(); // Evitar recargar la página

    const { idMarca, ...dataToSend } = formData; // Eliminar idMarca del objeto a enviar

    try {
      await registrarMarca(dataToSend);
      handleCloseModal();
    } catch (error) {
      console.error("Error: ", error);
      alert("Ocurrió un error al registrar la marca");
    }

  }

  const handleActualizarMarca = async (e: React.MouseEvent<HTMLButtonElement>) => {

    e.preventDefault(); // Evitar recargar la página

    const { ...dataToSend } = formData;

    try {
      await actualizarMarca(dataToSend);
      handleCloseModal();
    } catch (error) {
      console.error("Error: ", error);
      alert("Ocurrió un error al actualizar la marca");
    }

  }

  return (
    <ContenedorModal
      open={open}
      onClose={handleCloseModal}
      ancho={500}
      alto={400}
    >
      <TituloModal titulo={marca ? "Editar marca" : "Registrar marca"}/>
      {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
      <Box sx={{ px: 2, pt: 4 }}>
        <TextField
          fullWidth
          label="Nombre"
          variant="outlined"
          value={formData.nombre}
          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
        />
      </Box>
      <BotonesModal
        objeto={marca}
        accion={
          marca 
          ? handleActualizarMarca
          : handleRegistrarMarca
        }
        cerrar={handleCloseModal}
      />
    </ContenedorModal>
  );

}

export default AgregarMarca;