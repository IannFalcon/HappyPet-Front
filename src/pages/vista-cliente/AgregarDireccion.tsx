import ContenedorModal from "../../components/admin-components/ContenedorModal";
import TituloModal from "../../components/admin-components/TituloModal";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

const AgregarDireccion: React.FC<ModalProps> = ({open, onClose}) => {

  const handleCloseModal = () => {
    
    onClose();
  }

  return (
    <ContenedorModal
      open={open} 
      onClose={onClose} 
      ancho={750} 
      alto={700}
    >
      <TituloModal titulo="Agregar dirección" />
      
    </ContenedorModal>
  )
}

export default AgregarDireccion;