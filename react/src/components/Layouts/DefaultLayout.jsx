import DefaultLayoutCSS from './DefaultLayout.module.css';

import {Outlet, Navigate, Link} from "react-router-dom";
import {useStateContext} from "../../context/ContextProvider";
import {useEffect, useState} from "react";
import axiosClient from "../../axios-client";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import AdbIcon from '@mui/icons-material/Adb';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {Button, InputBase} from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";

const Search = styled('div')(({theme}) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function SearchIcon() {
  return null;
}

export default function DefaultLayout() {
  const {currentUser, token, setUser, setToken} = useStateContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const navItems = ['Home', 'About', 'Contact']

  useEffect(() => {
    axiosClient.get('/user')
      .then(({data}) => {
        setUser(data);
      })
  }, []);

  if (!token) {
    return <Navigate to='/login'/>
  }

  const onLogout = () => {
    axiosClient.post('/logout')
      .then(() => {
        setUser({})
        setToken(null)
      })
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div id="defaultLayout">
      <Box sx={{flexGrow: 1}} className={DefaultLayoutCSS.navbar}>
        <AppBar position="static" color="transparent">
          <Toolbar>
            <AdbIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
              <Link to="/" style={{color: 'black', textDecoration: 'none'}}>
                {('potrip').toUpperCase()}
              </Link>
            </Typography>
            <Box sx={{display: {xs: 'none', sm: 'block'}}}>
              {navItems.map((item) => (
                <Button key={item} className={DefaultLayoutCSS.menu_items}>
                  {item}
                </Button>
              ))}
            </Box>
            <Search>
              <SearchIconWrapper>
                <SearchIcon/>
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{'aria-label': 'search'}}
              />
            </Search>
            {currentUser && (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle/>
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem>{currentUser.login}</MenuItem>
                  <MenuItem onClick={onLogout}>Log Out</MenuItem>
                </Menu>
              </div>
            )}
            {!currentUser && 'LogIn'}
          </Toolbar>
        </AppBar>
      </Box>
      <main>
        <Outlet/>
      </main>
    </div>
  )
}
