import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useState } from "react"
import { iniciarSesion } from "../../services/autenticacion-service";

const Login: React.FC = () => {

  // Formulario para enviar los datos del login
  const [loginRequest, setLoginRequest] = useState({
    idTipoUsuario: "1",
    correo: "",
    contrasenia: "",
  });

  const ValidarLogin = async (e : React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const dataToSend = loginRequest;
    iniciarSesion(dataToSend);
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
            width: "400px",
            height: "500px",
            border: "1px solid",
            borderRadius: "15px",
            p: "50px 50px",
            display: "flex",
            flexDirection: "column"
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
              mx: "auto",
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
          <Typography 
            component="a"
            href="/registrate"
            sx={{ mt: "auto", textAlign: "center" }}
          >
            ¿No tienes una cuenta? Regístrate
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}

export default Login;