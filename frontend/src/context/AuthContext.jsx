/* eslint-disable no-unused-vars */
import { Children, createContext, useContext, useState } from "react";
import { useEffect } from "react";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const [admin, setAdmin] = useState(localStorage.setItem("isAdmin", false));
  const [isAdmin, setIsAdmin] = useState(!!admin);
  const storeTokenInLocalStorage = (serverToken) => {
    localStorage.setItem("token", serverToken);
    setToken(serverToken);
    setIsLoggedIn(!!serverToken);
  };
  const storeisAdminState = (isAdminState) => {
    const isAdmin = localStorage.setItem(isAdminState);
    setIsAdmin(isAdminState);
  };
  console.log(localStorage.getItem("token"));
  console.log(`isLogged in from Auth ${isLoggedIn}`);

  // Logout function
  const LogoutUser = () => {
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("profileImg");
    localStorage.removeItem("userId");
    localStorage.removeItem('isAdmin')
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
        admin,
        storeisAdminState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
