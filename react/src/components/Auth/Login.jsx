import * as React from 'react';
import {TextField, Button, Box, Typography, Grid, CssBaseline, Container, Zoom, Alert} from "@mui/material";
import AuthClasses from './Auth.module.css';
import {Link} from 'react-router-dom';
import axiosClient from "../../axios-client";
import {useStateContext} from "../../context/ContextProvider";
import {useState} from "react";

export default function Login() {
  const {setUser, setToken} = useStateContext();
  let [errors, setErrors] = useState(null);

  function loginSubmit(Event) {
    Event.preventDefault();
    const Data = new FormData(Event.currentTarget);
    const loginRequest = {
      login: Data.get('login'),
      password: Data.get('password'),
    };

    axiosClient.post('login', loginRequest)
      .then(({data}) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((error) => {
        const errorResponse = error.response;
        if (errorResponse && errorResponse.status === 401) {
          setErrors(errorResponse.data);
        }
        if (errorResponse && errorResponse.status === 422) {
          setErrors(errorResponse.data.errors);
        }
      })
  }

  return (
    <Zoom in={true} style={{ transitionDelay: '300ms' }}>
      <div
        style={{height:'85vh'}}
        className={'d-flex justify-content-center align-items-center'}
      >
        <Container component="main" maxWidth="xs" className={AuthClasses.auth_form}>
          <CssBaseline />
          <Box className={AuthClasses.auth_form_body}>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={loginSubmit} noValidate sx={{ mt: 1 }}>
              {errors &&
                <Alert severity="error">
                  {Object.keys(errors).map(key => (
                    <p key={key}>{errors[key]}</p>
                  ))}
                </Alert>
              }
              <TextField
                margin="normal"
                required
                fullWidth
                id="potrip-signin-username"
                label="Username"
                name="login"
                autoComplete="login"
                autoFocus
                className={AuthClasses.auth_form_text}
                size="small"
                error={errors && errors.hasOwnProperty('login')}
                helperText= {errors && errors.hasOwnProperty('login') ? errors.login[0] : ''}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="potrip-signin-password"
                autoComplete="current-password"
                className={AuthClasses.auth_form_text}
                size="small"
                error={errors && errors.hasOwnProperty('password')}
                helperText= {errors && errors.hasOwnProperty('password') ? errors.password[0] : ''}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/register" variant="body2">
                    {"Not Registered? Create an account"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </div>
    </Zoom>
  );
}
