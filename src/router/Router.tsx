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
import Home from "../pages/vista-cliente/Home";
import PrincipalCliente from "../layout/PrincipalCliente";
import ProtectedRoute from "./ProtectedRoute";
import Carrito from "../pages/vista-cliente/Carrito";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/happyPet",
    element: (
      <ProtectedRoute>
        <PrincipalCliente />
      </ProtectedRoute> 
    ),
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "carrito",
        element: <Carrito />
      }
    ]
  },
  {
    path: "/admin/home",
    element: (
      <ProtectedRoute>
        <PrincipalAdmin />
      </ProtectedRoute>
    ),
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