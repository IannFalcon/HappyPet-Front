import { ExpandLess, ExpandMore, Person, Pets, ShoppingCart } from '@mui/icons-material';
import { AppBar, Box, CssBaseline, Grid, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react'
import { cerrarSesion } from '../../services/autenticacion-service';

const Header = () => {

  const [menuUsuarioEstado, setMenuUsuarioEstado] = useState<null | HTMLElement>(null);
  const nombreUsuario = localStorage.getItem("usuario") ? JSON.parse(localStorage.getItem("usuario")!).data.nombreUsuario : "";

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
          p: 1,
          bgcolor: "#2C2C2C"
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", pr: 0 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} 
                display="flex" 
                flexDirection="row" 
                alignItems="center" 
                gap={1}
              >
                <Pets sx={{ width: "2.5rem", height: "2.5rem" }} />
                <Typography
                  variant="h4"
                  sx={{
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                  >
                    HappyPet
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              alignContent: "center",
              gap: 2,
            }}
          >
            <Box
              sx={{
                bgcolor: "#000",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                padding: "10px 15px",
                borderRadius: "20%",
                cursor: "pointer",
                boxSizing: "border-box",
              }}
            >
              <ShoppingCart />
              <Typography sx={{ ml: 1 }}>0</Typography>
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
              <Person sx={{ w: 30, h: 30, mr: 1 }}/>
              <Typography sx={{ color: "#fff", fontWeight: "bold" }}>
                { nombreUsuario }
              </Typography>
              {Boolean(menuUsuarioEstado) ? <ExpandLess sx={{ ml: 2 }}/> : <ExpandMore sx={{ ml: 2 }}/>}
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
                  bgcolor: "#2C2C2C",
                  color: "#fff",
                },
                "& .MuiMenuItem-root": {
                  "&:hover": {
                    bgcolor: "#3C3C3C",
                  }
                }
              }}
            >
              <MenuItem>Mi perfil</MenuItem>
              <MenuItem onClick={() => cerrarSesion()}>Cerrar sesión</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );

}

export default Header;