import { ArrowBackIosNew, ExpandMore } from "@mui/icons-material";
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Avatar, Box, CssBaseline, Drawer, Grid, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import Sidebar from "./Sidebar";

interface HeaderProps {
  open: boolean;
  alternarDrawer: () => void;
}

const Header: React.FC<HeaderProps> = ({ open, alternarDrawer }) => {
  
  const [menuUsuarioEstado, setMenuUsuarioEstado] = useState<null | HTMLElement>(null);

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
                    color: "#000",
                    fontSize: "1.8rem",
                    fontWeight: "bold",
                    ml: open ? "14vw" : "2vw",
                  }}
                >
                  ¡Bienvenido!
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#000",
                    fontWeight: "bold",
                    ml: open ? "14vw" : "2vw",
                  }}
                  >
                    Panel de administración
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              color: "#fff",
              display: "flex",
              alignItems: "center",
              padding: "0 10px",
              borderRadius: "5px",
              cursor: "pointer",
              boxSizing: "border-box",
            }}
            onClick={abrirMenuUsuario}
          >
            <Avatar 
              sx={{ w: 30, h: 30, mr: 2 }}
            />
            <Typography sx={{ color: "#000", fontWeight: "bold" }}>
              Nombre Usuario
            </Typography>
            <ExpandMore />
          </Box>
          <Menu
            anchorEl={menuUsuarioEstado} // Posiciona el menú en la posición del avatar
            open={Boolean(menuUsuarioEstado)} // Convierte el valor a booleano
            onClose={cerrarMenuUsuario} // Cierra el menú
            sx={{
              "& .MuiPaper-root": {
                mt: 2,
                p: 0,
                width: "210px",
              },
              "& .MuiMenuItem-root": {
                "&:hover": {
                  bgcolor: "#EAEAEA",
                }
              }
            }}
          >
            <MenuItem>Mi perfil</MenuItem>
            <MenuItem>Cerrar sesión</MenuItem>
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