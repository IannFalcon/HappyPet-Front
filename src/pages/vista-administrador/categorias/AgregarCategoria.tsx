import { Box, TextField } from "@mui/material";
import ContenedorModal from "../../../components/admin-components/ContenedorModal";
import TituloModal from "../../../components/admin-components/TituloModal";
import { useEffect, useState } from "react";
import { Categoria } from "../../../interfaces/Categoria";
import { BotonesModal } from "../../../components/admin-components/Botones";
import { actualizarCategoria, registrarCategoria } from "../../../services/categoria-service";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  categoria: Categoria | null;
}

const AgregarCategoria: React.FC<ModalProps> = ({ open, onClose, categoria }) => {

  const [formData, setFormData] = useState({
    nombre: "",
  });

  const handleLimpiarFormulario = () => {
    setFormData({
      nombre: "",
    });
  };

  useEffect(() => {
    if(categoria) {
      setFormData({
        nombre: categoria.nombre,
      });
    } else {
      handleLimpiarFormulario();
    }
  }, [categoria]);

  const handleRegistrarCategoria = async (e: React.MouseEvent<HTMLButtonElement>) => {

    e.preventDefault();
    const { ...dataToSend } = formData;

    try {
      await registrarCategoria(dataToSend);
      handleCloseModal();
    } catch (error) {
      console.error(error);
    }

  };

  const handleActualizarCategoria = async (e: React.MouseEvent<HTMLButtonElement>) => {

    e.preventDefault();
    const { ...dataToSend } = formData;

    try {
      await actualizarCategoria(Number(categoria?.idCategoria), dataToSend);
      handleCloseModal();
    } catch (error) {
      console.error(error);
    }

  };

  const handleCloseModal = () => {
    onClose();
    handleLimpiarFormulario();
  };

  return (
    <ContenedorModal
      open={open}
      onClose={handleCloseModal}
      ancho={500}
      alto={400}
    >
      <TituloModal titulo={categoria ? "Editar categoría" : "Registrar categoría"}/>
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
        objeto={categoria}
        accion={
          categoria 
          ? handleActualizarCategoria 
          : handleRegistrarCategoria
        }
        cerrar={handleCloseModal}
      />
    </ContenedorModal>
  );

}

export default AgregarCategoria;