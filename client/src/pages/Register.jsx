import React, { useState } from "react";
import { registerUser } from "../services/api"; // Import API function
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "staff" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await registerUser(formData);
      alert("Registration successful! Please login.");
      navigate("/login"); // Redirect to login page
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-heading">Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="register-layout">
        <form className="registration" onSubmit={handleSubmit}>
          <div className="register-items">
            <label htmlFor="name">Name</label>
            <input className="register-input"
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="register-items" >
            <label htmlFor="email">Email</label>
            <input className="register-input"
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
          </div>

          <div className="register-items">
            <label htmlFor="password">Password</label>
            <input className="register-input"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
          </div>

          <div className="register-items" >
            <label htmlFor="role">Role</label>
            <select className="register-input"
              name="role"
              onChange={handleChange}
            >
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button className="register_button">
            Register
          </button>
        </form>

      </div>
    </div>
  );
};

export default Register;
