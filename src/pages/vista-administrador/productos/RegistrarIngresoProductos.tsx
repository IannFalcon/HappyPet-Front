import { Box, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import ContenedorModal from "../../../components/admin-components/ContenedorModal";
import TituloModal from "../../../components/admin-components/TituloModal";
import { Proveedor } from "../../../interfaces/Proveedor";
import { useEffect, useState } from "react";
import { Producto } from "../../../interfaces/Producto";
import { obtenerProveedores } from "../../../services/proveedor-service";
import { obtenerProductos, registrarIngresoProducto } from "../../../services/producto-service";
import { BotonesModal } from "../../../components/admin-components/Botones";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

const RegistrarIngresoProductos: React.FC<ModalProps> = ({ open, onClose }) => {

  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);

  const [proveedorSeleccionado, setProveedorSeleccionado] = useState<number>(0);
  const [productoSeleccionado, setProductoSeleccionado] = useState<number>(0);

  const [formData, setFormData] = useState({
    idProveedor: "",
    idProducto: "",
    cantidad: 0,
  });

  const handleLimpiarFormulario = () => {
    setProveedorSeleccionado(0);
    setProductoSeleccionado(0);
    setFormData({
      idProveedor: "",
      idProducto: "",
      cantidad: 0,
    });
  }

  useEffect(() => {
    const listarProveedores = async () => {
      try {
        const data = await obtenerProveedores();
        setProveedores(data);
      } catch (error) {
        console.error(error);
      }
    }

    const listarProductos = async () => {
      try {
        const data = await obtenerProductos();
        setProductos(data);
      } catch (error) {
        console.error(error);
      }
    }

    listarProveedores();
    listarProductos();
  }, [])

  const handleRegistrarIngresoProducto = async (e: React.MouseEvent<HTMLButtonElement>) => {

    e.preventDefault();
    const dataToSend = formData;

    try {
      await registrarIngresoProducto(dataToSend);
      handleCloseModal();
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al registrar el ingreso del producto");
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
      ancho={600}
      alto={360}
    >
      <TituloModal titulo="Registrar ingreso de productos" />
      <Box sx={{ px: 2, pt: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Proveedor</InputLabel>
              <Select
                fullWidth
                label="Categoria"
                variant="outlined"
                value={proveedorSeleccionado}
                onChange={(e) => {
                  setProveedorSeleccionado(Number(e.target.value));
                  setFormData({
                    ...formData,
                    idProveedor: e.target.value.toString(),
                  });
                }}
                sx={{ mb: 2 }}
              >
                <MenuItem value={0}>Seleccionar</MenuItem>
                {proveedores.map((proveedor) => (
                  <MenuItem
                    key={proveedor.idProveedor}
                    value={proveedor.idProveedor}
                  >
                    {proveedor.nombreProveedor}
                  </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Producto</InputLabel>
              <Select
                fullWidth
                label="Categoria"
                variant="outlined"
                value={productoSeleccionado}
                onChange={(e) => {
                  setProductoSeleccionado(Number(e.target.value));
                  setFormData({
                    ...formData,
                    idProducto: e.target.value.toString(),
                  });
                }}
                sx={{ mb: 2 }}
              >
                <MenuItem value={0}>Seleccionar</MenuItem>
                {productos.map((producto) => (
                  <MenuItem
                    key={producto.idProducto}
                    value={producto.idProducto}
                  >
                    {producto.nombre}
                  </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Cantidad"
              variant="outlined"
              type="number"
              value={formData.cantidad}
              onChange={(e) =>
                setFormData({ ...formData, cantidad: Number(e.target.value)})
              }
            />
          </Grid>
        </Grid>
      </Box>
      <BotonesModal
        accion={handleRegistrarIngresoProducto}
        cerrar={handleCloseModal}
      />
    </ContenedorModal>
  )

}

export default RegistrarIngresoProductos;