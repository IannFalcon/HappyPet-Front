import React, { useEffect, useState } from 'react'
import ContenedorModal from '../../../components/admin-components/ContenedorModal';
import TituloModal from '../../../components/admin-components/TituloModal';
import { Box, Grid, TextField } from '@mui/material';
import { Proveedor } from '../../../interfaces/Proveedor';
import { BotonesModal } from '../../../components/admin-components/Botones';
import { actualizarProveedor, registrarProveedor } from '../../../services/proveedor-service';


interface ModalProps {
  open: boolean;
  onClose: () => void;
  proveedor: Proveedor | null;
}

const AgregarProveedor: React.FC<ModalProps> = ({ open, onClose, proveedor }) => {

  const [formData, setFormData] = useState({
    rucProveedor: "",
    nombreProveedor: "",
    nroTelefono: "",
    correo: "",
    direccion: ""
  });

  const handleLimpiarFormulario = () => {
    setFormData({
      rucProveedor: "",
      nombreProveedor: "",
      nroTelefono: "",
      correo: "",
      direccion: ""
    });
  }

  useEffect(() => {
    if (proveedor) {
      setFormData({
        rucProveedor: proveedor.rucProveedor,
        nombreProveedor: proveedor.nombreProveedor,
        nroTelefono: proveedor.nroTelefono,
        correo: proveedor.correo,
        direccion: proveedor.direccion
      });
    } else {
      handleLimpiarFormulario();
    }
  }, [proveedor]);

  const handleRegistrarProveedor = async (e: React.MouseEvent<HTMLButtonElement>) => {

    e.preventDefault();

    const { ...dataToSend } = formData;

    try {
      await registrarProveedor(dataToSend);
      handleCloseModal();
    } catch (error) {
      console.error("Error: ", error);
      alert("Ocurrió un error al registrar al proveedor");
    }

  }

  const handleActualizarProveedor = async (e: React.MouseEvent<HTMLButtonElement>) => {

    e.preventDefault();

    const { ...dataToSend } = formData;

    try {
      await actualizarProveedor(Number(proveedor?.idProveedor), dataToSend);
      handleCloseModal();
    } catch (error) {
      console.error("Error: ", error);
      alert("Ocurrió un error al registrar el cliente");
    }

  }

  const handleCloseModal = () => {
    onClose();
    handleLimpiarFormulario();
  }

  return (
    <ContenedorModal
      open={open}
      onClose={onClose}
      ancho={700}
      alto={600}
    >
      <TituloModal titulo={proveedor ? "Actualizar proveedor" : "Registrar proveedor"}/>
      <Box sx={{ px: 2, pt: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="RUC del Proveedor"
              variant="outlined"
              value={formData.rucProveedor}
              onChange={(e) => setFormData({ ...formData, rucProveedor: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Nombre del Proveedor"
              variant="outlined"
              value={formData.nombreProveedor}
              onChange={(e) => setFormData({ ...formData, nombreProveedor: e.target.value })}
              sx={{ mb: 2 }}
            />            
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Nro. Telefono"
              variant="outlined"
              value={formData.nroTelefono}
              onChange={(e) => setFormData({ ...formData, nroTelefono: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Correo"
              variant="outlined"
              value={formData.correo}
              onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Dirección"
              variant="outlined"
              value={formData.direccion}
              onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>
      </Box>
      <BotonesModal
        objeto={proveedor}
        accion={
          proveedor 
          ? handleActualizarProveedor
          : handleRegistrarProveedor
        }
        cerrar={onClose}
      />
    </ContenedorModal>
  );

}

export default AgregarProveedor;