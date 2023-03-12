import {Link} from 'react-router-dom';
import {useStateContext} from "../../context/ContextProvider";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

export default function Navbar() {
  const {currentUser} = useStateContext();

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <h2><span className="Tkach">Potrip</span></h2>
        </Link>
      </div>
      <div>
        <h4>Page Title</h4>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"/>
        </button>
      </div>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">

        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="#" data-toggle="modal" data-target=".bd-example-modal-xl">Поиск</Link>
          </li>
          <div className="modal fade bd-example-modal-xl" tabIndex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl">
              <div className="modal-content">
                <div style={{margin: '20px'}} className="row justify-content-center">
                  Найти:
                  <form className="form-inline my-auto mx-auto" method="post">
                    <div className="input-group-prepend">
                      <div className="input-group-text">?</div>
                    </div>
                    <input id="searchI" placeholder="Не менее трех символов" type="text" required autoFocus min="3" name="txtSearch" className="form-control mr-sm-2" aria-label="Search" />
                      <button id="searchBtn" disabled="" className="btn btn-sm btn-outline-success my-2 my-sm-0" type="submit">Поиск</button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <li className="nav-item">
            <Link className="nav-link" to="/login">Sign in</Link>
          </li>
          <li className="nav-item dropdown">
            <Link
              id="navbarDropdown"
              className="nav-link"
              to="#"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {currentUser.login}<ArrowDropDownIcon />
            </Link>

            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
              <Link className="dropdown-item" to="/logout">
                'Logout'
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  )
}
