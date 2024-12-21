import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { crearCuenta } from '../../services/autenticacion-service';

const Registrate = () => {

  const [formData, setFormData] = useState({
    nombres: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    idTipoDoc: "",
    nroDocumento: "",
    telefono: "",
    correo: "",
    contrasenia: "",
    confirmarContrasenia: ""
  });

  const handleCrearCuenta = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { ...dataToSend } = formData;
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
            width: "550px",
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
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>

              <Typography sx={{ mb: 1 }}>Informacion personal</Typography>

                <TextField
                  fullWidth
                  label="Nombre(s)"
                  variant="standard"
                  value={formData.nombres}
                  onChange={(e) => setFormData({ ...formData, nombres: e.target.value })}
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
                  sx={{ mb: 2 }}
                />
                <FormControl variant="standard" fullWidth sx={{ mb: 2 }}>
                  <InputLabel id="lbl-tipoDocumento">Tipo de documento</InputLabel>
                  <Select
                    labelId="lbl-tipoDocumento"
                    value={formData.idTipoDoc}
                    onChange={(e) => setFormData({ ...formData, idTipoDoc: e.target.value })}
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
              </Grid>
              <Grid item xs={12} sm={6}>

                <Typography sx={{ mb: 1 }} >Contacto</Typography>

                <TextField
                  fullWidth
                  label="Teléfono"
                  variant="standard"
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  type="email"
                  label="Correo"
                  variant="standard"
                  value={formData.correo}
                  onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                  sx={{ mb: 2 }}
                />

                <Typography sx={{ mt: 2, mb: 2 }}>Contraseña</Typography>

                <TextField
                  fullWidth
                  type="password"
                  label="Contraseña"
                  variant="standard"
                  value={formData.contrasenia}
                  onChange={(e) => setFormData({ ...formData, contrasenia: e.target.value })}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  type="password"
                  label="Confirmar contraseña"
                  variant="standard"
                  value={formData.confirmarContrasenia}
                  onChange={(e) => setFormData({ ...formData, confirmarContrasenia: e.target.value })}
                  sx={{ mb: 2 }}
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