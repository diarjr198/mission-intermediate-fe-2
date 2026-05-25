import { Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import CrudPage from "./pages/CrudPage";

export default function App() {
  const location = useLocation();

  return (
    <Routes key={location.pathname}>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/crud" element={<CrudPage />} />
    </Routes>
  );
}
