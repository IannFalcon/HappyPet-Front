import { Box, Button, Container, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { obtenerIdUsuario } from '../../utils/localStorage';
import { cambiarContraseniaNuevoUsuario } from '../../services/autenticacion-service';

const CambiarContrasenia: React.FC = () => {

  // Obtener ID de usuario
  const idUsuario = obtenerIdUsuario();

  const [cambiarContraseniaRequest, setCambiarContraseniaRequest] = useState({
    idUsuario: idUsuario,
    nuevaContrasenia: "",
    confirmarContrasenia: ""
  });

  const realizarCambioContrasenia = async () => {
    try {
      await cambiarContraseniaNuevoUsuario(cambiarContraseniaRequest);
    } catch (error) {
      alert("Ocurrió un error durante el cambio de contraseña. Intentelo nuevamente más tarde.");
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
            CAMBIAR CONTRASEÑA
          </Typography>

          <Box>
            <TextField
              fullWidth
              sx={{ mb: 2 }}
              type="password"
              label="Nueva contraseña"
              variant="standard"
              value={cambiarContraseniaRequest.nuevaContrasenia}
              onChange={(e) => setCambiarContraseniaRequest({ ...cambiarContraseniaRequest, nuevaContrasenia: e.target.value})}
            />
            <TextField
              fullWidth
              sx={{ mb: 2 }}
              type="password"
              label="Confirmar contraseña"
              variant="standard"
              value={cambiarContraseniaRequest.confirmarContrasenia}
              onChange={(e) => setCambiarContraseniaRequest({ ...cambiarContraseniaRequest, confirmarContrasenia: e.target.value })}
            />
          </Box>
          <Button
            variant="contained"
            sx={{
              mt: 2,
              width: "50%",
              padding: "10px 20px",
              bgcolor: "#042940",
              transition: "all 0.5s ease-in-out",
              "&:hover": { bgcolor: "#005C53" }
            }}
            onClick={realizarCambioContrasenia}
          >
            Cambiar contraseña
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default CambiarContrasenia;