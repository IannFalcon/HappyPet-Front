import React, { useEffect, useState } from 'react'
import Contenedor from '../../../components/admin-components/Contenedor'
import ContenedorBotones from '../../../components/admin-components/ContenedorBotones';
import { Box, Button, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { BotonExportar } from '../../../components/admin-components/Botones';
import ContenedorTabla from '../../../components/admin-components/ContenedorTabla';
import { Venta } from '../../../interfaces/Venta';
import VerDetalleVenta from './VerDetalleVenta';
import { exportarListadoVentas, obtenerVentas } from '../../../services/venta-service';
import { Article } from '@mui/icons-material';

interface Columna {
  id: keyof Venta | "acciones";
  label: string;
  width: number | "auto";
  align: "center" | "left";
}

const columnas: Columna[] = [
  { id: "idTransaccion", label: "ID Transacción", width: 280, align: "left" },
  { id: "usuarioVenta", label: "Nombre del Cliente", width: "auto", align: "left" },
  { id: "fecVenta", label: "Fecha Venta", width: "auto", align: "center" },
  { id: "totalProductos", label: "Cant. Productos", width: "auto", align: "center" },
  { id: "montoTotal", label: "Importe Total", width: "auto", align: "center" },
  { id: "acciones", label: "Acciones", width: 200, align: "center" },
]

const Ventas: React.FC = () => {

  const [ventas, setVentas] = useState<Venta[]>([]);
  const [ventaSeleccionada, setVentaSeleccionada] = useState<number | null>(null);

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = (idVenta?: number) => {
    setVentaSeleccionada(idVenta || null);
    setOpenModal(true);
  }

  const handleCloseModal = () => {
    setVentaSeleccionada(null);
    setOpenModal(false);
  }


  const listarVentas = async () => {
    try {
      const data = await obtenerVentas();
      setVentas(data);
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  const handleExportar = async () => {
    try {
      await exportarListadoVentas();
    } catch (error) {
      console.error("Error: ", error);
      alert("Ocurrió un error al exportar el listado de ventas");
    }
  }

  useEffect(() => {
    listarVentas();
  }, [])

  return (
    <Contenedor>
      <ContenedorBotones>
        <Box />
        <BotonExportar
          onClick={() => handleExportar()}
          text="Exportar"
        />

        <VerDetalleVenta
          open={openModal}
          onClose={handleCloseModal}
          idVenta={ventaSeleccionada}
        />

      </ContenedorBotones>
      <ContenedorTabla>
        <TableHead>
          {columnas.map((columna) => (
            <TableCell
              key={columna.id}
              align={columna.align}
              style={{ width: columna.width }}
            >
              {columna.label}
            </TableCell>
          ))}
        </TableHead>
        <TableBody>
          {ventas.map((venta) => (
            <TableRow>
              {columnas.map((columna) => {
                const value = columna.id === "acciones" ? "" : (venta as any)[columna.id];
                return (
                  <TableCell key={columna.id} align={columna.align}>
                    {columna.id === "usuarioVenta" 
                    ? `${value.nombre} ${value.apellidoPaterno} ${value.apellidoMaterno}`
                    : columna.id === "montoTotal" 
                    ? `S/. ${value}`
                    : columna.id === "acciones" ? (
                      <Box>
                        <Button 
                          variant="contained" 
                          color="info"
                          startIcon={<Article />}
                          onClick={() => handleOpenModal(venta.idVenta)}
                        >
                          Ver detalle
                        </Button>
                      </Box>
                    ) : value}
                  </TableCell>
                )
              })}
            </TableRow>
          ))}
        </TableBody>
      </ContenedorTabla>
    </Contenedor>
  )
}

export default Ventas;