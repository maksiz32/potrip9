import {createContext, useContext, useState} from "react";

const StateContext = createContext({
  currentUser: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
});

export const ContextProvider = ({children}) => {
  const [currentUser, setUser] = useState({});
  const [token, _setToken] = useState(localStorage.getItem('POTRIP_TOKEN'));

  const setToken = (token) => {
    _setToken(token);
  }
  if (token) {
    localStorage.setItem('POTRIP_TOKEN', token);
  } else {
    localStorage.removeItem('POTRIP_TOKEN');
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
