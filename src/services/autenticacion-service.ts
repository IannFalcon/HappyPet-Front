import axios from 'axios';
import { apiBaseUrl } from './apiBaseUrl';

export const iniciarSesion = async (dataToSend: any) => {

  try {

    // Enviar los datos al servidor
    const response = await axios.post(`${apiBaseUrl}/Autenticacion/login`, dataToSend);

    // Si la respuesta es correcta y el IdUsuario es diferente de 0
    if (response.status === 200 && response.data.data.IdUsuario !== 0) {
      alert(response.data.mensaje);
      // Guardar datos de la sesión en el localStorage
      localStorage.setItem("usuario", JSON.stringify(response.data));
      // Redireccionar a la página correspondiente
      switch (response.data.data.idTipoUsuario) {
        case 1:
          window.location.replace("/happyPet");
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
      alert("Ocurrió un error durante el inicio de sesión. Intentelo nuevamente más tarde.")
    }

  }

}

export const cerrarSesion = () => {
  localStorage.removeItem("usuario");
  window.location.replace("/");
}