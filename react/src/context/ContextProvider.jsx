import {createContext, useContext, useState} from "react";
import Constants from '../components/Dictionaries/Constants'

const StateContext = createContext({
  currentUser: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
});

export const ContextProvider = ({children}) => {
  const [currentUser, setUser] = useState({});
  const [token, _setToken] = useState(localStorage.getItem(Constants.ACCESS_TOKEN_NAME));

  const setToken = (token) => {
    _setToken(token);

    if (token) {
      localStorage.setItem(Constants.ACCESS_TOKEN_NAME, token);
    } else {
      localStorage.removeItem(Constants.ACCESS_TOKEN_NAME);
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
