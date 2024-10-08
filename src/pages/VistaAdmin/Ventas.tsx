import React from 'react'
import Contenedor from '../../components/VistaAdmin/Contenedor'
import ContenedorBotones from '../../components/VistaAdmin/ContenedorBotones';
import { Button } from '@mui/material';
import { BotonExportar } from '../../components/VistaAdmin/Botones';

const Ventas: React.FC = () => {
  return (
    <Contenedor>
      <ContenedorBotones>
        <Button />
        <BotonExportar
          onClick={() => console.log("Exportar")}
          text="Exportar"
        />
      </ContenedorBotones>
    </Contenedor>
  )
}

export default Ventas;