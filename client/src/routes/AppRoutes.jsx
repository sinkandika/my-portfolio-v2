import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardAdmin from "../pages/DashboardAdmin";
import LoginAdmin from "../pages/auth/LoginAdmin";
import RegisterAdmin from "../pages/auth/RegisterAdmin";
import HomePage from "../pages/HomePage";

function AppRoutes () {
  return (
    <BrowserRouter>
      <Routes>
        <Route
        path="/"
        element={<Navigate to="/home" replace /> } 
        />

        <Route 
        path="/login" 
        element={<LoginAdmin />} 
        />
        <Route 
        path="/register" 
        element={<RegisterAdmin />} 
        />
        <Route 
        path="/dashboard"
        element={<DashboardAdmin />} 
        />
        <Route
        path="/home"
        element={<HomePage />}
        />
      </Routes>
      
    </BrowserRouter>
  )
}

export default AppRoutes;