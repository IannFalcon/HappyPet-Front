import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react'
import { Producto } from '../../models/Producto';
import { obtenerProductoPorId } from '../../services/producto-service';
import { useParams } from 'react-router-dom';
import { formatoFecha } from '../../utils/dateFormat';
import defaultImagen from '../../assets/default.jpg';

const DetallesProducto = () => {

  const { id } = useParams<{ id: string }>();
  const [producto, setProducto] = useState<Producto>();

  const handleObtenerProducto = async (id: number) => {
    try{
      const datosProducto = await obtenerProductoPorId(id);
      setProducto(datosProducto);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (id) {
      handleObtenerProducto(Number(id));
    }
  }, [id]);

  return (
    <Box 
      sx={{ 
        width: "100%", 
        height: "100vh", 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center" 
      }}
    >
      <Box 
        sx={{ 
          display: "flex", 
          flexDirection: "row",
          alignItems: "center",
          gap: 3 
        }}
      >
        <Box 
          sx={{
            minWidth: 350,
            display: "flex", 
            flexDirection: "column",
            gap: 2
          }}
        >
          <Typography variant="h4">{producto?.nombre}</Typography>
          <Typography variant="body1">{producto?.descripcion}</Typography>
          <Typography variant="body1"><strong>Precio:</strong> {`S/ ${producto?.precioUnitario.toFixed(2)}`}</Typography>
          <Typography variant="body1"><strong>Unidades disponibles:</strong> {producto?.stock}</Typography>
          <Typography variant="body1"><strong>Categoria:</strong> {producto?.productoCategoria?.nombre}</Typography>
          <Typography variant="body1"><strong>Marca:</strong> {producto?.productoMarca?.nombre}</Typography>
          <Typography variant="body1">
            <strong>Fecha de vencimiento:</strong> {producto?.fecVencimiento ? formatoFecha(producto?.fecVencimiento) : 'No aplica'}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => window.history.back()}
          >
            Regresar
          </Button>
        </Box>
        <Box>
          <img 
            src={producto?.rutaImagen 
                ? producto?.rutaImagen
                : defaultImagen} 
            alt={producto?.nombre} 
            width="350" 
            height="350"
          />
        </Box>
      </Box>
    </Box>
  )
}

export default DetallesProducto;
