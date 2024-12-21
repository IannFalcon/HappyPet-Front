import { useEffect, useState } from "react";
import ContenedorModal from "../../../components/admin-components/ContenedorModal";
import TituloModal from "../../../components/admin-components/TituloModal";
import { IngresoProducto } from "../../../interfaces/IngresoProducto";
import ContenedorBotones from "../../../components/admin-components/ContenedorBotones";
import { Box, Button, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { AddCircle, Download } from "@mui/icons-material";
import ContenedorTabla from "../../../components/admin-components/ContenedorTabla";
import { exportarIngresoProductos, obtenerIngresoProductos } from "../../../services/producto-service";
import RegistrarIngresoProductos from "./RegistrarIngresoProductos";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

interface Columna {
  id: keyof IngresoProducto;
  label: string;
  width: number | "auto";
  align: "center";
}

const columnas: Columna[] = [
  { id: "nombreProveedor", label: "Proveedor", width: "auto", align: "center" },
  { id: "nombreProducto", label: "Producto", width: "auto", align: "center" },
  { id: "cantidad", label: "Cantidad", width: "auto", align: "center" },
  { id: "fecIngreso", label: "Fec. Ingreso", width: "auto", align: "center" },
]

const IngresoProductos: React.FC<ModalProps> = ({ open, onClose }) => {

  const [ingresos, setIngresos] = useState<IngresoProducto[]>([]);
  const [openRegistrarIngreso, setOpenRegistrarIngreso] = useState(false);

  const handleOpenRegistrarIngreso = () => {
    setOpenRegistrarIngreso(true);
  }

  const handleCloseRegistrarIngreso = () => {
    listarIngresos();
    setOpenRegistrarIngreso(false);
  }

  const listarIngresos = async () => {
    try {
      const ingresos = await obtenerIngresoProductos();
      setIngresos(ingresos);
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al obtener los ingresos de productos");
    }
  }

  useEffect(() => {
    listarIngresos();
  }, []);

const handleExportar = async () => {
    try {
      await exportarIngresoProductos();
    } catch (error) {
      console.error("Error: ", error);
      alert("Ocurrió un error durante la exportación de productos");
    }
  }

  return (
    <ContenedorModal
      open={open}
      onClose={onClose}
      ancho={1000}
      alto={700}
    >
      <TituloModal titulo="Ingreso de productos" />

      <ContenedorBotones>
        <Button
          variant="contained"
          color="success"
          startIcon={<AddCircle />}
          onClick={handleOpenRegistrarIngreso}
          sx={{ mt: 2, mr: 2 }}
        >
          Nuevo ingreso
        </Button>
        <RegistrarIngresoProductos
          open={openRegistrarIngreso}
          onClose={handleCloseRegistrarIngreso}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<Download />}
          onClick={handleExportar}
          sx={{ mt: 2, ml: "auto" }}
        >
          Exportar
        </Button>
      </ContenedorBotones>

      <Box 
        sx={{ 
          width: "100%", 
          mt: 1, 
          mb: 2, 
          gap: 1,
          display: "flex", 
          alignItems: "center"
        }}
      >
        <Typography>
          Filtrar por:
        </Typography>
        <TextField
          label="Nombre del proveedor"
          variant="outlined"
          sx={{ width: 250 }}
        />
        <TextField
          label="Nombre del producto"
          variant="outlined"
          sx={{ width: 250 }}
        />
        <TextField
          focused
          type="date"
          variant="outlined"
          label="Fecha de ingreso"
          sx={{ width: 250 }}
        />
      </Box>

      <ContenedorTabla>
        <TableHead>
          {columnas.map((columna) => (
            <TableCell
              key={columna.id}
              align={columna.align}
              style={{ width: columna.width, fontWeight: "bold", fontSize: 15 }}
            >
              {columna.label}
            </TableCell>
          ))}
        </TableHead>
        <TableBody>
          {ingresos.map((ingreso) => (
            <TableRow>
              {columnas.map((columna) => {
                const value = (ingreso as any)[columna.id];
                return (
                  <TableCell
                    key={columna.id}
                    align={columna.align}
                  >
                    {value}
                  </TableCell>
                )
              })}
            </TableRow>
          ))}
        </TableBody>
      </ContenedorTabla>
    </ContenedorModal>
  )

}

export default IngresoProductos;