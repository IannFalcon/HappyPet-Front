import { AddCircle, Download } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react'

interface BotonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  text: string;
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
  )
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
  )
}