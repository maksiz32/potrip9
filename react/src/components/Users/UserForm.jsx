import {Alert, Box, Button, Container, CssBaseline, TextField, Typography, Zoom} from "@mui/material";
import {useEffect, useMemo, useState} from "react";
import * as React from "react";
import PotripSelect from "../Units/PotripSelect";
import {VariantsBlockUser} from "../../utils/Constants";
import axiosClient from "../../axios-client";
import {useLocation} from "react-router-dom";

export default function UserForm() {
  const [errors, setErrors] = useState([]);
  const [roles, _setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedBlockValue, setSelectedBlockValue] = useState('');
  const [user, setUser] = useState({
    address: '',
    city: '',
    description: '',
    email: '',
    external_id: '',
    fathers_name: '',
    first_name: '',
    id: '',
    is_block: '',
    login: '',
    notes: '',
    secondary_name: '',
    settings: '',
    site: '',
    users_role_id: '',
  });
  const location = useLocation();
  const { userId } = location.state;

  const makeUser = (Event) => {
    Event.preventDefault();
  }

  const formClear = () => {
    document.getElementById('create-user-form').reset();
    setSelectedRole('');
    setSelectedBlockValue('');
  }

  const setRoles = (dataRoles) => {
    let preparedRoles = [];
    dataRoles.forEach((role, index) => {
      preparedRoles.push({
        id: index + 1,
        value: role.id,
        text: role.name,
      });
    });

    if (preparedRoles.length) {
      _setRoles(preparedRoles);
    }
  }

  const usersRoles = () => {
    axiosClient.get('/user-roles')
      .then(({data}) => {
        setRoles(data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const getUser = () => {
    axiosClient.get(`/users/${userId}`, {
      params: {id: userId}
    })
      .then(({data}) => {
        Object.keys(data).map((key) => {
          if (data[key] === null) {
            data[key] = ''
          }
        });
        setUser(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        //
      })
  }

  useEffect(() => {
    usersRoles();
    getUser();
  }, []);

    return (
      <Zoom in={true} style={{ transitionDelay: '300ms' }}>
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <Box className="mb-2">
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
                id="potrip-create-user-username"
                label="User login"
                name="login"
                size="small"
                type="text"
                className="potrip-select-separate"
                error={errors && errors.hasOwnProperty('login')}
                helperText= {errors && errors.hasOwnProperty('login') ? errors.login[0] : ''}
                value={user.login}
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
                value=''
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
                value=''
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
                value={user.first_name}
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
                value={user.second_name}
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
                value={user.fathers_name}
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
                value={user.email}
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
                value={user.city}
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
                value={user.site}
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
                value={user.address}
              />
              <PotripSelect
                label="User Role"
                items={roles}
                selectedValue={selectedRole}
                setSelectedValue={setSelectedRole}
                value={user.users_role_id}
              />
              <PotripSelect
                label="Blocked user"
                items={[
                  {id: 1, value: VariantsBlockUser.AVAILABLE, text: 'No'},
                  {id: 2, value: VariantsBlockUser.BLOCK, text: 'Yes'},
                ]}
                selectedValue={selectedBlockValue}
                setSelectedValue={setSelectedBlockValue}
                value={user.is_block}
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
                  onClick={makeUser}
                >
                  Create
                </Button>
              </div>
              <Alert severity="info">
                Created:
                {new Date(user.created_at).toLocaleDateString()} {new Date(user.created_at).toLocaleTimeString()}
                <br />
                Last updated:
                {new Date(user.updated_at).toLocaleDateString()} {new Date(user.updated_at).toLocaleTimeString()}
              </Alert>
            </Box>
          </Box>
        </Container>
      </Zoom>
    )
}
