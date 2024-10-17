import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom';
import Header from '../components/cliente-components/Header';
import { cantidadProductosCarrito } from '../services/carrito-service';
import { obtenerUsuario } from '../utils/localStorage';

const PrincipalCliente: React.FC = () => {

  const [cantidadProductos, setCantidadProductos] = useState<number>(0);
  const [session, setSession] = useState<boolean>(false);

  useEffect(() => {
    const validarSesion = () => {
      const usuario = obtenerUsuario();
      if (usuario === null) {
        setSession(false);
      } else {
        setSession(true);
      }
    }

    validarSesion();
  }, []);

  const actualizarCantidadProductos = async () => {
    try {
      const cantidad = await cantidadProductosCarrito();
      setCantidadProductos(cantidad);
    } catch (error) {
      console.error("Error al obtener la cantidad de productos: ", error);
    }
  }

  useEffect(() => {
    if (session) {
      actualizarCantidadProductos();
    }
  }, [session]);

  return (
    <>
      <Box>
        <Header cantidadProductos={cantidadProductos} session={session}/>
        <Outlet context={{ actualizarCantidadProductos, session }}/>
      </Box>
    </>
  );
}

export default PrincipalCliente;