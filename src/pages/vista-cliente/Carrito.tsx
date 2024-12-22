import { Box, Button, Divider, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Carrito } from '../../interfaces/Carrito';
import ContenedorTabla from '../../components/admin-components/ContenedorTabla';
import { Producto } from '../../interfaces/Producto';
import { Add, Payment, Remove } from '@mui/icons-material';
import { accionesCarrito, obtenerProductosCarrito } from '../../services/carrito-service';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { obtenerIdCliente } from '../../utils/localStorage';
import { manejarRedireccion, realizarPago } from '../../services/pago-service';
import defaultImagen from '../../assets/default.jpg';
import { obtenerDireccionesCliente } from '../../services/direccion-cliente-service';

interface Columnas {
  id: keyof Producto | "idCarrito" | "cantidad" | "precioTotal";
  label: string;
  minWidth?: number;
  align?: "center";
}

const columnas: Columnas[] = [
  { id: "rutaImagen", label: "Imagen", minWidth: 50, align: "center" },
  { id: "nombre", label: "Nombre", minWidth: 100 },
  { id: "descripcion", label: "Descripción", minWidth: 100 },
  { id: "precioUnitario", label: "Precio", minWidth: 50 },
  { id: "cantidad", label: "Cantidad", minWidth: 50 },
  { id: "precioTotal", label: "Precio Total", minWidth: 50 },
];

interface OutletContext {
  actualizarCantidadProductos: () => void;
  session: boolean;
};

declare global {
  interface Window {
    redireccionManejada?: boolean;
  }
}

