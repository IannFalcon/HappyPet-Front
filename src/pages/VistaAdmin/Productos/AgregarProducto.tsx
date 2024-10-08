import React, { useState } from 'react'
import ContenedorModal from '../../../components/VistaAdmin/ContenedorModal';
import TituloModal from '../../../components/VistaAdmin/TituloModal';
import { Box, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import BotonesModal from '../../../components/VistaAdmin/BotonesModal';
import { CleaningServices } from '@mui/icons-material';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  producto: Producto | null;
}

interface Producto {
  idProducto: number;
  nombre: string;
  descripcion: string;
  precioUnitario: number;
  stock: number;
  nombreImagen: string;
  rutaImagen: string;
  fecVencimiento: string;
  fecRegistro: string;
  productoCategoria: {
    idCategoria: number;
    nombre: string;
  };
  productoMarca: {
    idMarca: number;
    nombre: string;
  };
}

const AgregarProductos: React.FC<ModalProps> = ({ open, onClose, producto }) => {

  const [imagenPrevia, setImagenPrevia] = useState<string | null>(null);

  const handleImagen = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagenPrevia(reader.result as string);
      }
      reader.readAsDataURL(file);
    }
  }

  return (
    <ContenedorModal
      open={open}
      onClose={onClose}
      ancho={700}
      alto={580}
    >
      <TituloModal titulo="Registrar Producto"/>
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField 
              fullWidth
              label="Nombre del producto"
              variant="outlined"
              defaultValue={producto?.nombre}
              sx={{ mb: 2}}
            />
            <FormControl fullWidth>
              <InputLabel>Categoria</InputLabel>
              <Select
                fullWidth
                label="Categoria"
                variant="outlined"
                defaultValue={producto?.productoCategoria.idCategoria}
                sx={{ mb: 2}}
              >
                <MenuItem value={0}>Seleccionar</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Marca</InputLabel>
              <Select
                fullWidth
                label="Marca"
                variant="outlined"
                defaultValue={producto?.productoMarca.idMarca}
                sx={{ mb: 2}}
              >
                <MenuItem value={0}>Seleccionar</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Descripción"
              variant="outlined"
              defaultValue={producto?.descripcion}
              sx={{ mb: 2}}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Precio Unitario"
              variant="outlined"
              defaultValue={producto?.precioUnitario}
              sx={{ mb: 2}}
            />
            <TextField
              fullWidth
              type="number"
              label="Stock"
              variant="outlined"
              defaultValue={producto?.stock}
              sx={{ mb: 2}}
            />
            <TextField
              fullWidth
              type="date"
              label="Fecha de registro"
              variant="outlined"
              value={producto?.fecRegistro}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2}}
            />
            <TextField
              fullWidth
              type="date"
              label="Fecha de vencimiento"
              variant="outlined"
              value={producto?.fecVencimiento}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2}}
            />
            <TextField
              fullWidth
              type="file"
              label="Imagen"
              variant="outlined"
              value={producto?.nombreImagen}
              onChange={handleImagen}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2}}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            {imagenPrevia && (
              <Box 
                sx={{ 
                  mb: 2, 
                  display: "flex", 
                  flexDirection: "row", 
                  justifyContent: "center", 
                  alignItems: "center", 
                  gap: 2 
                }}
              >
                <img src={imagenPrevia} alt="Imagen previa" style={{ width: "50%", border: "1px solid black" }}/>
                <IconButton
                  sx={{ 
                    width: "40px", 
                    height: "40px", 
                    backgroundColor: "#d32f2f" 
                  }}
                  onClick={() => setImagenPrevia(null)}
                >
                  <CleaningServices sx={{ color: "white" }}/>
                </IconButton>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
      <BotonesModal
        registrar={() => {}}
        cerrar={onClose}
      />
    </ContenedorModal>
  );

}

export default AgregarProductos;