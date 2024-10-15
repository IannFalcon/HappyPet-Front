import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom';
import Header from '../components/cliente-components/Header';
import { cantidadProductosCarrito } from '../services/carrito-service';

const PrincipalCliente: React.FC = () => {

  const [cantidadProductos, setCantidadProductos] = useState<number>(0);

  const actualizarCantidadProductos = async () => {
    try {
      const cantidad = await cantidadProductosCarrito();
      setCantidadProductos(cantidad);
    } catch (error) {
      console.error("Error al obtener la cantidad de productos: ", error);
    }
  }

  useEffect(() => {
    actualizarCantidadProductos();
  }, []);

  return (
    <>
      <Box>
        <Header cantidadProductos={cantidadProductos}/>
        <Outlet context={{ actualizarCantidadProductos }}/>
      </Box>
    </>
  );
}

export default PrincipalCliente;