const VistaCarrito: React.FC = () => {

  const { actualizarCantidadProductos, session } = useOutletContext<OutletContext>();
  
  const idCliente = obtenerIdCliente();

  const [productosCarrito, setProductosCarrito] = useState<Carrito[]>([]);

  const [direcciones, setDirecciones] = useState<any[]>([]);
  const [direccionSeleccionada, setDireccionSeleccionada] = useState<number>(0);
  const [direccionEnvio, setDireccionEnvio] = useState({
    pais: "Perú",
    ciudad: "Lima",
    direccion: "Av. San Martin",
    codigoPostal: "12354"
  })

  const navigate = useNavigate();

  window.onload = () => {
    if (!window.redireccionManejada) {
      window.redireccionManejada = true;
      manejarRedireccion();
    }
  };

  const calcularTotal = () => {
    return productosCarrito.reduce(
      (acc, item) =>
        acc + (item as any).precioUnitario * item.cantidad,
      0
    );
  }

  const obtenerDirecciones = async () => {
    const direcciones = await obtenerDireccionesCliente(idCliente);
    setDirecciones(direcciones);
  }

  const listarProductosCarrito = async () => {
    const productos = await obtenerProductosCarrito();
    setProductosCarrito(productos);
    if (session) {
      actualizarCantidadProductos();
    }
  };

  const ejecutarAccionesCarrito = async (idProducto: number, accion: boolean) => {
    
    const dataToSend = {
      idCliente: idCliente,
      idProducto: idProducto,
      cantidad: "1",
      accion: accion
    }

    await accionesCarrito(dataToSend);
    await listarProductosCarrito();
  };

  useEffect(() => {
    obtenerDirecciones();
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
      {/* Contenedor carrito */}
      <Box
        sx={{
          p: 2,
          width: "70%",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 2,
            px: 2,
            fontWeight: "bold",
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
            {productosCarrito.length 
            ? productosCarrito.map((producto) => (
              <TableRow>
                {columnas.map((columna) => {
                  const value =
                    columna.id === "precioTotal"
                      ? ""
                      : (producto as any)[columna.id];
                  return (
                    <TableCell key={columna.id} align={columna.align}>
                      {columna.id === "rutaImagen" ? (
                        <img
                          src={producto.rutaImagen ? producto.rutaImagen : defaultImagen}
                          alt={producto.nombre}
                          style={{ width: "80px", height: "80px" }}
                        />
                      ) : columna.id === "cantidad" ? (
                        <Box
                          width="100%"
                          display="flex"
                          justifyContent="center"
                        >
                          <IconButton
                            size="small"
                            onClick={() => ejecutarAccionesCarrito(producto.idProducto, true)}
                          >
                            <Remove />
                          </IconButton>
                          <TextField
                            disabled
                            size="small"
                            sx={{
                              width: "50px",
                              "& .MuiInputBase-input": {
                                textAlign: "center",
                              },
                            }}
                            value={producto.cantidad}
                          />
                          <IconButton
                            size="small"
                            onClick={() => ejecutarAccionesCarrito(producto.idProducto, false)}
                          >
                            <Add />
                          </IconButton>
                        </Box>
                      ) : columna.id === "precioTotal" ? (
                        producto.cantidad * producto.precioUnitario
                      ) : (
                        value
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
            : <TableCell 
                colSpan={6}
                sx={{ p: 3, textAlign: "center" }}
              >
                <Typography variant="body2">
                  Aun no se han agregado productos al carrito 
                </Typography>
              </TableCell>}
            <TableRow>
              <TableCell colSpan={5} align="right">
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  Total:
                </Typography>
              </TableCell>
              <TableCell colSpan={1} align="left">
                <Typography variant="body2">
                  {calcularTotal().toFixed(2)}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </ContenedorTabla>
        <Button
          variant="contained"
          color="primary"
          sx={{
            mt: 2,
            p: 1,
            color: "white",
            "&:hover": {
              backgroundColor: "#388e3c",
            },
          }}
          onClick={() => navigate("/")}
        >
          Seguir Comprando
        </Button>
      </Box>
      {/* Contenedor pago */}
      <Box
        sx={{
          p: 2,
          width: "30%",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 2,
            px: 2,
            fontWeight: "bold",
          }}
        >
          Realizar Pago
        </Typography>
        <Box
          sx={{
            p: 2,
            border: "1px solid",
          }}
        >
          <Box>
            <Divider sx={{ mb: 1 }}/>
            <Typography variant="h6" sx={{ p: 1, fontWeight: "bold" }}>
              Detalles de envío
            </Typography>
            <Divider sx={{ mt: 1 }} />
            <Box
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Grid container spacing={2} sx={{ justifyContent: "center" }}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Direccion de envio</InputLabel>
                    <Select
                      fullWidth
                      label="Direccion de envio"
                      variant="outlined"
                      value={direccionSeleccionada}
                      onChange={(e) => {
                        setDireccionSeleccionada(Number(e.target.value));
                        setDireccionEnvio({
                          ...direccionEnvio,
                        });
                      }}
                      sx={{ mb: 2 }}
                    >
                      <MenuItem value={0}>Seleccionar</MenuItem>
                      {direcciones.map((direccion) => (
                        <MenuItem
                          key={direccion.idDireccion}
                          value={direccion.idDireccion}
                        >
                          {direccion.nombre}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{
                      height: "75%",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#388e3c",
                      },
                    }}
                    onClick={() => {}}
                  >
                    Agregar dirección
                  </Button>
                </Grid>
              </Grid>
              <Typography variant="body2">
                <strong>País:</strong>{ ` ${direccionEnvio.pais}` }
              </Typography>
              <Typography variant="body2">
                <strong>Ciudad:</strong>{ ` ${direccionEnvio.ciudad}` }
              </Typography>
              <Typography variant="body2">
                <strong>Direccion:</strong>{ ` ${direccionEnvio.direccion}` }
              </Typography>
              <Typography variant="body2">
                <strong>Código postal:</strong>{ ` ${direccionEnvio.codigoPostal}` }
              </Typography>
              <Typography sx={{ mt: 1, fontSize: "12px" }}>
                Nota: En caso de que la información de contacto sea incorrecta, por favor actualizala en la sección de perfil.
              </Typography>
            </Box>
            <Divider sx={{ mb: 1 }}/>
          </Box>
          <Box>
            <Typography variant="h6" sx={{ p: 1, fontWeight: "bold" }}>
              Detalles del pago
            </Typography>
            <Divider sx={{ mt: 1 }} />
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", textAlign: "left" }}>
                    Productos seleccionados
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                    Cantidad
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                    Precio Total
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productosCarrito.length 
                ? productosCarrito.map((producto) => (
                  <TableRow>
                    <TableCell>{producto.nombre}</TableCell>
                    <TableCell align="center">{producto.cantidad}</TableCell>
                    <TableCell align="center">
                      {( producto.precioUnitario * producto.cantidad).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))
                : <TableCell colSpan={3}>
                    <Typography variant="body2" sx={{ textAlign: "center" }}>
                      Aun no se han agregado productos al carrito
                    </Typography>
                  </TableCell>
                }
                <TableRow>
                  <TableCell colSpan={2} align="right">
                    <Typography variant="body2" fontWeight="bold">
                      Total a pagar:
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2" fontWeight="bold">
                      {calcularTotal().toFixed(2)}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              p: 1,
              backgroundColor: "#4caf50",
              color: "white",
              "&:hover": {
                backgroundColor: "#388e3c",
              },
            }}
            startIcon={<Payment />}
            onClick={() => realizarPago(calcularTotal())}
          >
            Realizar Pago
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default VistaCarrito;
