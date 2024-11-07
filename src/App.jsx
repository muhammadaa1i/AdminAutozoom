import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.css'

const App = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <ToastContainer/>,
    <Routes>
      <Route
        path="/login"
        element={token ? <Navigate to="/" /> : <Login />}
      />
      <Route
        path="/"
        element={token ? <Home /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};

export default App;
