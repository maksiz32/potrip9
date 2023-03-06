import {Outlet, Navigate} from "react-router-dom";
import {useStateContext} from "../../context/ContextProvider";

export default function GuestLayout() {
  const {token} = useStateContext();

  if (token) {
    return <Navigate to='/' />;
  }

  return (
    <div>
      <div>
        For guest users only
        <Outlet />
      </div>
    </div>
  )
}
