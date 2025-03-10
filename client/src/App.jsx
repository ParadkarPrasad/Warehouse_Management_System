import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './Components/ProtectedRoute';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
function App() {
  const { user, isAuthenticated, loading } = useContext(AuthContext);

  // If authenticated, navigate based on role

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />


          {/* Staff Protected Routes */}
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} allowedRoles={["staff"]} />}>
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>

          {/* Admin Protected Routes */}
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} allowedRoles={["admin"]} />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Route>

          {/* Default Redirection Based on Role */}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                user?.role === "admin" ? (
                  <Navigate to="/admin-dashboard" />
                ) : (
                  <Navigate to="/dashboard" />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />

        </Routes>
      </Router>
    </>
  )
}

export default App
