import { AddCircle, Delete, Download, Edit } from '@mui/icons-material';
import { Box, Button, Divider } from '@mui/material';
import React from 'react'

interface BotonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  text: string;
}

interface BotonesModalProps {
  objeto?: any;
  accion: (e: React.MouseEvent<HTMLButtonElement>) => void;
  cerrar: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

interface BotonesAccionProps {
  editar: (e: React.MouseEvent<HTMLButtonElement>) => void;
  eliminar: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const BotonAgregar: React.FC<BotonProps> = ({ onClick, text }) => {
  return (
    <Button
      variant="contained"
      color="success"
      startIcon={<AddCircle />}
      onClick={onClick}
    >
      {text}
    </Button>
  );
}

export const BotonExportar: React.FC<BotonProps> = ({ onClick, text }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      sx={{ ml: "auto" }}
      startIcon={<Download />}
      onClick={onClick}
    >
      {text}
    </Button>
  );
}

export const BotonesModal: React.FC<BotonesModalProps> = ({ objeto, accion, cerrar }) => {
  return (
    <Box
      sx={{
        marginTop: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Divider sx={{ width: "100%" }}/>
      <Box 
        sx={{
          pt: 2, 
          px: 2,
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          gap: 1,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={accion}
        >
          {objeto ? "Editar" : "Registrar"}
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={cerrar}
        >
          Cerrar
        </Button>
      </Box>
    </Box>
  );
}

export const BotonesAccion: React.FC<BotonesAccionProps> = ({ editar, eliminar }) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Button
        variant="contained"
        color="primary"
        sx={{ fontSize: "0.8rem" }}
        startIcon={<Edit sx={{ height: "1rem" }} />}
        onClick={editar}
      >
        Editar
      </Button>
      <Button
        variant="contained"
        color="error"
        sx={{ fontSize: "0.8rem" }}
        onClick={eliminar}
        startIcon={<Delete sx={{ height: "1rem" }} />}
      >
        Eliminar
      </Button>
    </Box>
  );
}