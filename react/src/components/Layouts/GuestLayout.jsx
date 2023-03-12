import {Outlet, Navigate} from "react-router-dom";
import {useStateContext} from "../../context/ContextProvider";
import Navbar from '../Units/Navbar'

export default function GuestLayout() {
  const {token} = useStateContext();

  if (token) {
    return <Navigate to='/' />;
  }

  return (
    <div>
      <Navbar />
      <div>
        For guest users only
        <Outlet />
      </div>
    </div>
  )
}
