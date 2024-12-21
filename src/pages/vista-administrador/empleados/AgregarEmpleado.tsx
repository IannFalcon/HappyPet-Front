import React, { useEffect, useState } from 'react'
import ContenedorModal from '../../../components/admin-components/ContenedorModal';
import TituloModal from '../../../components/admin-components/TituloModal';
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Empleado } from '../../../interfaces/Empleado';
import { BotonesModal } from '../../../components/admin-components/Botones';
import { actualizarEmpleado, registrarEmpleado } from '../../../services/empleado-service';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  empleado: Empleado | null;
}

const AgregarEmpleado: React.FC<ModalProps> = ({ open, onClose, empleado }) => {

  const [formData, setFormData] = useState({
    idCargo: "0",
    nombres: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    idTipoDoc: "0",
    nroDocumento: "",
    telefono: "",
    correo: "",
    direccion: "",
  });

  const handleLimpiarFormulario = () => {
    setFormData({
      idCargo: "0",
      nombres: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
      idTipoDoc: "0",
      nroDocumento: "",
      telefono: "",
      correo: "",
      direccion: "",
    });
  };

  useEffect(() => {
    if(empleado) {
      setFormData({
        idCargo: empleado.idEmpleado.toString(),
        nombres: empleado.nombres,
        apellidoPaterno: empleado.apellidoPaterno,
        apellidoMaterno: empleado.apellidoMaterno,
        idTipoDoc: empleado.tipoDocumento.idTipoDoc.toString(),
        nroDocumento: empleado.nroDocumento,
        telefono: empleado.telefono,
        correo: empleado.correo,
        direccion: empleado.direccion,
      });
    } else {
      handleLimpiarFormulario();
    }
  }, [empleado]);

  const handleRegistrarEmpleado = async (e: React.MouseEvent<HTMLButtonElement>) => {

    e.preventDefault(); // Evitar recargar la página

    const { ...dataToSend } = formData;

    try {
      await registrarEmpleado(dataToSend);
      handleCloseModal();
    } catch (error) {
      console.error("Error: ", error);
      alert("Ocurrió un error al registrar al empleado");
    }

  };

  const handleActualizarEmpleado = async (e: React.MouseEvent<HTMLButtonElement>) => {

    e.preventDefault(); // Evitar recargar la página

    const { ...dataToSend } = formData;

    try {
      await actualizarEmpleado(Number(empleado?.idEmpleado), dataToSend);
      handleCloseModal();
    } catch (error) {
      console.error("Error: ", error);
      alert("Ocurrió un error al registrar al empleado");
    }

  };

  const handleCloseModal = () => {
    onClose();
    handleLimpiarFormulario();
  };

  return (
    <ContenedorModal
      open={open}
      onClose={onClose}
      ancho={700}
      alto={600}
    >
      <TituloModal titulo={empleado ? "Actualizar empleado" : "Registrar empleado"}/>
      {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
      <Box sx={{ px: 2, pt: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Nombre"
              variant="outlined"
              value={formData.nombres}
              onChange={(e) => setFormData({ ...formData, nombres: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Apellido Paterno"
              variant="outlined"
              value={formData.apellidoPaterno}
              onChange={(e) => setFormData({ ...formData, apellidoPaterno: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Apellido Materno"
              variant="outlined"
              value={formData.apellidoMaterno}
              onChange={(e) => setFormData({ ...formData, apellidoMaterno: e.target.value })}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
              <InputLabel id="tipo-documento">Tipo de documento</InputLabel>
              <Select
                fullWidth
                labelId="tipo-documento"
                label="Tipo de documento"
                variant="outlined"
                value={formData.idTipoDoc}
                onChange={(e) => setFormData({ ...formData, idTipoDoc: e.target.value })}
              >
                <MenuItem value={0} selected>Seleccionar</MenuItem>
                <MenuItem value={1}>DNI</MenuItem>
                <MenuItem value={2}>Carnet de extrangería</MenuItem>
                <MenuItem value={3}>Pasaporte</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Nro. Documento"
              variant="outlined"
              value={formData.nroDocumento}
              onChange={(e) => setFormData({ ...formData, nroDocumento: e.target.value })}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Teléfono"
              variant="outlined"
              value={formData.telefono}
              onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              type="email"
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
            <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
              <InputLabel id="tipo-documento">Cargo del empleado</InputLabel>
              <Select
                fullWidth
                labelId="cargo-empleado"
                label="Cargo del empleado"
                variant="outlined"
                value={formData.idCargo}
                onChange={(e) => setFormData({ ...formData, idCargo: e.target.value })}
              >
                <MenuItem value={0} selected>Seleccionar</MenuItem>
                <MenuItem value={1}>Enc. Almacen</MenuItem>
                <MenuItem value={2}>Emp. Almacen</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
      <BotonesModal
        objeto={empleado}
        accion={
          empleado
          ? handleActualizarEmpleado
          : handleRegistrarEmpleado
        }
        cerrar={onClose}
      />
    </ContenedorModal>
  );

}

export default AgregarEmpleado;