import React, { useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import Dashboard from './Components/Dashboard/Dashboard';
import AdminLayout from './Layout/AdminLayout';
import Settings from './Components/Settings/Settings';
import Brands from './Components/Brands/Brands';
import { ToastContainer } from 'react-toastify';
import Models from './Components/Models/Models';
import Locations from './Components/Locations/Locations';
import Cities from './Components/Cities/Cities';
import Cars from './Components/Cars/Cars';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"))
  const navigate = useNavigate()

  useEffect(() => {
    setToken(localStorage.getItem("token"))
    if (!localStorage.getItem("token")) {
      navigate("/admin/dashboard", { replace: true })
    }
  }, [])

  return (
    <>
      <ToastContainer position='top-center' autoClose={3000} />
      <Routes>
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/dashboard" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
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
