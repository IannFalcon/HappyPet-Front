import { Box } from "@mui/material";

interface ContenedorBotonesProps {
  children: React.ReactNode;
}

const ContenedorBotones: React.FC<ContenedorBotonesProps> = ({ children }) => {
  return (
    <Box
        display="flex"
        alignItems="center"
        sx={{ mb: 2, width: "100%" }}
    >

      { children }

    </Box>
  )
}

export default ContenedorBotones;