import { BusinessCenter, Category, Dashboard, ExpandLess, ExpandMore, Group, Inventory, Leaderboard, LocalShipping, Logout, Person, Pets, Sell } from '@mui/icons-material';
import { Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { cerrarSesion } from '../../services/autenticacion-service';
import { obtenerRolUsuario } from '../../utils/localStorage';

// Interfaz para tipar las propiedades del menú
interface MenuProps {
  open: boolean;
  close: () => void;
}

const Sidebar: React.FC<MenuProps> = ({ open, close }) => {

  // Estado para controlar el collapse del resumen
  const [collapseResumen, setCollapseResumen] = useState(false);
  const [collapseUsuarios, setCollapseUsuarios] = useState(false);

  const rolUsuario = obtenerRolUsuario();

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
        pl: 3
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
            to="/admin-inicio"
            sx={estilosSeleccionado("/admin-inicio", {})}
            onClick={() => {
              if (location.pathname === "/admin-inicio") {
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
                to="/admin-inicio/ventas"
                sx={estilosSeleccionado("/admin-inicio/ventas", estilosItemChild())}
              >
                <ListItemIcon sx={estilosIconos}>
                  <Leaderboard />
                </ListItemIcon>
                {open && (
                  <ListItemText
                    primary="Ventas"
                  />
                )}
              </ListItemButton>

              {/* Categorias */}
              <ListItemButton
                component={Link}
                to="/admin-inicio/categorias"
                sx={estilosSeleccionado("/admin-inicio/categorias", estilosItemChild())}
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
                to="/admin-inicio/marcas"
                sx={estilosSeleccionado("/admin-inicio/marcas", estilosItemChild())}
              >
                <ListItemIcon sx={estilosIconos}>
                  <Sell />
                </ListItemIcon>
                {open && (
                  <ListItemText
                    primary="Marcas"
                  />
                )}
              </ListItemButton>

              {/* Productos */}
              <ListItemButton
                component={Link}
                to="/admin-inicio/productos"
                sx={estilosSeleccionado("/admin-inicio/productos", estilosItemChild())}
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

              {/* Proveedores */}
              <ListItemButton
                component={Link}
                to="/admin-inicio/proveedores"
                sx={estilosSeleccionado("/admin-inicio/proveedores", estilosItemChild())}
              >
                <ListItemIcon sx={estilosIconos}>
                  <LocalShipping />
                </ListItemIcon>
                {open && (
                  <ListItemText
                    primary="Proveedores"
                  />
                )}
              </ListItemButton>

            </List>

          </Collapse>

          {rolUsuario === "admin" && (
            // Usuarios
            <ListItemButton
              component={Link}
              to="/admin-inicio/usuarios"
              sx={estilosSeleccionado("/admin-inicio/usuarios", {})}
              onClick={() => {
                if (location.pathname === "/admin-inicio/usuarios") {
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
          )}

          <Collapse in={collapseUsuarios} timeout="auto" unmountOnExit>
            
            <List component="div" disablePadding>

              {/* Clientes */}
              <ListItemButton
                component={Link}
                to="/admin-inicio/clientes"
                sx={estilosSeleccionado("/admin-inicio/clientes", estilosItemChild())}
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

              {/* Empleados */}
              <ListItemButton
                component={Link}
                to="/admin-inicio/empleados"
                sx={estilosSeleccionado("/admin-inicio/empleados", estilosItemChild())}
              >
                <ListItemIcon sx={estilosIconos}>
                  <BusinessCenter />
                </ListItemIcon>
                {open && (
                  <ListItemText
                    primary="Empleados"
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
          onClick={() => cerrarSesion()}
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