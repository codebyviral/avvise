import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./context/AppContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { Analytics } from "@vercel/analytics/react";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="192308552557-9viekba48rbi7lmsc1ab829i2fpdedmk.apps.googleusercontent.com">
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
