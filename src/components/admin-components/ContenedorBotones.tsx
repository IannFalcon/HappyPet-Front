import { Box } from "@mui/material";

interface ContenedorBotonesProps {
  children: React.ReactNode;
}

const ContenedorBotones: React.FC<ContenedorBotonesProps> = ({ children }) => {
  return (
    <Box
        display="flex"
        alignItems="center"
        sx={{ width: "100%" }}
        mb={2}
    >

      { children }

    </Box>
  )
}

export default ContenedorBotones;