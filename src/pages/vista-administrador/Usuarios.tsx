import { Box, Divider } from "@mui/material";
import Contenedor from "../../components/admin-components/Contenedor";
import { ElementosResumen } from "../../components/admin-components/ElementosResumen";
import { Engineering, Person } from "@mui/icons-material";
import { ObtenerContadorClientes, ObtenerContadorUsuarios, ObtenerContadorVendedores } from "../../services/contador-service";
import { useEffect, useState } from "react";

const Usuarios: React.FC =() => {

  const [cantUsuarios, setCantUsuarios] = useState<number>(0);
  const [cantClientes, setCantClientes] = useState<number>(0);
  const [cantVendedores, setCantVendedores] = useState<number>(0);

  const obtenerResumenUsuarios = async () => {
    const resultado = await ObtenerContadorUsuarios();
    if (resultado) {
      setCantUsuarios(resultado);
    }
    return 0;
  };

  const obtenerResumenClientes = async () => {
    const resultado = await ObtenerContadorClientes();
    if (resultado) {
      setCantClientes(resultado);
    }
    return 0;
  };

  const obtenerResumenVendedores = async () => {
    const resultado = await ObtenerContadorVendedores();
    if (resultado) {
      setCantVendedores(resultado);
    }
    return
  };

  useEffect(() => {
    obtenerResumenUsuarios();
    obtenerResumenClientes();
    obtenerResumenVendedores();
  }, []);

  return (
    <Contenedor>
      <Box display="flex" flexDirection="row" gap={2}>
        <ElementosResumen
          colorFondo="#1A6566"
          colorTexto="white"
          titulo="Usuarios activos"
          textoMonto={`${cantUsuarios}`}
          textCantidad="Usuarios activos"
          icono={<Person />}
        />
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box display="flex" flexDirection="row" gap={2}>
        <ElementosResumen
          colorFondo="#323050"
          colorTexto="white"
          titulo="Clientes activos"
          textoMonto={`${cantClientes}`}
          textCantidad="Clientes activos registrados"
          icono={<Person />}
        />
        <ElementosResumen
          colorFondo="#21445B"
          colorTexto="white"
          titulo="Vendedores activos"
          textoMonto={`${cantVendedores}`}
          textCantidad="Vendedores activos registrados"
          icono={<Engineering />}
        />
      </Box>
    </Contenedor>
  )
}

export default Usuarios;