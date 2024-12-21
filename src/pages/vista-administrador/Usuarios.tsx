import { Box } from "@mui/material";
import Contenedor from "../../components/admin-components/Contenedor";
import { ElementosResumen } from "../../components/admin-components/ElementosResumen";
import { Engineering, Person } from "@mui/icons-material";
import { ObtenerContadorClientes, ObtenerContadorEmpleados } from "../../services/contador-service";
import { useEffect, useState } from "react";

const Usuarios: React.FC =() => {

  const [cantClientes, setCantClientes] = useState<number>(0);
  const [cantEmpleados, setCantEmpleados] = useState<number>(0);

  const obtenerResumenClientes = async () => {
    const resultado = await ObtenerContadorClientes();
    if (resultado) {
      setCantClientes(resultado);
    }
    return 0;
  };

  const obtenerResumenVendedores = async () => {
    const resultado = await ObtenerContadorEmpleados();
    if (resultado) {
      setCantEmpleados(resultado);
    }
    return
  };

  useEffect(() => {
    obtenerResumenClientes();
    obtenerResumenVendedores();
  }, []);

  return (
    <Contenedor>
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
          textoMonto={`${cantEmpleados}`}
          textCantidad="Vendedores activos registrados"
          icono={<Engineering />}
        />
      </Box>
    </Contenedor>
  )
}

export default Usuarios;