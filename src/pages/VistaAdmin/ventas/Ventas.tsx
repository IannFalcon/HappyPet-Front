import React, { useEffect, useState } from 'react'
import Contenedor from '../../../components/VistaAdmin/Contenedor'
import ContenedorBotones from '../../../components/VistaAdmin/ContenedorBotones';
import { Box, Button, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { BotonExportar } from '../../../components/VistaAdmin/Botones';
import ContenedorTabla from '../../../components/VistaAdmin/ContenedorTabla';
import axios from 'axios';

interface Data {
  idVenta: number;
  idUsuario: number;
  totalProductos: number;
  montoTotal: number;
  idTransaccion: string;
  fecVenta: string;
  usuarioVenta: {
    idUsuario: number;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
  }
}

interface Columna {
  id: string | "acciones";
  label: string;
  minWidth?: number;
  align?: 'right';
}

const columnas: Columna[] = [
  { id: 'idTransaccion', label: 'ID Transacción', minWidth: 100 },
  { id: 'usuarioVenta', label: 'Nombre del Cliente', minWidth: 100 },
  { id: 'fecVenta', label: 'Fecha Venta', minWidth: 100 },
  { id: 'totalProductos', label: 'Cant. Productos', minWidth: 100 },
  { id: 'montoTotal', label: 'Importe Total', minWidth: 100 },
  { id: 'acciones', label: 'Acciones', minWidth: 100 },
]

const Ventas: React.FC = () => {

  const [ventas, setVentas] = useState<Data[]>([]);

  const obtenerVentas = async () => {
    try {
      const response = await axios.get("http://192.168.0.3:5045/api/Venta");
      const data = response.data.data.map((item: Data) => ({
        idVenta: item.idVenta,
        idUsuario: item.idUsuario,
        totalProductos: item.totalProductos,
        montoTotal: item.montoTotal,
        idTransaccion: item.idTransaccion,
        fecVenta: item.fecVenta,
        usuarioVenta: {
          idUsuario: item.usuarioVenta.idUsuario,
          nombre: item.usuarioVenta.nombre,
          apellidoPaterno: item.usuarioVenta.apellidoPaterno,
          apellidoMaterno: item.usuarioVenta.apellidoMaterno,
        }
      }));
      setVentas(data);
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  useEffect(() => {
    obtenerVentas();
  }, [])

  return (
    <Contenedor>
      <ContenedorBotones>
        <Box />
        <BotonExportar
          onClick={() => console.log("Exportar")}
          text="Exportar"
        />
      </ContenedorBotones>
      <ContenedorTabla>
        <TableHead>
          {columnas.map((columna) => (
            <TableCell
              key={columna.id}
              align={columna.align}
              style={{ minWidth: columna.minWidth }}
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
                        <Button variant="contained" color="info">Ver detalle</Button>
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