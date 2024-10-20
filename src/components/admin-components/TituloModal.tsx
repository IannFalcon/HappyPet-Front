import { Box, Typography } from '@mui/material';
import React from 'react'

interface TituloModalProps {
  titulo: string;
}

const TituloModal: React.FC<TituloModalProps> = ({ titulo }) => {
  return (
    <Box
      sx={{
        px: 2,
        pb: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderBottom: "1px solid #ccc",
      }}
    >
      <Typography
        variant="h5"
        sx={{ textTransform: "uppercase" }}
      >
        {titulo}
      </Typography>
    </Box>
  )
}

export default TituloModal;