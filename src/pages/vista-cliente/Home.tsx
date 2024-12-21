import { Box, Button, Divider, FormControlLabel, IconButton, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import banner from '../../assets/banner.jpg';
import React, { useEffect, useState } from 'react'
import { Add, Pets, Remove, ShoppingCart } from '@mui/icons-material';
import { Marca } from '../../interfaces/Marca';
import { Categoria } from '../../interfaces/Categoria';
import { Producto } from '../../interfaces/Producto';
import { accionesCarrito, obtenerProductosCarrito } from '../../services/carrito-service';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Carrito } from '../../interfaces/Carrito';
import { obtenerCategorias } from '../../services/categoria-service';
import { obtenerMarcas } from '../../services/marca-service';
import { obtenerProductosFiltrados } from '../../services/producto-service';
import defaultImagen from '../../assets/default.jpg';

interface OutletContext {
  actualizarCantidadProductos: () => void;
  session: boolean;
};

const Home: React.FC = () => {

  const { actualizarCantidadProductos, session } = useOutletContext<OutletContext>();

  // Para obtener las categorias, marcas, productos y productos del carrito
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [productosCarrito, setProductosCarrito] = useState<Carrito[]>([]);

  // Para los filtros
  const [idCategoria, setIdCategoria] = useState<number | null>(null);
  const [idMarca, setIdMarca] = useState<number | null>(null);
  const [nomProducto, setNomProducto] = useState<string | null>(null);

  const navigate = useNavigate();

  const listarCategorias = async () => {
    try {
      const data = await obtenerCategorias();
      setCategorias(data);
    } catch (error) {
      console.log(error);
    }
  }

  const listarMarcas = async () => {
    try {
      const data = await obtenerMarcas();
      setMarcas(data);
    } catch (error) {
      console.log(error);
    }
  }

  const listarProductosFiltrados = async (idCategoria?: number, idMarca?: number, nombre?: string) => {
    try {
      const data = await obtenerProductosFiltrados(idCategoria, idMarca, nombre);
      setProductos(data);
    } catch (error) {
      console.log(error);
    }
  }

  const listaProductosCarrito = async () => {
    const productos = await obtenerProductosCarrito();
    setProductosCarrito(productos);
  }

  const actualizarListadoProductos = async () => {
    if (session) {
      actualizarCantidadProductos();
      await listaProductosCarrito();
      await listarProductosFiltrados(idCategoria ?? undefined, idMarca ?? undefined, nomProducto ?? undefined);
    } else {
      await listarProductosFiltrados(idCategoria ?? undefined, idMarca ?? undefined, nomProducto ?? undefined);
    }
  }

  const validarProductoCarrito = (idProducto: number) => {
    return productosCarrito.some(producto => producto.idProducto === idProducto);
  }

  const ejecutarAccionesCarrito = async (idProducto: number, accion: boolean) => {
    await accionesCarrito(idProducto, accion);
    await actualizarListadoProductos();
  };

  useEffect(() => {
    listarCategorias();
    listarMarcas();
    listarProductosFiltrados();
    actualizarListadoProductos();
  }, [session]);

  return (
    <>
      <Box
        sx={{
          height: "100vh",
          backgroundImage: `linear-gradient(to top, rgba(0, 70, 100, 0.8) 0%, rgba(0, 0, 0, 0.4) 100%), url(${banner})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            color: "white",
            fontSize: "3rem",
          }}
        >
          <Typography
            variant="h2"
            align="center"
            sx={{
              fontWeight: "bold",
              textTransform: "uppercase",
              mb: 2,
            }}
          >
            HappyPet
          </Typography>
          <Typography
            variant="h4"
            align="center"
            sx={{
              fontWeight: "bold",
              textTransform: "uppercase",
              alignItems: "center",
            }}
          >
            Porque su felicidad es nuestra misión
            <Pets sx={{ ml: 2, width: "1.8rem", height: "1.8rem" }} />
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          p: 5,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {/* Filtros */}
        <Box
          sx={{
            width: "20%",
            mr: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            border: "1px solid #000",
          }}
        >

          <Typography
            variant="h5"
            sx={{
              width: "100%",
              py: 2,
              bgcolor: "#2C2C2C",
              color: "#fff",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            FILTROS
          </Typography>

          {/* Buscar por nombre */}
          <Box sx={{ pt: 1, pb: 2, px: 3 }}>
            <TextField
              fullWidth
              label="Buscar producto por nombre"
              variant="outlined"
              sx={{ mt: 2 }}
              onChange={(e) => {
                setNomProducto(e.target.value);
                listarProductosFiltrados(
                  idCategoria ?? undefined,
                  idMarca ?? undefined,
                  e.target.value
                );
              }}
            />
          </Box>

          <Divider sx={{ mt: 1, mb: 2, mx: 2 }} />

          {/* Categorias */}
          <Box sx={{ pb: 2, px: 3 }}>
            <Typography
              variant="h6"
              sx={{
                width: "100%",
                fontWeight: "bold",
                mb: 1,
              }}
            >
              Categorias:
            </Typography>
            <RadioGroup sx={{ ml: 2 }}>
              <FormControlLabel
                value={0}
                control={<Radio />}
                label="Todas las categorías"
                onChange={() => {
                  setIdCategoria(null);
                  listarProductosFiltrados(
                    undefined,
                    idMarca ?? undefined,
                    nomProducto ?? undefined
                  );
                }}
              />
              {categorias.map((categoria) => (
                <FormControlLabel
                  key={categoria.idCategoria}
                  value={categoria.idCategoria}
                  control={<Radio />}
                  label={categoria.nombre}
                  onChange={() => {
                    setIdCategoria(categoria.idCategoria);
                    listarProductosFiltrados(
                      categoria.idCategoria,
                      idMarca ?? undefined,
                      nomProducto ?? undefined
                    );
                  }}
                />
              ))}
            </RadioGroup>
          </Box>

          {/* Marcas */}
          <Box sx={{ pb: 2, px: 3 }}>
            <Typography
              variant="h6"
              sx={{
                width: "100%",
                fontWeight: "bold",
                mb: 1,
              }}
            >
              Marcas:
            </Typography>
            <RadioGroup sx={{ ml: 2 }}>
              <FormControlLabel
                value={0}
                control={<Radio />}
                label="Todas las marcas"
                onChange={() => {
                  setIdMarca(null);
                  listarProductosFiltrados(
                    idCategoria ?? undefined,
                    undefined,
                    nomProducto ?? undefined
                  );
                }}
              />
              {marcas.map((marca) => (
                <FormControlLabel
                  key={marca.idMarca}
                  value={marca.idMarca}
                  control={<Radio />}
                  label={marca.nombre}
                  onChange={() => {
                    setIdMarca(marca.idMarca);
                    listarProductosFiltrados(
                      idCategoria ?? undefined,
                      marca.idMarca,
                      nomProducto ?? undefined
                    );
                  }}
                />
              ))}
            </RadioGroup>
          </Box>

        </Box>

        {/* Productos */}
        <Box sx={{ width: "80%", px: 2 }}>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: 3,
            }}
          >
            {productos.map((producto) => (
              <Box
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.5)",
                  borderRadius: "10px",
                }}
              >
                <Box
                  sx={{
                    pb: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    alignContent: "center",
                  }}
                >
                  <img
                    src={producto.rutaImagen ? producto.rutaImagen : defaultImagen}
                    alt={producto.nombre}
                    style={{ width: "100%", height: "180px", marginBottom: "10px", borderRadius: "10px" }}
                  />
                  <Typography
                    variant="body1"
                    sx={{
                      textAlign: "center",
                      fontWeight: "bold",
                      mt: 1,
                    }}
                  >
                    {producto.nombre}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      mt: 1,
                      textAlign: "center",
                    }}
                  >
                    {producto.descripcion}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      mt: 2,
                      fontWeight: "550",
                    }}
                  >
                    S/{producto.precioUnitario.toFixed(2)}
                  </Typography>
                </Box>
                {validarProductoCarrito(producto.idProducto) ? (
                  <>
                    <Box
                      gap={1}
                      sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        mt: "auto",
                        justifyContent: "center",
                      }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <IconButton
                          sx={{
                            bgcolor: "#dc3545",
                            color: "white",
                            borderRadius: "5px",
                            transition: "all 0.3s",
                            "&:hover": {
                              bgcolor: "#000",
                              color: "#dc3545",
                            },
                          }}
                          onClick={() => ejecutarAccionesCarrito(producto.idProducto, true)}
                        >
                          <Remove sx={{ padding: 0 }} />
                        </IconButton>
                        <Typography
                          variant="body1"
                          sx={{
                            width: "50%",
                            py: 1,
                            textAlign: "center",
                            fontWeight: "bold",
                            color: "2C2C2C",
                            border: "1px solid #000",
                            borderRadius: "8px",
                          }}
                        >
                          {productosCarrito.find((item) => item.idProducto === producto.idProducto)?.cantidad}
                        </Typography>
                        <IconButton
                          sx={{
                            bgcolor: "#dc3545",
                            color: "white",
                            borderRadius: "5px",
                            transition: "all 0.3s",
                            "&:hover": {
                              bgcolor: "#000",
                              color: "#dc3545",
                            },
                          }}
                          onClick={() => ejecutarAccionesCarrito(producto.idProducto, false)}
                        >
                          <Add sx={{ padding: 0 }} />
                        </IconButton>
                      </Box>
                      <Button
                        fullWidth
                        variant="contained"
                        sx={{ bgcolor: "#0d6efd" }}
                        onClick={() => navigate(`/detalle-producto/${producto.idProducto}`)}
                      >
                        Ver detalles
                      </Button>
                    </Box>
                  </>
                ) : (
                  <>
                    <Box
                      gap={1}
                      sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        mt: "auto",
                      }}
                    >
                      {session && (
                        <IconButton
                          sx={{
                            bgcolor: "#ffc107",
                            color: "black",
                            borderRadius: "5px",
                            transition: "all 0.3s",
                            "&:hover": {
                              bgcolor: "#000",
                              color: "#ffc107",
                            },
                          }}
                          onClick={() => ejecutarAccionesCarrito(producto.idProducto, false)}
                        >
                          <ShoppingCart sx={{ padding: 0 }} />
                        </IconButton>
                      )}
                      <Button
                        variant="contained"
                        sx={{
                          width: session ? "80%" : "100%",
                          bgcolor: "#0d6efd",
                        }}
                        onClick={() => navigate(`/detalle-producto/${producto.idProducto}`)}
                      >
                        Ver detalles
                      </Button>
                    </Box>
                  </>
                )}
              </Box>
            ))}
          </Box>

        </Box>
      </Box>
    </>
  );
}

export default Home;
