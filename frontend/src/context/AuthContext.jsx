/* eslint-disable no-unused-vars */
import { Children, createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [LoggedIn, setLoggedIn] = useState(false);
  return (
    <AuthContext.Provider
      value={{
        LoggedIn,
        setLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
