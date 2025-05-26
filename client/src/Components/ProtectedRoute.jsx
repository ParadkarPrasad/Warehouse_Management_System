import React from "react";
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
const ProtectedRoute = ({ allowedRoles }) => {
  // Grab authentication info from Redux store
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
