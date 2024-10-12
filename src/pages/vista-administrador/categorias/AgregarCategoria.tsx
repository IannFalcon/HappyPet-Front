import { Box, TextField } from "@mui/material";
import ContenedorModal from "../../../components/admin-components/ContenedorModal";
import TituloModal from "../../../components/admin-components/TituloModal";
import BotonesModal from "../../../components/admin-components/BotonesModal";
import axios from "axios";
import { useEffect, useState } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  categoria: Categoria | null;
}

interface Categoria {
  idCategoria: number;
  nombre: string;
}

const AgregarCategoria: React.FC<ModalProps> = ({ open, onClose, categoria }) => {

  const [formData, setFormData] = useState({
    idCategoria: "",
    nombre: "",
  });

  const handleLimpiarFormulario = () => {
    setFormData({
      idCategoria: "",
      nombre: "",
    });
  };

  useEffect(() => {
    if(categoria) {
      setFormData({
        idCategoria: categoria.idCategoria.toString(),
        nombre: categoria.nombre,
      });
    } else {
      handleLimpiarFormulario();
    }
  }, [categoria]);

  const handleRegistrarCategoria = async (e: React.MouseEvent<HTMLButtonElement>) => {

    e.preventDefault(); // Evitar recargar la página

    const { idCategoria, ...dataToSend } = formData; // Eliminar idCategoria del objeto a enviar

    try {

      // Enviar datos al servidor
      const response = await axios.post("http://192.168.0.3:5045/api/Categoria", dataToSend);

      // Mostrar mensaje de éxito o error
      if(response.status === 200) {
        alert(response.data.mensaje);
        handleCloseModal();
      } else {
        alert("Error al registrar categoría");
      }

    } catch (error) {
      console.error("Error: ", error);
      alert("Ocurrió un error al registrar la categoría");
    }

  }

  const handleActualizarCategoria = async (e: React.MouseEvent<HTMLButtonElement>) => {
      
    e.preventDefault(); // Evitar recargar la página
  
    const { ...dataToSend } = formData;

    try {
  
      // Enviar datos al servidor
      const response = await axios.put("http://192.168.0.3:5045/api/Categoria", dataToSend);

      // Mostrar mensaje de éxito o error
      if(response.status === 200) {
        alert(response.data.mensaje);
        handleCloseModal();
      } else {
        alert("Error al actualizar categoría");
      }

    } catch (error) {
      console.error("Error: ", error);
      alert("Ocurrió un error al actualizar la categoría");
    }
  }

  const handleCloseModal = () => {
    onClose();
    handleLimpiarFormulario();
    window.location.reload();
  };

  return (
    <ContenedorModal
      open={open}
      onClose={handleCloseModal}
      ancho={500}
      alto={400}
    >
      <TituloModal titulo="Registrar Categoría"/>
      {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
      <Box sx={{ p: 2 }}>
        <TextField
          fullWidth
          label="Nombre"
          variant="outlined"
          value={formData.nombre}
          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
        />
      </Box>
      <BotonesModal
        registrar={
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