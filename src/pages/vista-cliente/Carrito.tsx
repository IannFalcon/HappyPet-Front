import { Box, IconButton, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Carrito } from '../../models/Carrito';
import ContenedorTabla from '../../components/admin-components/ContenedorTabla';
import { Producto } from '../../models/Producto';
import { Add, Remove } from '@mui/icons-material';
import { obtenerProductos } from '../../services/carrito-service';

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

const VistaCarrito: React.FC = () => {

  const [productosCarrito, setProductosCarrito] = useState<Carrito[]>([]);
  const idUsuario = localStorage.getItem("usuario") ? JSON.parse(localStorage.getItem("usuario")!).data.idUsuario : 0;

  const obtenerProductosCarrito = async () => {
    const productos = await obtenerProductos(idUsuario);
    setProductosCarrito(productos);
  }

  useEffect(() => {
    obtenerProductosCarrito();
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
                          <IconButton size="small" onClick={() => {}}><Add /></IconButton>
                          <TextField
                            disabled
                            size="small"
                            sx={{ 
                              width: "50px",
                              textAlign: "center",
                            }}
                            value={producto.cantidad}>
                          </TextField>
                          <IconButton size="small" onClick={() => {}}><Remove /></IconButton>
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
                    (acc, item) => acc + (item.productosCarrito as any).precioUnitario * item.cantidad, 0)}
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
