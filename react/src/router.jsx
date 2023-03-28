import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./components/Auth/Login";
import Registration from "./components/Auth/Registration";
import Users from "./components/Users/Users";
import Country from "./components/Locations/Country";
import NotFound from "./components/NotFound";
import DefaultLayout from "./components/Layouts/DefaultLayout";
import GuestLayout from "./components/Layouts/GuestLayout";
import UserForm from "./components/Users/UserForm";
import Locations from "./components/Locations/Locations";

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <Country />,
      },
      {
        path: '/users',
        element: <Users />,
        name: 'Users',
      },
      {
        path: '/users/new',
        element: <UserForm key="UserCreate" />,
        name: 'Create New User',
      },
      {
        path: '/users/:id',
        element: <UserForm key="UserUpdate" />,
        name: 'Update User',
      },
      {
        path: '/locations/:id',
        element: <Locations />,
        name: 'Check Locations',
      },
    ]
  },
  {
    path: '/',
    element: <GuestLayout />,
    children: [
      {
        path: '/login',
        element: <Login />,
        name: 'Login',
      },
      {
        path: '/register',
        element: <Registration />,
        name: 'Registration',
      },
    ]
  },
  {
    path: '*',
    element: <NotFound />,
    name: 'Not Found Page',
  },
]);

export default router;
