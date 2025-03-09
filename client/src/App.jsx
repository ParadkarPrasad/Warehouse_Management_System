import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './Components/ProtectedRoute';
function App() {
  const isAuthenticated = !!(localStorage.getItem("token"));
  const userRole = localStorage.getItem("role");

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path="/admin-dashboard" element={userRole === "admin" ? <AdminDashboard /> : <Dashboard />} />
          </Route>

        </Routes>
      </Router>
    </>
  )
}

export default App
