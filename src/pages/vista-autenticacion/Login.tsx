import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {

  // Hook para redireccionar a otra página
  const navigate = useNavigate();

  // Formulario para enviar los datos del login
  const [loginRequest, setLoginRequest] = useState({
    idTipoUsuario: "1",
    correo: "",
    contrasenia: "",
  });

  const ValidarLogin = async (e : React.MouseEvent<HTMLButtonElement>) => {

    e.preventDefault();
    
    const dataToSent = loginRequest;
    
    try {

      // Enviar los datos al servidor
      const response = await axios.post("http://192.168.0.3:5045/api/Autenticacion/login", dataToSent);

      // Si la respuesta es correcta y el IdUsuario es diferente de 0
      if (response.status === 200 && response.data.IdUsuario !== 0) {
        alert(response.data.mensaje);
        navigate("/Admin/Home");
      } else {
        alert(response.data.mensaje);
      }

    } catch (error) {

      // Si el error es de tipo AxiosError y tiene una respuesta
      if (axios.isAxiosError(error) && error.response) {
        const { status, data } = error.response;
        if(status === 400) {
          alert(data.mensaje);
        } else {
          alert(data.mensaje);
        }
      } else {
        console.log("Error:", error);
        alert("Ocurrió un error durante el inicio de sesión. Intentelo nuevamente más tarde.")
      }

    }

  }

  return (
    <Container component="main" sx={{ maxWidth: "100vh" }}>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Box
          sx={{
            width: "450px",
            height: "500px",
            border: "1px solid",
            borderRadius: "15px",
            p: "50px 50px"
          }}
        >
          <Typography component="h1"
            sx={{
              textAlign: "center",
              fontSize: "28px",
              fontWeight: "bold",
              mb: 4
            }}
          >
            INICIAR SESIÓN
          </Typography>

          {/* <pre>{JSON.stringify(LoginRequest, null, 2)}</pre>  */}

          <Box component="form">
            <FormControl variant="standard" fullWidth sx={{ mb: 2 }}>
              <InputLabel id="lbl-tipoUsuario">Tipo de usuario</InputLabel>
              <Select
                labelId="lbl-tipoUsuario"
                value={loginRequest.idTipoUsuario}
                onChange={(e) => setLoginRequest({ ...loginRequest, idTipoUsuario: e.target.value })}
              >
                <MenuItem value="1" selected>Cliente</MenuItem>
                <MenuItem value="2">Vendedor</MenuItem>
                <MenuItem value="3">Administrador</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              sx={{ mb: 2 }}
              label="Correo"
              variant="standard"
              value={loginRequest.correo}
              onChange={(e) => setLoginRequest({ ...loginRequest, correo: e.target.value})}
            />
            <TextField
              fullWidth
              sx={{ mb: 2 }}
              type="password"
              label="Contraseña"
              variant="standard"
              value={loginRequest.contrasenia}
              onChange={(e) => setLoginRequest({ ...loginRequest, contrasenia: e.target.value })}
            />
          </Box>
          <Button
            variant="contained"
            sx={{
              mt: 2,
              width: "200px",
              padding: "10px 20px",
              bgcolor: "#042940",
              transition: "all 0.5s ease-in-out",
              "&:hover": { bgcolor: "#005C53" }
            }}
            onClick={ValidarLogin}
          >
            Iniciar Sesión
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default Login;