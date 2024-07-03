import "./App.css";
import {
  Calculator,
  Home,
  GradingPage,
  NotFoundPage,
  History,
  ComingSoon,
  Docs,
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
      </Routes>
    </>
  );
}

export default App;
