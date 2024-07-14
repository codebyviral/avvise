import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./context/AppContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { Analytics } from "@vercel/analytics/react";
ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <AppProvider>
      <BrowserRouter>
        <Analytics />
        <Toaster />
        <App />
      </BrowserRouter>
    </AppProvider>
  </AuthProvider>
);
