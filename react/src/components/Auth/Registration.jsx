import * as React from 'react';
import {TextField, Button, Box, Typography, CssBaseline, Container, Grid, Zoom} from "@mui/material";
import {Link} from 'react-router-dom';
import axiosClient from "../../axios-client";
import {useStateContext} from "../../context/ContextProvider";
import {useState} from "react";

import AuthClasses from './Auth.module.css';

export default function Registration() {
  const {setUser, setToken} = useStateContext();
  let [errors, setErrors] = useState(null);

  function registrationSubmit(Event) {
    Event.preventDefault();
    const Data = new FormData(Event.currentTarget);
    const Request = {
      login: Data.get('login'),
      password: Data.get('password'),
      first_name: Data.get('first_name'),
      sec_name: Data.get('sec_name'),
      email: Data.get('email'),
      password_confirmation: Data.get('password_confirmation'),
    };

    axiosClient.post('/registrate', Request)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch(error => {
        const response = error.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
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
              Registration form
            </Typography>
            <Box
              component="form"
              onSubmit={registrationSubmit}
              className={AuthClasses.auth_form_form}
              noValidate
            >
              <TextField
                margin="dense"
                required
                fullWidth
                id="outlined-required"
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
                margin="dense"
                required
                fullWidth
                label="First name"
                name="first_name"
                autoComplete="First name"
                className={AuthClasses.auth_form_text}
                size="small"
                error={errors && errors.hasOwnProperty('first_name')}
                helperText= {errors && errors.hasOwnProperty('first_name') ? errors.first_name[0] : ''}
              />
              <TextField
                margin="dense"
                fullWidth
                label="Second name"
                name="sec_name"
                autoComplete="Second name"
                className={AuthClasses.auth_form_text}
                size="small"
                error={errors && errors.hasOwnProperty('sec_name')}
                helperText= {errors && errors.hasOwnProperty('sec_name') ? errors.sec_name[0] : ''}
              />
              <TextField
                margin="dense"
                required
                fullWidth
                label="E-mail"
                type="email"
                name="email"
                autoComplete="email"
                className={AuthClasses.auth_form_text}
                size="small"
                error={errors && errors.hasOwnProperty('email')}
                helperText= {errors && errors.hasOwnProperty('email') ? errors.email[0] : ''}
              />
              <TextField
                margin="dense"
                required
                fullWidth
                id="outlined-password-input"
                label="Password"
                type="password"
                name="password"
                autoComplete="current-password"
                className={AuthClasses.auth_form_text}
                size="small"
                error={errors && errors.hasOwnProperty('password')}
                helperText= {errors && errors.hasOwnProperty('password') ? errors.password[0] : ''}
              />
              <TextField
                margin="dense"
                required
                fullWidth
                label="Password Confirm"
                type="password"
                name="password_confirmation"
                className={AuthClasses.auth_form_text}
                size="small"
                error={errors && errors.hasOwnProperty('password_confirmation')}
                helperText= {errors && errors.hasOwnProperty('password_confirmation') ? errors.password_confirmation[0] : ''}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>
              <Grid container>
                <Grid item>
                  <Link to="/login" variant="body2">
                    {"Sign In"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </div>
    </Zoom>
  )
}
