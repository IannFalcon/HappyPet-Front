import { Box, Divider } from "@mui/material";
import Contenedor from "../../components/admin-components/Contenedor";
import { ElementosResumen } from "../../components/admin-components/ElementosResumen";
import { AddBusiness, Category, Inventory, TrendingUp } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { ObtenerContadorCategorias, ObtenerContadorMarcas, ObtenerContadorProductos, ObtenerContadorVentas } from "../../services/contador-service";

const Resumen: React.FC = () => {

  const [totalVentas, setTotalVentas] = useState<number>(0);
  const [cantVentas, setCantVentas] = useState<number>(0);
  const [cantProductos, setCantProductos] = useState<number>(0);
  const [cantCategorias, setCantCategorias] = useState<number>(0);
  const [cantMarcas, setCantMarcas] = useState<number>(0);

  const obtenerResumenVentas = async () => {
    const resultado = await ObtenerContadorVentas();
    if (resultado) {
      setTotalVentas(resultado.totalImporteVentas);
      setCantVentas(resultado.totalVentas);
    }
    return 0;
  };

  const obtenerResumenProductos = async () => {
    const resultado = await ObtenerContadorProductos();
    if (resultado) {
      setCantProductos(resultado);
    }
    return 0;
  };

  const obtenerResumenCategorias = async () => {
    const resultado = await ObtenerContadorCategorias();
    if (resultado) {
      setCantCategorias(resultado);
    }
    return 0;
  }

  const obtenerResumenMarcas = async () => {
    const resultado = await ObtenerContadorMarcas();
    if (resultado) {
      setCantMarcas(resultado);
    }
    return 0;
  }

  useEffect(() => {
    obtenerResumenVentas();
    obtenerResumenProductos();
    obtenerResumenCategorias();
    obtenerResumenMarcas();
  }, []);

  return (
    <Contenedor>
      <ElementosResumen
        colorFondo="#024554"
        colorTexto="white"
        titulo="Ventas"
        textoMonto={`S/ ${totalVentas}`}
        textCantidad={`Ventas realizadas en el mes: ${cantVentas}`}
        icono={<TrendingUp />}
      />
      <Divider sx={{ my: 2 }} />
      <Box display="flex" flexDirection="row" gap={2}>
        <ElementosResumen
          colorFondo="#53736A"
          colorTexto="white"
          titulo="Productos"
          textoMonto={`${cantProductos}`}
          textCantidad="Productos en el almacen"
          icono={<Inventory />}
        />
        <ElementosResumen
          colorFondo="#6A8C69"
          colorTexto="white"
          titulo="Categorias"
          textoMonto={`${cantCategorias}`}
          textCantidad="Categorias registradas"
          icono={<Category />}
        />
        <ElementosResumen
          colorFondo="#A8B545"
          colorTexto="white"
          titulo="Marcas"
          textoMonto={`${cantMarcas}`}
          textCantidad="Marcas registradas"
          icono={<AddBusiness />}
        />
      </Box>
    </Contenedor>
  )

};

export default Resumen;