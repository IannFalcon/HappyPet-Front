import { Card, Modal } from '@mui/material';
import React from 'react'

interface ContenedorModalProps {
  open: boolean;
  onClose: () => void;
  ancho: number;
  alto: number;
  children: React.ReactNode;
}

const ContenedorModal: React.FC<ContenedorModalProps> = ({ open, onClose, ancho, alto, children }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
      }}
    >
      <Card
        sx={{         
          width: `${ancho}px`, 
          height: `${alto}px`,
          p: 4,
          display: "flex",
          flexDirection: "column",
          overflowY: "auto"
        }}
      >
        { children }
      </Card>
    </Modal>
  )
}

export default ContenedorModal;