import { Box, TextField } from "@mui/material";
import ContenedorModal from "../../../components/VistaAdmin/ContenedorModal";
import TituloModal from "../../../components/VistaAdmin/TituloModal";
import BotonesModal from "../../../components/VistaAdmin/BotonesModal";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  categoria: Categoria | null;
}

interface Categoria {
  idCategoria: number;
  nombre: string;
}

const AgregarCategoria: React.FC<ModalProps> = ({ open, onClose, categoria }) => {

  return (
    <ContenedorModal
      open={open}
      onClose={onClose}
      ancho={500}
      alto={400}
    >
      <TituloModal titulo="Registrar Categoría"/>
      <Box sx={{ p: 2 }}>
        <TextField
          fullWidth
          label="Nombre"
          variant="outlined"
          defaultValue={categoria?.nombre}
        />
      </Box>
      <BotonesModal
        registrar={() => {}}
        cerrar={onClose}
      />
    </ContenedorModal>
  );

}

export default AgregarCategoria;