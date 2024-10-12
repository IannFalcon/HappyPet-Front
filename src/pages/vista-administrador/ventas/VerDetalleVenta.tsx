import React, { useEffect, useState } from 'react'
import ContenedorModal from '../../../components/admin-components/ContenedorModal';
import TituloModal from '../../../components/admin-components/TituloModal';
import ContenedorTabla from '../../../components/admin-components/ContenedorTabla';
import { Button, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { DetalleVenta } from '../../../models/DetalleVenta';
import axios from 'axios';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  idVenta: number | null;
}

interface Columna {
  id: keyof DetalleVenta;
  label: string;
  minWidth?: number;
  align?: "center";
}

const columnas: Columna[] = [
  { id: 'idDetalleVenta', label: 'ID', minWidth: 50, align: 'center' },
  { id: 'productoDetalle', label: 'Nombre del producto', minWidth: 100 },
  { id: 'cantidad', label: 'Cantidad', minWidth: 30, align: 'center' },
  { id: 'total', label: 'Total', minWidth: 30, align: 'center' },
];

const VerDetalleVenta: React.FC<ModalProps> = ({ open, onClose, idVenta }) => {

  const [detallesVenta, setDetallesVenta] = useState<DetalleVenta[]>([]);

  const obtenerDetallesVenta = async (id: number) => {
    try {
      const response = await axios.get(`http://192.168.0.3:5045/api/DetalleVenta/${id}`);
      setDetallesVenta(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (idVenta !== 0 && idVenta !== null) {
      obtenerDetallesVenta(idVenta);
    }
  }, [idVenta]);
  
  return (
    <ContenedorModal
      open={open}
      onClose={onClose}
      ancho={1000}
      alto={500}
    >

      <TituloModal titulo="Ver Detalle de Venta"/>

      <ContenedorTabla>
        <TableHead>
          {columnas.map((columna) => (
            <TableCell
              key={columna.id}
              align={"center"}
              style={{ minWidth: columna.minWidth, fontWeight: 'bold' }}
            >
              {columna.label}
            </TableCell>
          ))}
        </TableHead>
        <TableBody>
          {detallesVenta.map((detalleVenta) => (
            <TableRow>
              {columnas.map((columna) => (
                <TableCell key={columna.id} align={columna.align}>
                  {columna.id === 'productoDetalle' ? detalleVenta.productoDetalle.nombre : detalleVenta[columna.id]}
                </TableCell>
              ))}
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={3} align="right">
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>Total:</Typography>
            </TableCell>
            <TableCell colSpan={1} align="center">
              <Typography variant="body2">{detallesVenta.reduce((acc, item) => acc + item.total, 0)}</Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </ContenedorTabla>

      <Button
        variant="contained"
        color="primary"
        onClick={onClose}
        sx={{ 
          width: '20%',
          marginLeft: "auto",
          marginTop: "auto"
        }}
      >
        Cerrar
      </Button>

    </ContenedorModal>
  );
}

export default VerDetalleVenta;
