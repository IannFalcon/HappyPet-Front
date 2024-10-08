import { Box, Button } from '@mui/material';
import React from 'react'

interface BotonesModalProps {
  registrar: (e: React.MouseEvent<HTMLButtonElement>) => void;
  cerrar: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const BotonesModal: React.FC<BotonesModalProps> = ({ registrar, cerrar }) => {
  return (
    <Box
      sx={{
        marginTop: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 1
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={registrar}
      >
        Registrar
      </Button>
      <Button
        variant="contained"
        color="error"
        onClick={cerrar}
      >
        Cerrar
      </Button>
    </Box>
  )
}

export default BotonesModal;