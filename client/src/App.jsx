import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
function App() {
  const { user, isAuthenticated } = useContext(AuthContext);
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [userRole, setUserRole] = useState(null);
  // const [loading, setLoading] = useState(true);

  // Handle authentication and role on first load
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const storedUser = localStorage.getItem("user");

  //   if (token && storedUser) {
  //     const user = JSON.parse(storedUser);
  //     setIsAuthenticated(true);
  //     setUserRole(user.role);
  //   }

  //   setLoading(false); // After authentication check, stop loading
  // }, []);

  // if (loading) {
  //   return <div>Loading...</div>; // You can show a loading spinner here
  // }


  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} allowedRoles={["staff", "admin"]} userRole={user?.role} />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} allowedRoles={["admin"]} userRole={user?.role} />}>
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
