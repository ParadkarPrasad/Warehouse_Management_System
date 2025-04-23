import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UpdateItemForm from "./Components/UpdateItemForm"
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
function App() {
  const { user, isAuthenticated, isLoading } = useContext(AuthContext);

  if (isLoading) return <div>Loading...</div>;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} allowedRoles={["staff", "admin"]} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/update-items/:id" element={<UpdateItemForm />} />
        </Route>

        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} allowedRoles={["admin"]} />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Route>


        {/* Default Redirect Based on Role */}
        <Route
          path="/"
          element={
            !isAuthenticated ? (
              <Navigate to="/login" /> // Force redirect to login if not authenticated
            ) : user?.role === "admin" ? (
              <Navigate to="/admin-dashboard" />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
