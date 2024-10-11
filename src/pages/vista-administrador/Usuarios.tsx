import { Box, Divider } from "@mui/material";
import Contenedor from "../../components/admin-components/Contenedor";
import { ElementosResumen } from "../../components/admin-components/ElementosResumen";
import { Engineering, NoAccounts, Person, PersonOff } from "@mui/icons-material";

const Usuarios: React.FC =() => {
  return (
    <Contenedor>
      <Box display="flex" flexDirection="row" gap={2}>
        <ElementosResumen
          colorFondo="#1A6566"
          colorTexto="white"
          titulo="Vendedores activos"
          textoMonto="10"
          textCantidad="Vendedores activos"
          icono={<Engineering />}
        />
        <ElementosResumen
          colorFondo="#53736A"
          colorTexto="white"
          titulo="Vendedores inactivos"
          textoMonto="5"
          textCantidad="Vendedores sin actividad"
          icono={<NoAccounts />}
        />
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box display="flex" flexDirection="row" gap={2}>
        <ElementosResumen
          colorFondo="#323050"
          colorTexto="white"
          titulo="Clientes activos"
          textoMonto="10"
          textCantidad="Clientes activos"
          icono={<Person />}
        />
        <ElementosResumen
          colorFondo="#21445B"
          colorTexto="white"
          titulo="Clientes inactivos"
          textoMonto="5"
          textCantidad="Clientes sin actividad"
          icono={<PersonOff />}
        />
      </Box>
    </Contenedor>
  )
}

export default Usuarios;