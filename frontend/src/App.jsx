/* eslint-disable no-unused-vars */
import "./App.css";
import {
  Calculator,
  Home,
  GradingPage,
  NotFoundPage,
  History,
  ComingSoon,
  Docs,
  Login,
  Logout,
  Signup,
  Profile,
  ReportBug,
  Admin,
  About,
} from "./Pages/pageIndex";
import { Routes, Route } from "react-router-dom";

// No need for dotenv import here; Vite handles environment variables automatically

function App() {
  return (
    <>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/projects" element={<GradingPage />} />
        <Route path="/scan" element={<ComingSoon />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/history" element={<History />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="/report-bug" element={<ReportBug />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
}

export default App;
