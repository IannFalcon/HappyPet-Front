import React, { useEffect, useState } from 'react'
import ContenedorModal from '../../../components/admin-components/ContenedorModal';
import TituloModal from '../../../components/admin-components/TituloModal';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { CleaningServices } from '@mui/icons-material';
import { reFormatoFecha } from '../../../utils/dateFormat';
import { Producto } from '../../../models/Producto';
import { Marca } from '../../../models/Marca';
import { Categoria } from '../../../models/Categoria';
import { obtenerCategorias } from '../../../services/categoria-service';
import { obtenerMarcas } from '../../../services/marca-service';
import { BotonesModal } from '../../../components/admin-components/Botones';
import { actualizarProducto, registrarProducto } from '../../../services/producto-service';
import defaultImage from '../../../assets/default.jpg';

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

  const [imagenPrevia, setImagenPrevia] = useState<string>(defaultImage);

  const [formData, setFormData] = useState({
    idProducto: "",
    nombre: "",
    idCategoria: "0",
    idMarca: "0",
    descripcion: "",
    precioUnitario: "0",
    stock: "0",
    nombreImagen: "",
    rutaImagen: "",
    fecVencimiento: "",
  });

  const handleLimpiarFormulario = () => {
    setFormData({
      idProducto: "",
      nombre: "",
      idCategoria: "0",
      idMarca: "0",
      descripcion: "",
      precioUnitario: "0",
      stock: "0",
      nombreImagen: "",
      rutaImagen: "",
      fecVencimiento: "",
    });
    setCategoriaSeleccionada(0);
    setMarcaSeleccionada(0);
    setImagenPrevia(defaultImage);
  };

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
    } else {
      handleLimpiarFormulario();
    }
  }, [producto]);

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

    const listarMarcas = async () => {
      try {
        const data = await obtenerMarcas();
        setMarcas(data);
      } catch (error) {
        console.error(error);
      }
    }

    const listarCategorias = async () => {
      try {
        const data = await obtenerCategorias();
        setCategorias(data);
      } catch (error) {
        console.error(error);
      }
    }

    listarMarcas();
    listarCategorias();

  }, []);

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
      await registrarProducto(dataToSend);
      handleCloseModal();
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
      await actualizarProducto(dataToSend);
      handleCloseModal();
    } catch (error) {
      console.error("Error: ", error);
      alert("Ocurrió un error al registrar el producto");
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
      ancho={1000} 
      alto={580}
    >
      <TituloModal titulo={producto ? "Editar información del producto" : "Registrar producto"}/>
      {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
      <Box sx={{ px: 2, pt: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Nombre del producto"
              variant="outlined"
              value={formData.nombre}
              onChange={(e) =>
                setFormData({ ...formData, nombre: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Descripción"
              variant="outlined"
              value={formData.descripcion}
              onChange={(e) =>
                setFormData({ ...formData, descripcion: e.target.value })
              }
              sx={{ mb: 2 }}
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
                  setFormData({
                    ...formData,
                    idCategoria: e.target.value.toString(),
                  });
                }}
                sx={{ mb: 2 }}
              >
                <MenuItem value={0}>Seleccionar</MenuItem>
                {categorias.map((categoria) => (
                  <MenuItem
                    key={categoria.idCategoria}
                    value={categoria.idCategoria}
                  >
                    {categoria.nombre}
                  </MenuItem>
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
                  setFormData({
                    ...formData,
                    idMarca: e.target.value.toString(),
                  });
                }}
                sx={{ mb: 2 }}
              >
                <MenuItem value={0}>Seleccionar</MenuItem>
                {marcas.map((marca) => (
                  <MenuItem key={marca.idMarca} value={marca.idMarca}>
                    {marca.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              type="number"
              label="Precio Unitario"
              variant="outlined"
              value={formData.precioUnitario}
              onChange={(e) =>
                setFormData({ ...formData, precioUnitario: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              type="number"
              label="Stock"
              variant="outlined"
              value={formData.stock}
              onChange={(e) =>
                setFormData({ ...formData, stock: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              type="date"
              label="Fecha de vencimiento (Opcional)"
              variant="outlined"
              value={formData.fecVencimiento}
              onChange={(e) =>
                setFormData({ ...formData, fecVencimiento: e.target.value })
              }
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              type="file"
              label="Imagen (Opcional)"
              variant="outlined"
              onChange={handleImagen}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
            />
            <Box>
              <img
                src={imagenPrevia ? imagenPrevia : defaultImage}
                alt="Imagen previa"
                style={{
                  width: "100%",
                  height: "200px",
                  border: "1px solid rgba(0, 0, 0, 0.2)",
                }}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 1 }}
                onClick={() => {
                  setImagenPrevia(defaultImage);
                  setFormData({ ...formData, nombreImagen: "", rutaImagen: "" });
                }}
                startIcon={<CleaningServices />}
              >
                Limpiar imagen
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <BotonesModal
        objeto={producto}
        accion={producto ? handleActualizarProducto : handleRegistrarProducto}
        cerrar={onClose}
      />
    </ContenedorModal>
  );

}

export default AgregarProductos;