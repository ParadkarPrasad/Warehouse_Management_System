import React, { useState, useContext } from "react";
import { loginUser } from "../services/api"; // Import API function
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
// import { useContext } from "react";
const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await loginUser(formData);
      login(response.user, response.token); // Store in context
      alert("Login successful!");
      navigate(response.user.role === "admin" ? "/admin-dashboard" : "/dashboard");
    } catch (err) {
      setError(err.message || "Invalid credentials");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
