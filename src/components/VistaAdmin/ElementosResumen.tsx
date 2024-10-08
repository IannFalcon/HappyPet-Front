import { Box, Typography } from "@mui/material";
import React from "react";

interface ElementosResumenProps {
  colorFondo: string;
  colorTexto: string;
  titulo: string;
  textoMonto: string;
  textCantidad: string;
  icono?: React.ReactNode;
}

export const ElementosResumen: React.FC<ElementosResumenProps> = ({ colorFondo, colorTexto, titulo, textoMonto, textCantidad, icono }) => {
  return (
    <Box
      sx={{
        width: "22%",
        p: 4,
        display: "flex",
        flexDirection: "column",
        bgcolor: `${colorFondo}`,
        color: `${colorTexto}`,
        gap: 2,
        borderRadius: 4,
      }}
    >
      <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
        <Typography variant="h5">{titulo}</Typography>
        {icono}
      </Box>
      <Typography variant="h4">{textoMonto}</Typography>
      <Typography variant="body1">{textCantidad}</Typography>
    </Box>
  );
};
