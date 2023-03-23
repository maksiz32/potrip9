import {Alert, Box, Button, Container, CssBaseline, TextField, Typography, Zoom} from "@mui/material";
import {useState} from "react";
import * as React from "react";
import PotripSelect from "../Units/PotripSelect";

export default function UserForm() {
  const [errors, setErrors] = useState([]);
  const makeUser = (Event) => {
    Event.preventDefault();
  }

  const formClear = () => {
    document.getElementById('create-user-form').reset();
  }

    return (
      <Zoom in={true} style={{ transitionDelay: '300ms' }}>
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <Box>
            <Typography component="h1" variant="h5">
              Create new user
            </Typography>
            <Box id="create-user-form" component="form" onSubmit={makeUser} noValidate sx={{ mt: 1 }}>
              {errors.length > 0 && (
              <Alert severity="error">
                {Object.keys(errors).map(key => (
                  <p key={key}>{errors[key]}</p>
                ))}
              </Alert>
              )}
              <TextField
                margin="dense"
                required
                fullWidth
                autoFocus
                id="potrip-create-user-username"
                label="User login"
                name="login"
                size="small"
                type="text"
                className="potrip-select-separate"
                error={errors && errors.hasOwnProperty('login')}
                helperText= {errors && errors.hasOwnProperty('login') ? errors.login[0] : ''}
              />
              <TextField
                margin="dense"
                required
                fullWidth
                id="potrip-create-user-password"
                label="User password"
                type="password"
                name="password"
                size="small"
                autoComplete="new-password"
                className="potrip-select-separate"
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
                size="small"
                className="potrip-select-separate"
                error={errors && errors.hasOwnProperty('password_confirmation')}
                helperText= {errors && errors.hasOwnProperty('password_confirmation') ? errors.password_confirmation[0] : ''}
              />
              <TextField
                margin="dense"
                required
                fullWidth
                name="first_name"
                label="First name"
                type="text"
                id="potrip-create-user-fname"
                autoComplete="first_name"
                size="small"
                className="potrip-select-separate"
                error={errors && errors.hasOwnProperty('first_name')}
                helperText= {errors && errors.hasOwnProperty('first_name') ? errors.first_name[0] : ''}
              />
              <TextField
                margin="dense"
                required
                fullWidth
                name="second_name"
                label="Second name"
                type="text"
                id="potrip-create-user-sname"
                autoComplete="second_name"
                size="small"
                className="potrip-select-separate"
                error={errors && errors.hasOwnProperty('second_name')}
                helperText= {errors && errors.hasOwnProperty('second_name') ? errors.second_name[0] : ''}
              />
              <TextField
                margin="dense"
                fullWidth
                name="fathers_name"
                label="Fathers name"
                type="text"
                id="potrip-create-user-fthname"
                autoComplete="fathers_name"
                size="small"
                className="potrip-select-separate"
                error={errors && errors.hasOwnProperty('fathers_name')}
                helperText= {errors && errors.hasOwnProperty('fathers_name') ? errors.fathers_name[0] : ''}
              />
              <TextField
                margin="dense"
                required
                fullWidth
                name="email"
                label="E-mail"
                type="email"
                id="potrip-create-user-email"
                size="small"
                className="potrip-select-separate"
                error={errors && errors.hasOwnProperty('email')}
                helperText= {errors && errors.hasOwnProperty('email') ? errors.email[0] : ''}
              />
              <TextField
                margin="dense"
                fullWidth
                name="city"
                label="City"
                type="text"
                id="potrip-create-user-city"
                autoComplete="city"
                size="small"
                className="potrip-select-separate"
                error={errors && errors.hasOwnProperty('city')}
                helperText= {errors && errors.hasOwnProperty('city') ? errors.city[0] : ''}
              />
              <TextField
                margin="dense"
                fullWidth
                name="site"
                label="Site"
                type="site"
                id="potrip-create-user-site"
                size="small"
                className="potrip-select-separate"
                error={errors && errors.hasOwnProperty('site')}
                helperText= {errors && errors.hasOwnProperty('site') ? errors.site[0] : ''}
              />
              <TextField
                margin="dense"
                fullWidth
                name="address"
                label="Address"
                type="address"
                id="potrip-create-user-address"
                size="small"
                className="potrip-select-separate"
                error={errors && errors.hasOwnProperty('address')}
                helperText= {errors && errors.hasOwnProperty('address') ? errors.address[0] : ''}
              />
              <PotripSelect
                label="User Role"
                items={[
                  {id: 1, value: 1, text: 'user'},
                  {id: 2, value: 10, text: 'moderator'},
                  {id: 3, value: 20, text: 'editor'},
                  {id: 4, value: 30, text: 'admin'},
                  {id: 5, value: 40, text: 'owner'},
                ]}
              />
              <PotripSelect
                label="Blocked user"
                items={[
                  {id: 1, value: false, text: 'No'},
                  {id: 2, value: true, text: 'Yes'},
                ]}
              />
              <div
                className="d-flex justify-content-around align-content-center"
                style={{padding: '8px'}}
              >
                <Button
                  type="cancel"
                  fullWidth
                  variant="outlined"
                  sx={{mr: 3}}
                  onClick={formClear}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  onClick={createUser}
                >
                  Create
                </Button>
              </div>
            </Box>
          </Box>
        </Container>
      </Zoom>
    )
}
