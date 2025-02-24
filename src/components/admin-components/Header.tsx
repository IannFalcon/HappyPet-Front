import { ArrowBackIosNew, ExpandLess, ExpandMore, Person } from "@mui/icons-material";
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, CssBaseline, Drawer, Grid, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { cerrarSesion } from "../../services/autenticacion-service";
import { obtenerNombreUsuario } from "../../utils/localStorage";

interface HeaderProps {
  open: boolean;
  alternarDrawer: () => void;
}

const Header: React.FC<HeaderProps> = ({ open, alternarDrawer }) => {
  
  const [menuUsuarioEstado, setMenuUsuarioEstado] = useState<null | HTMLElement>(null);
  const nombreUsuario = obtenerNombreUsuario();

  const abrirMenuUsuario = (event: React.MouseEvent<HTMLElement>) => {
    setMenuUsuarioEstado(event.currentTarget);
  } 

  const cerrarMenuUsuario = () => {
    setMenuUsuarioEstado(null);
  };


  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ 
          backgroundColor: "#fff",
          pt: 2,
          pb: 2,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", pr: 0 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              edge="start" // Alinea el icono a la izquierda
              aria-label="menu"
              onClick={alternarDrawer} // Abre el Drawer
              sx={{ ml: "0.5" }}
            >
              <MenuIcon />
            </IconButton>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography
                  sx={{
                    ml: open ? "14vw" : "2vw",
                    color: "#000",
                    fontSize: "1.8rem",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                  }}
                >
                  ¡Bienvenido!
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  sx={{
                    ml: open ? "14vw" : "2vw",
                    color: "#000",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                  }}
                  >
                    Panel de administración
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              boxSizing: "border-box",
              padding: "10px 20px",
              bgcolor: "#EAEAEA",
              color: "#fff",
              borderRadius: "10px",
              borderBottomLeftRadius: Boolean(menuUsuarioEstado) ? "0" : "10px",
              borderBottomRightRadius: Boolean(menuUsuarioEstado) ? "0" : "10px",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={abrirMenuUsuario}
          >
            <Person sx={{ w: 30, h: 30, mr: 2, color: "black" }}/>
            <Typography sx={{ color: "#000", fontWeight: "bold" }}>
              { nombreUsuario }
            </Typography>
            {Boolean(menuUsuarioEstado) ? <ExpandLess sx={{ ml: 1, color: "black" }}/> : <ExpandMore sx={{ ml: 1, color: "black" }}/>}
          </Box>
          <Menu
            anchorEl={menuUsuarioEstado} // Posiciona el menú en la posición del avatar
            open={Boolean(menuUsuarioEstado)} // Convierte el valor a booleano
            onClose={cerrarMenuUsuario} // Cierra el menú
            sx={{
              "& .MuiPaper-root": {
                borderTop: "1px solid gray",
                borderTopLeftRadius: "0",
                borderTopRightRadius: "0",
                
                width: "250px",
                color: "#000",
                bgcolor: "#fff",
              },
              "& .MuiMenuItem-root": {
                "&:hover": {
                  bgcolor: "#EAEAEA",
                }
              },
            }}
          >
            <MenuItem>Mi perfil</MenuItem>
            <MenuItem onClick={() => cerrarSesion()}>Cerrar sesión</MenuItem>
          </Menu>
        </Toolbar>
        <Drawer
          variant="persistent" // Muestra el Drawer de forma persistente
          anchor="left" // Posiciona el Drawer a la izquierda
          open={open} // Abre el Drawer
          onClose={alternarDrawer} // Cierra el Drawer
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              bgcolor: "#404040",
              color: "#fff",
              height: "100vh",
              transition: "width 0.3s",
              overflowX: "hidden", // Oculta el scroll horizontal
            }
          }}
        >
          <Sidebar open={open} close={alternarDrawer} />
        </Drawer>
        <Box
          sx={{
            display: "flex",
            position: "absolute",
            left: open ? "240px" : "0", // Muestra el botón si el Drawer está abierto
            alignItems: "center",
            top: "80vh",
            borderRadius: "15px",
            bgcolor: "#202123",
            transition: "left 0.3s",
            opacity: open ? 1 : 0, // Oculta el botón si el Drawer está cerrado
            pointerEvents: open ? "auto" : "none", // Habilita el click si el Drawer está abierto
            zIndex: "modal" // Muestra el botón por encima del Drawer
          }}
        >
          <IconButton color="inherit" onClick={alternarDrawer}>
            <ArrowBackIosNew />
          </IconButton>
        </Box>
      </AppBar>
    </Box>
  )
}

export default Header;