import React, { useEffect, useState } from 'react'
import ContenedorModal from '../../../components/admin-components/ContenedorModal';
import TituloModal from '../../../components/admin-components/TituloModal';
import { Box, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import BotonesModal from '../../../components/admin-components/BotonesModal';
import { CleaningServices } from '@mui/icons-material';
import axios from 'axios';
import { reFormatoFecha } from '../../../utils/dateFormat';
import { Producto } from '../../../models/Producto';
import { Marca } from '../../../models/Marca';
import { Categoria } from '../../../models/Categoria';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  producto: Producto | null;
}

const AgregarProductos: React.FC<ModalProps> = ({ open, onClose, producto }) => {

  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const [marcaSeleccionada, setMarcaSeleccionada] = useState<number>(0);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<number>(0);

  const [imagenPrevia, setImagenPrevia] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    idProducto: "",
    nombre: "",
    idCategoria: "",
    idMarca: "",
    descripcion: "",
    precioUnitario: "",
    stock: "",
    nombreImagen: "",
    rutaImagen: "",
    fecVencimiento: "",
  });

  const handleLimpiarFormulario = () => {
    setFormData({
      idProducto: "",
      nombre: "",
      idCategoria: "",
      idMarca: "",
      descripcion: "",
      precioUnitario: "",
      stock: "",
      nombreImagen: "",
      rutaImagen: "",
      fecVencimiento: "",
    });
    setCategoriaSeleccionada(0);
    setMarcaSeleccionada(0);
    setImagenPrevia(null);
  }

  const handleImagen = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagenPrevia(reader.result as string);
        setFormData({ 
          ...formData, 
          nombreImagen: file.name, 
          rutaImagen: reader.result as string 
        });
      }
      reader.readAsDataURL(file);
    }
  }

  useEffect(() => {
    if(producto) {
      setFormData({
        idProducto: producto.idProducto.toString(),
        nombre: producto.nombre,
        idCategoria: producto.idCategoria.toString(),
        idMarca: producto.idMarca.toString(),
        descripcion: producto.descripcion,
        precioUnitario: producto.precioUnitario.toString(),
        stock: producto.stock.toString(),
        nombreImagen: producto.nombreImagen,
        rutaImagen: producto.rutaImagen,
        fecVencimiento: producto.fecVencimiento ? reFormatoFecha(producto.fecVencimiento) : "",
      });
      setCategoriaSeleccionada(producto.idCategoria);
      setMarcaSeleccionada(producto.idMarca);
      setImagenPrevia(producto.rutaImagen);
    }
  }, [producto]);

  useEffect(() => {

    const obtenerMarcas = async () => {
      try {
        const response = await axios.get("http://192.168.0.3:5045/api/Marca");
        const data = response.data.data.map((item: any) => ({
          idMarca: item.idMarca,
          nombre: item.nombre
        }));
        setMarcas(data);
      } catch (error) {
        console.error(error);
      }
    }

    const obtenerCategorias = async () => {
      try {
        const response = await axios.get("http://192.168.0.3:5045/api/Categoria");
        const data = response.data.data.map((item: any) => ({
          idCategoria: item.idCategoria,
          nombre: item.nombre
        }));
        setCategorias(data);
      } catch (error) {
        console.error(error);
      }
    }

    obtenerMarcas();
    obtenerCategorias();

  }, []);


  const handleCloseModal = () => {
    onClose();
    handleLimpiarFormulario();
    window.location.reload();
  }

  const handleRegistrarProducto = async (e: React.MouseEvent<HTMLButtonElement>) => {

    e.preventDefault();

    const { idProducto, fecVencimiento, nombreImagen, rutaImagen, ...data } = formData;
    const dataToSend = {
      ...data,
      fecVencimiento: fecVencimiento === "" ? null : fecVencimiento,
      nombreImagen: nombreImagen === "" ? null : nombreImagen,
      rutaImagen: rutaImagen === "" ? null : rutaImagen
    }

    try {

      const response = await axios.post("http://192.168.0.3:5045/api/Producto", dataToSend);
      if(response.status === 200) {
        alert(response.data.mensaje);
        handleCloseModal();
      } else {
        alert("Error al registrar producto");
      }

    } catch (error) {
      console.error("Error: ", error);
      alert("Ocurrió un error al registrar el producto");
    }

  }

  const handleActualizarProducto = async (e: React.MouseEvent<HTMLButtonElement>) => {

    e.preventDefault();

    const { fecVencimiento, nombreImagen, rutaImagen, ...data } = formData;
    const dataToSend = {
      ...data,
      fecVencimiento: fecVencimiento === "" ? null : fecVencimiento,
      nombreImagen: nombreImagen === "" ? null : nombreImagen,
      rutaImagen: rutaImagen === "" ? null : rutaImagen
    }

    try {

      const response = await axios.put("http://192.168.0.3:5045/api/Producto", dataToSend);
      if(response.status === 200) {
        alert(response.data.mensaje);
        handleCloseModal();
      } else {
        alert("Error al registrar producto");
      }

    } catch (error) {
      console.error("Error: ", error);
      alert("Ocurrió un error al registrar el producto");
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
      {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField 
              fullWidth
              label="Nombre del producto"
              variant="outlined"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              sx={{ mb: 2}}
            />
            <FormControl fullWidth>
              <InputLabel>Categoria</InputLabel>
              <Select
                fullWidth
                label="Categoria"
                variant="outlined"
                value={categoriaSeleccionada}
                onChange={(e) => {
                  setCategoriaSeleccionada(Number(e.target.value));
                  setFormData({ ...formData, idCategoria: e.target.value.toString() });
                }}
                sx={{ mb: 2}}
              >
                <MenuItem value={0}>Seleccionar</MenuItem>
                {categorias.map((categoria) => (
                  <MenuItem key={categoria.idCategoria} value={categoria.idCategoria}>{categoria.nombre}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Marca</InputLabel>
              <Select
                fullWidth
                label="Marca"
                variant="outlined"
                value={marcaSeleccionada}
                onChange={(e) => {
                  setMarcaSeleccionada(Number(e.target.value));
                  setFormData({ ...formData, idMarca: e.target.value.toString() });
                }}
                sx={{ mb: 2}}
              >
                <MenuItem value={0}>Seleccionar</MenuItem>
                {marcas.map((marca) => (
                  <MenuItem key={marca.idMarca} value={marca.idMarca}>{marca.nombre}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Descripción"
              variant="outlined"
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              sx={{ mb: 2}}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Precio Unitario"
              variant="outlined"
              value={formData.precioUnitario}
              onChange={(e) => setFormData({ ...formData, precioUnitario: e.target.value })}
              sx={{ mb: 2}}
            />
            <TextField
              fullWidth
              type="number"
              label="Stock"
              variant="outlined"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              sx={{ mb: 2}}
            />
            <TextField
              fullWidth
              type="date"
              label="Fecha de vencimiento (Opcional)"
              variant="outlined"
              value={formData.fecVencimiento}
              onChange={(e) => setFormData({ ...formData, fecVencimiento: e.target.value })}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2}}
            />
            <TextField
              fullWidth
              type="file"
              label="Imagen (Opcional)"
              variant="outlined"
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
                  onClick={() => {
                    setImagenPrevia(null);
                    setFormData({ ...formData, nombreImagen: "", rutaImagen: "" });
                  }}
                >
                  <CleaningServices sx={{ color: "white" }}/>
                </IconButton>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
      <BotonesModal
        registrar={
          producto
          ? handleActualizarProducto
          : handleRegistrarProducto
        }
        cerrar={onClose}
      />
    </ContenedorModal>
  );

}

export default AgregarProductos;