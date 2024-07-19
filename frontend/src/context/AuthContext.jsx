/* eslint-disable no-unused-vars */
import { Children, createContext, useContext, useState } from "react";
import { useEffect } from "react";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const storeTokenInLocalStorage = (serverToken) => {
    localStorage.setItem("token", serverToken);
    setToken(serverToken);
    setIsLoggedIn(!!serverToken);
  };

  console.log(localStorage.getItem("token"));
  console.log(`isLogged in from Auth ${isLoggedIn}`);

  // Logout function
  const LogoutUser = () => {
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("profileImg");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
  };

  // Store UserId
  const storeUserId = (userId) => {
    localStorage.setItem("userId", userId);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        LogoutUser,
        storeUserId,
        storeTokenInLocalStorage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
