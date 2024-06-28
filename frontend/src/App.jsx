import "./App.css";
import {
  Calculator,
  Home,
  GradingPage,
  NotFoundPage,
  ComingSoon,
} from "./Pages/pageIndex";
import { Routes, Route } from "react-router-dom";
import "./app.js";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/team" element={<ComingSoon />} />
        <Route path="/projects" element={<GradingPage />} />
        <Route path="/scanai" element={<ComingSoon />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
