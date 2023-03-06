import {Outlet, Navigate, Link} from "react-router-dom";
import {useStateContext} from "../../context/ContextProvider";

export default function DefaultLayout() {
  const {currentUser, token} = useStateContext();

  const onLogout = (event) => {
    event.preventDefault();

  }

  if (!token) {
    return <Navigate to='/login' />
  }

  return (
      <div id="defaultLayout">
        <aside>
          <Link to="/country">Main</Link>
        </aside>
        <div className="context">
          <header>
            <div>
              Header
            </div>
            <div>
              User info: {currentUser.name}
              <a
                href="#"
                className="btn btn-info"
                onClick={onLogout}
              >
                Logout
              </a>
            </div>
          </header>
          <main>
            <Outlet />
          </main>
        </div>
      </div>
  )
}
