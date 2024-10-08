import { Box, TextField } from "@mui/material";
import ContenedorModal from "../../../components/VistaAdmin/ContenedorModal";
import TituloModal from "../../../components/VistaAdmin/TituloModal";
import BotonesModal from "../../../components/VistaAdmin/BotonesModal";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  marca: Marca | null;
}

interface Marca {
  idMarca: number;
  nombre: string;
}

const AgregarMarca: React.FC<ModalProps> = ({ open, onClose, marca }) => {

  return (
    <ContenedorModal
      open={open}
      onClose={onClose}
      ancho={500}
      alto={400}
    >
      <TituloModal titulo="Registrar Marca"/>
      <Box sx={{ p: 2 }}>
        <TextField
          fullWidth
          label="Nombre"
          variant="outlined"
          defaultValue={marca?.nombre}
        />
      </Box>
      <BotonesModal
        registrar={() => {}}
        cerrar={onClose}
      />
    </ContenedorModal>
  );

}

export default AgregarMarca;