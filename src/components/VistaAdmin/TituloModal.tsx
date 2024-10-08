import { Box, Typography } from '@mui/material';
import React from 'react'

interface TituloModalProps {
  titulo: string;
}

const TituloModal: React.FC<TituloModalProps> = ({ titulo }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
        borderBottom: "1px solid #ccc",
      }}
    >
      <Typography
        variant="h5"
        component="h2"
      >
        {titulo}
      </Typography>
    </Box>
  )
}

export default TituloModal;