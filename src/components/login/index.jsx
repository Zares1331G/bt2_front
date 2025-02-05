import  React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import LinkMu from '@mui/material/Link';
import {Link} from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { genericPostService } from "../../api/externalServices";
import BackdropLoader from "../common/backdroploader";



function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <LinkMu color="inherit" href="https://mui.com/">
        Nombre App
      </LinkMu>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const requiredFields =  [
  "email",
  "password"
];

const theme = createTheme();

function Login() {

  const initialFormState = {
    user: '',
    pass: ''
  }

  const validationInfo = {
    field: {
      validationMessage: "El campo es requerido"
    }
  };

  const [loginInfo, setLoginInfo] = useState(initialFormState);
  const [missingRequiredFields, setMissingRequiredFields] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let missingFields = [];

    for (const [k, v] of Object.entries(loginInfo)) {

      if(v === ""){
        missingFields.push(k);
      }
    }

    if (missingFields.length > 0){
      setMissingRequiredFields(missingFields);
      return;
    } 

    setLoading(true);
    const results = await genericPostService("http://localhost:4000/login", loginInfo);
    setLoading(false);
    console.log(results)
  };

  const handleFormOnchange = (e) => {
    const { name, value } = e.target

    if(value){
      setMissingRequiredFields([])
    }
    setLoginInfo({...loginInfo, [name] : value} );
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <BackdropLoader show={loading} message="Validando los datos ingresados" />
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Ingreso al sistema
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              id="user"
              required
              fullWidth
              label="Correo eléctrónico"
              name="user"
              helperText= {missingRequiredFields.indexOf("user") !== -1 ? "El campo es requerido"  : ""}
              error = {missingRequiredFields.indexOf("user") !== -1 ? true: false}
              autoFocus
              onChange={handleFormOnchange}
              value={loginInfo.user}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="pass"
              name="pass"
              label="Contraseña"
              type="password"
              onChange={handleFormOnchange}
              value={loginInfo.pass}
              helperText= {missingRequiredFields.indexOf("pass") !== -1 ? "El campo es requerido"  : ""}
              error = {missingRequiredFields.indexOf("pass") !== -1 ? true: false}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recordar mis datos"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Ingresar
            </Button>
            <Grid container>
              <Grid item xs>
                <LinkMu href="#" variant="body2">
                  ¿Olvidó la contraseña?
                </LinkMu>
              </Grid>
              <Grid item>
                <Link to="/register" className='text-link'><LinkMu  variant="body2" component={"span"}>Registrarse</LinkMu> </Link> 
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default Login;