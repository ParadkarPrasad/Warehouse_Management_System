import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
const ProtectedRoute = ({ isAuthenticated, allowedRoles }) => {


  const { user } = useContext(AuthContext);

  // If not authenticated, redirect to login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" />
  }

  // If user does not have the required role, redirect to their dashboard

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={user.role === "admin" ? "/admin-dashboard" : "/dashboard"} />
  }

  return <Outlet />
}

export default ProtectedRoute