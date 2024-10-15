import { Box, IconButton, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Carrito } from '../../models/Carrito';
import ContenedorTabla from '../../components/admin-components/ContenedorTabla';
import { Producto } from '../../models/Producto';
import { Add, Remove } from '@mui/icons-material';
import { accionesCarrito, obtenerProductosCarrito } from '../../services/carrito-service';
import { useOutletContext } from 'react-router-dom';

interface Columnas {
  id: keyof Producto | "idCarrito" | "cantidad" | "precioTotal";
  label: string;
  minWidth?: number;
  align?: "right";
}

const columnas: Columnas[] = [
  { id: "rutaImagen", label: "Imagen", minWidth: 50 },
  { id: "nombre", label: "Nombre", minWidth: 100 },
  { id: "descripcion", label: "Descripción", minWidth: 100 },
  { id: "precioUnitario", label: "Precio", minWidth: 50 },
  { id: "cantidad", label: "Cantidad", minWidth: 50 },
  { id: "precioTotal", label: "Precio Total", minWidth: 50 },
];

interface OutletContext {
  actualizarCantidadProductos: () => void;
};

const VistaCarrito: React.FC = () => {

  const { actualizarCantidadProductos } = useOutletContext<OutletContext>();

  const [productosCarrito, setProductosCarrito] = useState<Carrito[]>([]);

  const listarProductosCarrito = async () => {
    const productos = await obtenerProductosCarrito();
    setProductosCarrito(productos);
  };

  const aumentarCantidadProducto = async (idProducto: number) => {
    await accionesCarrito(idProducto, false);
    await listarProductosCarrito();
    actualizarCantidadProductos();
  };

  const restarCantidadProducto = async (idProducto: number) => {
    await accionesCarrito(idProducto, true);
    await listarProductosCarrito();
    actualizarCantidadProductos();
  };

  useEffect(() => {
    listarProductosCarrito();
  }, []);

  return (
    <Box
      sx={{
        p: 5,
        pt: 15,
        display: "flex",
        flexDirection: "row",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Box
        sx={{
          width: "70%",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            mb: 2,
          }}
        >
          Carrito
        </Typography>
        <ContenedorTabla>
          <TableHead>
            <TableRow>
              {columnas.map((columna) => (
                <TableCell
                  key={columna.id}
                  align={"center"}
                  style={{ minWidth: columna.minWidth }}
                >
                  {columna.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {productosCarrito.map((producto) => (
              <TableRow>
                {columnas.map((columna) => {
                  const value =
                    columna.id === "precioTotal"
                      ? ""
                      : (producto.productosCarrito as any)[columna.id];
                  return (
                    <TableCell key={columna.id} align={columna.align}>
                      {columna.id === "rutaImagen" ? (
                        <img
                          src={producto.productosCarrito.rutaImagen}
                          alt={producto.productosCarrito.nombre}
                          style={{ width: "50px", height: "50px" }}
                        />
                      ) : columna.id === "cantidad" ? (
                        <Box 
                          width="100%"
                          display="flex"
                          justifyContent="center"
                        >
                          <IconButton 
                            size="small" 
                            onClick={() => restarCantidadProducto(producto.idProducto)}
                          >
                            <Remove />
                          </IconButton>
                          <TextField
                            disabled
                            size="small"
                            sx={{ 
                              width: "50px",
                              textAlign: "center",
                            }}
                            value={producto.cantidad}>
                          </TextField>
                          <IconButton 
                            size="small" 
                            onClick={() => aumentarCantidadProducto(producto.idProducto)}
                          >
                            <Add />
                          </IconButton>
                        </Box>
                      ) : columna.id === "precioTotal" ? (
                        producto.cantidad *
                        producto.productosCarrito.precioUnitario
                      ) : (
                        value
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={5} align="right">
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  Total:
                </Typography>
              </TableCell>
              <TableCell colSpan={1} align="left">
                <Typography variant="body2">
                  {productosCarrito.reduce(
                    (acc, item) => acc + (item.productosCarrito as any).precioUnitario * item.cantidad, 0).toFixed(2)}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </ContenedorTabla>
      </Box>
    </Box>
  );
}

export default VistaCarrito;
