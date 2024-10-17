import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { crearCuenta } from '../../services/autenticacion-service';

const Registrate = () => {

  const [formData, setFormData] = useState({
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    idTipoDocumento: "",
    nroDocumento: "",
    telefono: "",
    direccion: "",
    correo: "",
    contrasenia: "",
    confirmarContrasenia: ""
  });

  const handleCrearCuenta = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { confirmarContrasenia, ...dataToSend } = formData;
    try{
      await crearCuenta(dataToSend);
    } catch (error) {
      console.log("Error:", error);
      alert("Ocurrió un error durante la creación de la cuenta. Intentelo nuevamente más tarde.");
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
            width: "500px",
            height: "650px",
            border: "1px solid",
            borderRadius: "15px",
            p: "50px 50px",
            display: "flex",
            flexDirection: "column",
            overflow: "auto"
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
            CREA UNA CUENTA
          </Typography>

          {/* <pre>{JSON.stringify(formData, null, 2)}</pre>  */}

          <Box component="form">
            <Typography sx={{ mb: 1 }}>Informacion personal</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nombre"
                  variant="standard"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Apellido Paterno"
                  variant="standard"
                  value={formData.apellidoPaterno}
                  onChange={(e) => setFormData({ ...formData, apellidoPaterno: e.target.value })}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Apellido Materno"
                  variant="standard"
                  value={formData.apellidoMaterno}
                  onChange={(e) => setFormData({ ...formData, apellidoMaterno: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl variant="standard" fullWidth sx={{ mb: 2 }}>
                  <InputLabel id="lbl-tipoDocumento">Tipo de documento</InputLabel>
                  <Select
                    labelId="lbl-tipoDocumento"
                    value={formData.idTipoDocumento}
                    onChange={(e) => setFormData({ ...formData, idTipoDocumento: e.target.value })}
                  >
                    <MenuItem value="1">DNI</MenuItem>
                    <MenuItem value="2">CEX</MenuItem>
                    <MenuItem value="3">PAS</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  label="Nro. Documento"
                  variant="standard"
                  value={formData.nroDocumento}
                  onChange={(e) => setFormData({ ...formData, nroDocumento: e.target.value })}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Teléfono"
                  variant="standard"
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  label="Dirección"
                  variant="standard"
                  value={formData.direccion}
                  onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                />
              </Grid>
            </Grid>
            <Typography sx={{ mt: 3, mb: 1 }}>Informacion de cuenta</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  type="email"
                  label="Correo"
                  variant="standard"
                  value={formData.correo}
                  onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="password"
                  label="Contraseña"
                  variant="standard"
                  value={formData.contrasenia}
                  onChange={(e) => setFormData({ ...formData, contrasenia: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="password"
                  label="Confirmar contraseña"
                  variant="standard"
                  value={formData.confirmarContrasenia}
                  onChange={(e) => setFormData({ ...formData, confirmarContrasenia: e.target.value })}
                />
              </Grid>
            </Grid>
          </Box>
          <Button
            variant="contained"
            sx={{
              mt: "auto",
              mx: "auto",
              width: "200px",
              padding: "10px 20px",
              bgcolor: "#042940",
              transition: "all 0.5s ease-in-out",
              "&:hover": { bgcolor: "#005C53" }
            }}
            onClick={handleCrearCuenta}
          >
            Registrate ahora
          </Button>
          <Typography 
            component="a"
            href="/login"
            sx={{ mt: "auto", mb: 0, textAlign: "center" }}
          >
            ¿Ya tienes una cuenta? Inicia sesión aquí
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}

export default Registrate;