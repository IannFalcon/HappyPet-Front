import { Box, Divider } from "@mui/material";
import Contenedor from "../../components/admin-components/Contenedor";
import { ElementosResumen } from "../../components/admin-components/ElementosResumen";
import { AddBusiness, Category, Inventory, TrendingUp } from "@mui/icons-material";

const Resumen: React.FC = () => {

  return (
    <Contenedor>
      <ElementosResumen
        colorFondo="#024554"
        colorTexto="white"
        titulo="Ventas"
        textoMonto="S/ 1000.00"
        textCantidad="Ventas realizadas en el mes: 10"
        icono={<TrendingUp />}
      />
      <Divider sx={{ my: 2 }} />
      <Box display="flex" flexDirection="row" gap={2}>
        <ElementosResumen
          colorFondo="#53736A"
          colorTexto="white"
          titulo="Productos"
          textoMonto="10"
          textCantidad="Productos en el almacen"
          icono={<Inventory />}
        />
        <ElementosResumen
          colorFondo="#6A8C69"
          colorTexto="white"
          titulo="Categorias"
          textoMonto="5"
          textCantidad="Categorias registradas"
          icono={<Category />}
        />
        <ElementosResumen
          colorFondo="#A8B545"
          colorTexto="white"
          titulo="Marcas"
          textoMonto="5"
          textCantidad="Marcas registradas"
          icono={<AddBusiness />}
        />
      </Box>
    </Contenedor>
  )

};

export default Resumen;