import { Box } from "@mui/material";
import { useState } from "react";
import Header from "../components/VistaAdmin/Header";
import { Outlet } from "react-router-dom";

const PrincipalAdmin = () => {

  // Estado para controlar la apertura y cierre de la barra
  const [open, setOpen] = useState(true);

  // Función para alternar el estado de la barra lateral
  const alternar = () => {
    setOpen(!open);
  };

  return (
    <>
      <Box 
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh"
        }}
      >
        <Header open={open} alternarDrawer={alternar} />
        <Box
          sx={{
            flexGrow: 1,
            transition: "margin-left 300ms",
            marginLeft: open ? "260px" : 0
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </>
  )
}

export default PrincipalAdmin;