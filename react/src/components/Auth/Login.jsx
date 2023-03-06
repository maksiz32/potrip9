import * as React from 'react';
import Box from '@mui/material/Box';
import {FormGroup, TextField, FormControl, FormLabel, CardContent, Card, Button} from "@mui/material";
import {Link} from 'react-router-dom';

const card = (
  <React.Fragment>
    <CardContent>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend" className={'text-center'}>Login</FormLabel>
        <FormGroup>
          <div className={'mb-2'}>
            <TextField
              required
              id="outlined-required"
              label="Name"
            />
          </div>
          <div>
            <TextField
              id="outlined-password-input outlined-required"
              required
              label="Password"
              type="password"
              autoComplete="current-password"
            />
          </div>
        </FormGroup>
        <Button variant="contained" className={'mt-2'}>Login</Button>
        <p className='message'>
          Not registered? <Link to="/register">Register</Link>
        </p>
      </FormControl>
    </CardContent>
  </React.Fragment>
);

const onSubmit = (Event) => {
  Event.preventDefault();

};

export default function Login() {
  return (
    <div
      style={{height:'90vh', width: '100%'}}
      className={'d-flex justify-content-center align-items-center'}
    >
      <form
        className={'mt-5'}
        sx={{ minWidth: 275 }}
        onClick={onSubmit}
      >
        <Card variant="outlined">{card}</Card>
      </form>
    </div>
  )
}
