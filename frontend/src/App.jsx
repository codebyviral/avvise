import "./App.css";
import {
  Calculator,
  Home,
  GradingPage,
  NotFoundPage,
  History,
  ComingSoon,
  Docs,
  Signin,
  Signup,
} from "./Pages/pageIndex";
import { Routes, Route } from "react-router-dom";
import "./app.js";
function App() {
  return (
    <>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/aboutus" element={<ComingSoon />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/projects" element={<GradingPage />} />
        <Route path="/scan" element={<ComingSoon />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/history" element={<History />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
