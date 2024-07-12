/* eslint-disable no-unused-vars */
import { Children, createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const storeTokenInLocalStorage = (serverToken) => {
    localStorage.setItem("token", serverToken);
    setToken(serverToken);
  };

  let isLoggedIn = !!token;
  console.log(`isLogged in from Auth ${isLoggedIn}`);

  const [LoggedIn, setLoggedIn] = useState(false);
  return (
    <AuthContext.Provider
      value={{
        LoggedIn,
        setLoggedIn,
        storeTokenInLocalStorage
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
