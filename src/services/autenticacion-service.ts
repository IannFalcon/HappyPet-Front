import axios from "axios";
import { apiBaseUrl } from "./apiBaseUrl";

export const iniciarSesion = async (dataToSend: any) => {
  try {
    // Enviar los datos al servidor
    const response = await axios.post(`${apiBaseUrl}/Autenticacion/login`, dataToSend);

    if (response.status === 200 && response.data.data.IdUsuario !== 0) {
      // Guardar datos de la sesión en el localStorage
      localStorage.setItem("usuario", JSON.stringify(response.data));
      // Verificar si el usuario no está validado
      if (response.data.data.estado === "NO_VALIDADO") {
        alert(response.data.mensaje);
        window.location.replace("/cambiar-contrasenia");
      } else {
        // Si el usuario está validado
        alert(response.data.mensaje);
        switch (response.data.data.idTipoUsuario) {
          case 1:
            window.location.replace("/");
            break;
          case 2:
            window.location.replace("/admin/home");
            break;
          case 3:
            window.location.replace("/admin/home");
            break;
          default:
            break;
        }
      }
    } else {
      alert(response.data.mensaje);
    }
  } catch (error) {
    // Si el error es de tipo AxiosError y tiene una respuesta
    if (axios.isAxiosError(error) && error.response) {
      const { data } = error.response;
      alert(data.mensaje);
    } else {
      console.log("Error:", error);
      alert(
        "Ocurrió un error durante el inicio de sesión. Intentelo nuevamente más tarde."
      );
    }
  }
};

export const cerrarSesion = () => {
  localStorage.removeItem("usuario");
  window.location.replace("/");
};

export const cambiarContraseniaNuevoUsuario = async (dataToSend: any) => {
  try {
    // Enviar los datos al servidor
    const response = await axios.post(`${apiBaseUrl}/Autenticacion/cambiar-contrasenia-nuevo-usuario`, dataToSend);

    if (response.status === 200) {
      alert(response.data.mensaje);
      localStorage.removeItem("usuario");
      window.location.replace("/login");
    } else {
      alert(response.data.mensaje);
    }
  } catch (error) {
    // Si el error es de tipo AxiosError y tiene una respuesta
    if (axios.isAxiosError(error) && error.response) {
      const { data } = error.response;
      alert(data.mensaje);
    } else {
      console.log("Error:", error);
      alert(
        "Ocurrió un error durante el cambio de contraseña. Intentelo nuevamente más tarde."
      );
    }
  }
};

export const crearCuenta = async (dataToSend: any) => {
  try{
    const response = await axios.post(`${apiBaseUrl}/Autenticacion/crear-cuenta`, dataToSend);
    if (response.status === 200) {
      alert(response.data.mensaje);
      window.location.replace("/login");
    } else {
      alert(response.data.mensaje);
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      alert(error.response.data.mensaje);
    } else {
      console.log("Error:", error);
      alert("Ocurrió un error durante la creación de cuenta. Intentelo nuevamente más tarde.");
    }
  }
};