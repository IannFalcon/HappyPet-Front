import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../pages/vista-autenticacion/Login";
import PrincipalAdmin from "../layout/PrincipalAdmin";
import Resumen from "../pages/vista-administrador/Resumen";
import Productos from "../pages/vista-administrador/productos/Productos";
import Vendedores from "../pages/vista-administrador/vendedores/Vendedores";
import Ventas from "../pages/vista-administrador/ventas/Ventas";
import Categorias from "../pages/vista-administrador/categorias/Categorias";
import Marcas from "../pages/vista-administrador/marcas/Marcas";
import Usuarios from "../pages/vista-administrador/Usuarios";
import Clientes from "../pages/vista-administrador/clientes/Clientes";

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