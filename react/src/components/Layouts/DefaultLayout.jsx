import {Outlet, Navigate, Link} from "react-router-dom";
import Navbar from "../Units/Navbar";
import {useStateContext} from "../../context/ContextProvider";
import {useEffect} from "react";
import axiosClient from "../../axios-client";

export default function DefaultLayout() {
  const {currentUser, token, setUser, setToken} = useStateContext();

  if (!token) {
    return <Navigate to='/login' />
  }

  const onLogout = (event) => {
    event.preventDefault();

    axiosClient.post('/logout')
      .then(() => {
        setUser({});
        setToken(null);
      })
  }

  useEffect(() => {
    axiosClient.get('/user')
      .then(({data}) => {
        setUser(data);
      })
  }, []);

  return (
    <div id="defaultLayout">
      <Navbar />
      <aside>
        <Link to="/country">Main</Link>
      </aside>
      <div className="context">
        <header>
          <div>
            Header
          </div>
          <div>
            User info: {currentUser.login}
            <Link
              to="/logout"
              className="btn btn-info"
              onClick={onLogout}
            >
              Logout
            </Link>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
