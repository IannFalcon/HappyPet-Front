import React from 'react'
import Contenedor from '../../components/VistaAdmin/Contenedor'
import ContenedorBotones from '../../components/VistaAdmin/ContenedorBotones';
import { Button } from '@mui/material';
import { Download } from '@mui/icons-material';

const Ventas: React.FC = () => {
  return (
    <Contenedor>
      <ContenedorBotones>
        <Button>
          
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ ml: "auto" }}
          startIcon={<Download />}
        >
          Exportar
        </Button>
      </ContenedorBotones>
    </Contenedor>
  )
}

export default Ventas;