import { Box, TextField } from "@mui/material";
import ContenedorModal from "../../../components/admin-components/ContenedorModal";
import TituloModal from "../../../components/admin-components/TituloModal";
import BotonesModal from "../../../components/admin-components/BotonesModal";
import { useEffect, useState } from "react";
import axios from "axios";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  marca: Marca | null;
}

interface Marca {
  idMarca: number;
  nombre: string;
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
    }
  }, [marca]);

  const handleCloseModal = () => {
    onClose();
    handleLimpiarFormulario();
    window.location.reload();
  }

  const handleRegistrarMarca = async (e: React.MouseEvent<HTMLButtonElement>) => {

    e.preventDefault(); // Evitar recargar la página

    const { idMarca, ...dataToSend } = formData; // Eliminar idMarca del objeto a enviar

    try {

      // Enviar datos al servidor
      const response = await axios.post("http://192.168.0.3:5045/api/Marca", dataToSend);

      // Mostrar mensaje de éxito o error
      if(response.status === 200) {
        alert(response.data.mensaje);
        handleCloseModal();
      } else {
        alert("Error al registrar marca");
      }

    } catch (error) {
      console.error("Error: ", error);
      alert("Ocurrió un error al registrar la marca");
    }

  }

  const handleActualizarMarca = async (e: React.MouseEvent<HTMLButtonElement>) => {

    e.preventDefault(); // Evitar recargar la página

    const { ...dataToSend } = formData;

    try {

      // Enviar datos al servidor
      const response = await axios.put("http://192.168.0.3:5045/api/Marca", dataToSend);

      // Mostrar mensaje de éxito o error
      if(response.status === 200) {
        alert(response.data.mensaje);
        handleCloseModal();
      } else {
        alert("Error al actualizar marca");
      }

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
      <TituloModal titulo="Registrar Marca"/>
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