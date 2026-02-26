import { useAuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const { isLoggedIn } = useAuthContext();
  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoutes;
