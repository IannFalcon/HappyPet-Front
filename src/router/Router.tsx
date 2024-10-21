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
import CambiarContrasenia from "../pages/vista-autenticacion/CambiarContrasenia";
import Registrate from "../pages/vista-autenticacion/Registrate";
import DetallesProducto from "../pages/vista-cliente/DetallesProducto";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/cambiar-contrasenia",
    element: (
      <ProtectedRoute>
        <CambiarContrasenia />
      </ProtectedRoute>
    )
  },
  {
    path: "/registrate",
    element: <Registrate />,
  },
  {
    path: "/",
    element: (
      <PrincipalCliente />
    ),
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "detalle-producto/:id",
        element: <DetallesProducto />
      },
      {
        path: "carrito",
        element: (
          <ProtectedRoute>
            <Carrito />
          </ProtectedRoute>
        )
      },
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