import { Box } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom';
import Header from '../components/cliente-components/Header';

const PrincipalCliente: React.FC = () => {
  return (
    <>
      <Box>
        <Header />
        <Outlet />
      </Box>
    </>
  );
}

export default PrincipalCliente;