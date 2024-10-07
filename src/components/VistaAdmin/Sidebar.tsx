import { AddBusiness, Category, Dashboard, Engineering, ExpandLess, ExpandMore, Group, Inventory, Logout, Person, Pets, TrendingUp } from '@mui/icons-material';
import { Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

// Interfaz para tipar las propiedades del menú
interface MenuProps {
  open: boolean;
  close: () => void;
}

const Sidebar: React.FC<MenuProps> = ({ open, close }) => {

  // Estado para controlar el collapse del resumen
  const [collapseResumen, setCollapseResumen] = useState(false);
  const [collapseUsuarios, setCollapseUsuarios] = useState(false);

  // Hook para obtener la ubicación actual
  const location = useLocation(); 

  // Función para dar estilos al item seleccionado
  const estilosSeleccionado = (ubicacion: string, estilos: {}) => {	
    // Si la ubicación es igual a la ruta actual
    return location.pathname === ubicacion 
    ? { 
        ...estilos,
        mt: 1,
        borderRadius: "15px",
        bgcolor: "#404040", 
        "& .MuiListItemText-primary": {
          fontWeight: "550",
        },
        "&:hover": {
          backgroundColor: "#404040",
        },
      } 
    : { ...estilos,
        mt: 1,
        borderRadius: "15px",
        color: "#888",
        "&:hover": {
          color: "#fff",
          backgroundColor: "#404040",
          "& .MuiListItemText-primary": {
          fontWeight: "550",
          },
        },
      };
  }

  // Funcion para estilos de items hijos
  const estilosItemChild = () => {
    return { ml: 3 };
  }

  // Función para estilos de iconos
  const estilosIconos = () => {
    return { color: "inherit" };
  }

  return (

    <Box sx={{
      height: "100vh",
      width: "260px",
      display: "flex",
      flexDirection: "column",
      bgcolor: "#202123",
      pl: 1,
      pr: 1
    }}>

      <Box sx={{ 
        display: "flex",
        alignItems: "center", // Alinear verticalmente
        pt: 4,
        pl: 2
      }}>

        {/* Logo */}
        <Pets sx={{ color: "#fff" }} />

        {/* Título */}
        <Typography
          variant="subtitle1"
          color="#fff"
          sx={{ ml: 2, fontSize: "1.5rem" }}
        >
          <h3>Happy Pet</h3>
        </Typography>

      </Box>

      <Box sx={{ pl: 1, pr: 2 }}>

        <List>

          {/* Resumen */}
          <ListItemButton
            component={Link}
            to="/admin/home"
            sx={estilosSeleccionado("/admin/home", {})}
            onClick={() => {
              if (location.pathname === "/admin/home") {
                setCollapseResumen(!collapseResumen)
              }
            }}
          >
            <ListItemIcon sx={estilosIconos}>
              <Dashboard/>
            </ListItemIcon>
            {open && (
              <ListItemText
                primary="Resumen"
              />
            )}
            {collapseResumen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={collapseResumen} timeout="auto" unmountOnExit>
            
            <List component="div" disablePadding>

              {/* Ventas */}
              <ListItemButton
                component={Link}
                to="/admin/home/ventas"
                sx={estilosSeleccionado("/admin/home/ventas", estilosItemChild())}
              >
                <ListItemIcon sx={estilosIconos}>
                  <TrendingUp />
                </ListItemIcon>
                {open && (
                  <ListItemText
                    primary="Ventas"
                  />
                )}
              </ListItemButton>

              {/* Productos */}
              <ListItemButton
                component={Link}
                to="/admin/home/productos"
                sx={estilosSeleccionado("/admin/home/productos", estilosItemChild())}
              >
                <ListItemIcon sx={estilosIconos}>
                  <Inventory />
                </ListItemIcon>
                {open && (
                  <ListItemText
                    primary="Productos"
                  />
                )}
              </ListItemButton>

              {/* Categorias */}
              <ListItemButton
                component={Link}
                to="/admin/home/productos/categorias"
                sx={estilosSeleccionado("/admin/home/productos/categorias", estilosItemChild())}
              >
                <ListItemIcon sx={estilosIconos}>
                  <Category />
                </ListItemIcon>
                {open && (
                  <ListItemText
                    primary="Categorias"
                  />
                )}
              </ListItemButton>

              {/* Marcas */}
              <ListItemButton
                component={Link}
                to="/admin/home/productos/marcas"
                sx={estilosSeleccionado("/admin/home/productos/marcas", estilosItemChild())}
              >
                <ListItemIcon sx={estilosIconos}>
                  <AddBusiness />
                </ListItemIcon>
                {open && (
                  <ListItemText
                    primary="Marcas"
                  />
                )}
              </ListItemButton>

            </List>

          </Collapse>

          {/* Usuarios */}
          <ListItemButton
            component={Link}
            to="/admin/home/usuarios"
            sx={estilosSeleccionado("/admin/home/usuarios", {})}
            onClick={() => {
              if (location.pathname === "/admin/home/usuarios") {
                setCollapseUsuarios(!collapseUsuarios)
              }
            }} 
          >
            <ListItemIcon sx={estilosIconos}>
              <Group />
            </ListItemIcon>
            {open && (
              <ListItemText
                primary="Usuarios"
              />
            )}
            {collapseUsuarios ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={collapseUsuarios} timeout="auto" unmountOnExit>
            
            <List component="div" disablePadding>

              {/* Vendedores */}
              <ListItemButton
                component={Link}
                to="/admin/home/vendedores"
                sx={estilosSeleccionado("/admin/home/vendedores", estilosItemChild())}
              >
                <ListItemIcon sx={estilosIconos}>
                  <Engineering />
                </ListItemIcon>
                {open && (
                  <ListItemText
                    primary="Vendedores"
                  />
                )}
              </ListItemButton>

              {/* Clientes */}
              <ListItemButton
                component={Link}
                to="/admin/home/clientes"
                sx={estilosSeleccionado("/admin/home/clientes", estilosItemChild())}
              >
                <ListItemIcon sx={estilosIconos}>
                  <Person />
                </ListItemIcon>
                {open && (
                  <ListItemText
                    primary="Clientes"
                  />
                )}
              </ListItemButton>

            </List>

          </Collapse>

        </List>

      </Box>

      <Box sx={{ mt: "auto", mb: 4, pl: 1, pr: 2 }}>
        
        {/* Cerrar sesión */}
        <ListItemButton
          sx={estilosSeleccionado("/", {})}
        >
          <ListItemIcon sx={estilosIconos}>
            <Logout />
          </ListItemIcon>
          {open && (
            <ListItemText
              primary="Cerrar sesión"
            />
          )}
        </ListItemButton>

      </Box>

    </Box>

  )

}

export default Sidebar;