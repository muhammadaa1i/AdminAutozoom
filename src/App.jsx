import React from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import Login from './Components/Login/Login';
import Dashboard from './Components/Dashboard/Dashboard';
import AdminLayout from './Layout/AdminLayout';
import Settings from './Components/Settings/Settings';
import Brands from './Components/Brands/Brands';
import { ToastContainer } from 'react-toastify';
import Models from './Components/Models/Models';
import Locations from './Components/Locations/Locations';
import Cities from './Components/Cities/Cities';
import Cars from './Components/Cars/Cars';

const App = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [token, navigate]);

  return (
    <>
      <ToastContainer position='top-center' autoClose={3000} />
      <Routes>
        <Route path="/" element={<Navigate to={token ? "/admin/dashboard" : "/login"} replace />} />
        <Route path="login" element={<Login />} />
        <Route path="admin" element={token ? <AdminLayout /> : <Navigate to="/login" replace />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard/>}/>
          <Route path="settings" element={<Settings />} />
          <Route path="brands" element={<Brands />} />
          <Route path="models" element={<Models />} />
          <Route path="locations" element={<Locations />} />
          <Route path="cities" element={<Cities />} />
          <Route path="cars" element={<Cars />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
