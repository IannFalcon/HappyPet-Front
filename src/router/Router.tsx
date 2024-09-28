import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../pages/Autenticacion/Login";
import PrincipalAdmin from "../layout/PrincipalAdmin";
import Resumen from "../pages/VistaAdmin/Resumen";
import Productos from "../pages/VistaAdmin/Productos";
import Vendedores from "../pages/VistaAdmin/Vendedores";
import Ventas from "../pages/VistaAdmin/Ventas";
import Clientes from "../pages/VistaAdmin/Clientes";
import Categorias from "../pages/VistaAdmin/Categorias";
import Marcas from "../pages/VistaAdmin/Marcas";
import Usuarios from "../pages/VistaAdmin/Usuarios";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/admin/home",
    element: <PrincipalAdmin />,
    children: [
      {
        index: true,
        element: <Resumen />
      },
      {
        path: "ventas",
        element: <Ventas />
      },
      {
        path: "productos",
        element: <Productos />
      },
      {
        path: "productos/marcas",
        element: <Marcas />
      },
      {
        path: "productos/categorias",
        element: <Categorias />
      },
      {
        path: "usuarios",
        element: <Usuarios />
      },
      {
        path: "vendedores",
        element: <Vendedores />
      },
      {
        path: "clientes",
        element: <Clientes />
      },
    ]
  }
]);

const App = () => {
  <RouterProvider router={router}/>
};

export default App;