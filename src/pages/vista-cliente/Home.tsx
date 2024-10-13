import { Box, Button, FormControlLabel, IconButton, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import banner from '../../assets/banner.jpg';
import React, { useEffect, useState } from 'react'
import { Pets, ShoppingCart } from '@mui/icons-material';
import { Marca } from '../../models/Marca';
import { Categoria } from '../../models/Categoria';
import { Producto } from '../../models/Producto';
import axios from 'axios';

const Home: React.FC = () => {

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);

  const [idCategoria, setIdCategoria] = useState<number | null>(null);
  const [idMarca, setIdMarca] = useState<number | null>(null);
  const [nomProducto, setNomProducto] = useState<string | null>(null);

  const obtenerCategorias = async () => {

    try {
      const response = await axios.get("http://192.168.0.3:5045/api/Categoria");
      setCategorias(response.data.data);
    } catch (error) {
      console.log(error);
    }

  }

  const obtenerMarcas = async () => {

    try {
      const response = await axios.get("http://192.168.0.3:5045/api/Marca");
      setMarcas(response.data.data);
    } catch (error) {
      console.log(error);
    }

  }

  const obtenerProductos = async () => {
    
    try {
      const response = await axios.get("http://192.168.0.3:5045/api/Producto");
      setProductos(response.data.data);
    } catch (error) {
      console.log(error);
    }

  }

  const buildUrlWithParams = (baseUrl: string, params: { [key: string]: any }) => {
    const url = new URL(baseUrl);
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null) {
        url.searchParams.append(key, params[key]);
      }
    });
    return url.toString();
  };

  const obtenerProductosFiltrados = async (idCategoria?: number, idMarca?: number, nombre?: string) => {
    try {
      const url = buildUrlWithParams("http://192.168.0.3:5045/api/Producto", {
        id_categoria: idCategoria,
        id_marca: idMarca,
        nombre: nombre
      });
      const response = await axios.get(url);
      setProductos(response.data.data); 
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    obtenerCategorias();
    obtenerMarcas();
    obtenerProductos();
  }, []);

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
            p: 2,
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
              fontWeight: "bold",
              textAlign: "center",
              mb: 3,
            }}
          >
            FILTROS
          </Typography>
          {/* Categorias */}
          <Box sx={{ mb: 2 }}>
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
                control={ <Radio /> } 
                label="Todas las categorías" 
                onChange={() => {
                  setIdCategoria(null);
                  obtenerProductosFiltrados(undefined, idMarca ?? undefined, nomProducto ?? undefined);
                }}
              />
              {categorias.map((categoria) => (
                <FormControlLabel 
                  key={categoria.idCategoria}
                  value={categoria.idCategoria}
                  control={ <Radio /> } 
                  label={categoria.nombre}
                  onChange={() => {
                    setIdCategoria(categoria.idCategoria);
                    obtenerProductosFiltrados(categoria.idCategoria, idMarca ?? undefined, nomProducto ?? undefined);
                  }}
                />
              ))}
            </RadioGroup>
          </Box>
          {/* Marcas */}
          <Box>
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
                control={ <Radio /> } 
                label="Todas las marcas" 
                onChange={() => {
                  setIdMarca(null);
                  obtenerProductosFiltrados(idCategoria ?? undefined, undefined, nomProducto ?? undefined);
                }} 
              />
              {marcas.map((marca) => (
                <FormControlLabel 
                  key={marca.idMarca}
                  value={marca.idMarca} 
                  control={ <Radio /> } 
                  label={marca.nombre}
                  onChange={() => {
                    setIdMarca(marca.idMarca);
                    obtenerProductosFiltrados(idCategoria ?? undefined, marca.idMarca, nomProducto ?? undefined);
                  }}
                />
              ))}
            </RadioGroup>
          </Box>
          <Box>
            <TextField
              fullWidth
              label="Buscar producto por nombre"
              variant="outlined"
              sx={{ mt: 2 }}
              onChange={(e) => {
                setNomProducto(e.target.value);
                obtenerProductosFiltrados(idCategoria ?? undefined, idMarca ?? undefined, e.target.value);
              }}
            />
          </Box>
        </Box>

        {/* Productos */}
        <Box
          sx={{
            width: "80%",
            pl: 2,
            pr: 2,
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: 2,
            }}
          >
            {productos.map((producto) => (
              <Box
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  border: "1px solid #000",
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
                    src={producto.rutaImagen}
                    alt={producto.nombre}
                    style={{ width: "100px", height: "100px" }}
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
                      mt: 1,
                      mb: 0,
                      fontWeight: "550",
                    }}
                  >
                    S/{producto.precioUnitario.toFixed(2)}
                  </Typography>
                </Box>
                <Box
                  gap={1}
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    mt: "auto",
                  }}
                >
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
                  >
                    <ShoppingCart sx={{ padding: 0 }} />
                  </IconButton>
                  <Button
                    variant="contained"
                    sx={{
                      width: "80%",
                      bgcolor: "#0d6efd",
                    }}
                  >
                    Ver detalles
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Home;
