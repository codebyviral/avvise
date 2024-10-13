import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./context/AppContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { Analytics } from "@vercel/analytics/react";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={clientID}>
    <AuthProvider>
      <AppProvider>
        <BrowserRouter>
          <Analytics />
          <Toaster />
          <App />
        </BrowserRouter>
      </AppProvider>
    </AuthProvider>
  </GoogleOAuthProvider>
);
