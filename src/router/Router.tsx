import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../components/Autenticacion/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  }
]);

const App = () => {
  <RouterProvider router={router}/>
};

export default App;