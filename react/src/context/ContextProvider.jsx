import {createContext, useContext, useState} from "react";
import {TokenNames} from '../utils/Constants'

const StateContext = createContext({
  currentUser: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
});

export const ContextProvider = ({children}) => {
  const [currentUser, setUser] = useState({});
  const [token, _setToken] = useState(localStorage.getItem(TokenNames.ACCESS_TOKEN_NAME));

  const setToken = (token) => {
    _setToken(token);

    if (token) {
      localStorage.setItem(TokenNames.ACCESS_TOKEN_NAME, token);
    } else {
      localStorage.removeItem(TokenNames.ACCESS_TOKEN_NAME);
    }
  }

  return (
    <StateContext.Provider value={{
      currentUser,
      token,
      setUser,
      setToken,
    }}>
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);
