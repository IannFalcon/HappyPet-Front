import { Box, Card } from "@mui/material"

interface ContenedorProps {
  children: React.ReactNode;
}

const Contenedor: React.FC<ContenedorProps> = ({ children }) => {
  return (

    <Box
      sx={{
        flexGrow: 1,
        minHeight: "100vh",
        p: 3,
        pt: "9.5rem",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#DEDEDE",
      }}
    >

      <Card 
        sx={{
          width: "100%",
          height: "100%",
          p: 3,
          display: "inline-flex", // Para que no se rompa el diseño 
          position: "relative",
          transition: "all 0.3s ease",
          borderRadius: 2,
          bgcolor: "#fff",
        }}
      >

        {/* Contenido */}
        {children}

      </Card>

    </Box>

  )
}

export default Contenedor;
