import {Alert, Box, Button, Container, CssBaseline, TextField, Typography, Zoom} from "@mui/material";
import {useEffect, useMemo, useState} from "react";
import * as React from "react";
import PotripSelect from "../Units/PotripSelect";
import {VariantsBlockUser} from "../../utils/Constants";
import axiosClient from "../../axios-client";
import {useNavigate, useParams} from "react-router-dom";
import Preload from "../Units/UI/Preload";

export default function UserForm() {
  const [errors, setErrors] = useState([]);
  const [roles, _setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedBlockValue, setSelectedBlockValue] = useState('');
  const [loadingUser, setLoadingUser] = useState(false);
  const [user, setUser] = useState({
    id: null,
    address: '',
    city: '',
    description: '',
    email: '',
    external_id: '',
    fathers_name: '',
    first_name: '',
    is_block: '',
    login: '',
    notes: '',
    secondary_name: '',
    settings: '',
    site: '',
    users_role_id: '',
  });
  const [tempUser, setTempUser] = useState(user);
  const { id } = useParams();
  const navigate = useNavigate();

  const formClear = () => {
    setUser(tempUser);
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
    setLoadingUser(true);
    axiosClient.get('/user-roles')
      .then(({data}) => {
        setRoles(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoadingUser(false);
      })
  }

  function prepareUserData(user) {
    Object.keys(user).map((key) => {
      if (user[key] === null) {
        user[key] = ''
      }
    });

    return user;
  }

  const getUser = () => {
    setLoadingUser(true);
    axiosClient.get(`/users/${id}`, {
      params: {id}
    })
      .then(({data}) => {
        setUser(prepareUserData(data));
        setTempUser(prepareUserData(data));
      })
      .catch((error) => {
        // TODO: make myself alerts
        console.log(error);
      })
      .finally(() => {
        setLoadingUser(false);
      })
  }

  const handlerUser = (event) => {
    event.preventDefault();
    if (user.id) {
      axiosClient.put(`/users/${user.id}`, user)
        .then(({errors, data}) => {
          if (errors) {
            setErrors(errors);
          }
          if (data && data.user) {
            setUser(prepareUserData(data.user));
            setTempUser(prepareUserData(data.user));
          }
          // TODO: make notification
          // Reload page to /users link
          navigate('/users');
        })
        .catch((errors) => {
          // TODO: make myself alert
          setErrors(errors);
        })
    } else {
      axiosClient.post('/users/new', user)
        .then()
        .catch()
        .finally()
    }
  }

  useEffect(() => {
    usersRoles();
    if (id) {
      getUser();
    }
  }, []);

    return (
      <Zoom in={true} style={{ transitionDelay: '300ms' }}>
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          {loadingUser
            ?
            <Preload/>
            :
            <Box className="mb-2">
              <Typography component="h1" variant="h5">
                {user.id ? `Update ${tempUser.login} user` : 'Create new user'}
              </Typography>
              <Box
                id="create-user-form"
                component="form"
                onSubmit={handlerUser}
                noValidate
                sx={{mt: 1}}
              >
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
                  helperText={errors && errors.hasOwnProperty('login') ? errors.login[0] : ''}
                  value={user.login}
                  onChange={event => setUser({...user, login: event.target.value})}
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
                  helperText={errors && errors.hasOwnProperty('password') ? errors.password[0] : ''}
                  onChange={event => setUser({...user, password: event.target.value})}
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
                  helperText={errors && errors.hasOwnProperty('password_confirmation') ? errors.password_confirmation[0] : ''}
                  onChange={event => setUser({...user, password_confirmation: event.target.value})}
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
                  helperText={errors && errors.hasOwnProperty('first_name') ? errors.first_name[0] : ''}
                  value={user.first_name}
                  onChange={event => setUser({...user, first_name: event.target.value})}
                />
                <TextField
                  margin="dense"
                  fullWidth
                  name="second_name"
                  label="Second name"
                  type="text"
                  id="potrip-create-user-sname"
                  autoComplete="second_name"
                  size="small"
                  className="potrip-select-separate"
                  error={errors && errors.hasOwnProperty('second_name')}
                  helperText={errors && errors.hasOwnProperty('second_name') ? errors.second_name[0] : ''}
                  value={user.second_name}
                  onChange={event => setUser({...user, second_name: event.target.value})}
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
                  helperText={errors && errors.hasOwnProperty('fathers_name') ? errors.fathers_name[0] : ''}
                  value={user.fathers_name}
                  onChange={event => setUser({...user, fathers_name: event.target.value})}
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
                  helperText={errors && errors.hasOwnProperty('email') ? errors.email[0] : ''}
                  value={user.email}
                  onChange={event => setUser({...user, email: event.target.value})}
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
                  helperText={errors && errors.hasOwnProperty('city') ? errors.city[0] : ''}
                  value={user.city}
                  onChange={event => setUser({...user, city: event.target.value})}
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
                  helperText={errors && errors.hasOwnProperty('site') ? errors.site[0] : ''}
                  value={user.site}
                  onChange={event => setUser({...user, site: event.target.value})}
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
                  helperText={errors && errors.hasOwnProperty('address') ? errors.address[0] : ''}
                  value={user.address}
                  onChange={event => setUser({...user, address: event.target.value})}
                />
                <PotripSelect
                  label="User Role"
                  items={roles}
                  selectedValue={selectedRole}
                  setSelectedValue={setSelectedRole}
                  value={user.users_role_id}
                  onChange={event => setUser({...user, users_role_id: event.target.value})}
                  defaultValue=''
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
                  onChange={event => setUser({...user, is_block: event.target.value})}
                  defaultValue=''
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
                  >
                    {user.id ? 'Update' : 'Create'}
                  </Button>
                </div>
                {user.id && (
                  <Alert severity="info">
                    Created:
                    {new Date(user.created_at).toLocaleDateString()} {new Date(user.created_at).toLocaleTimeString()}
                    <br/>
                    Last updated:
                    {new Date(user.updated_at).toLocaleDateString()} {new Date(user.updated_at).toLocaleTimeString()}
                  </Alert>
                )}
              </Box>
            </Box>
          }
        </Container>
      </Zoom>
    )
}
