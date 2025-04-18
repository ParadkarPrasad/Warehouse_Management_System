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
    <div className="pt-10" >
      <h2 className="text-center font-poppins">Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="flex justify-center px-4">
        <form className="flex flex-col items-start mt-6 w-full max-w-md p-6 bg-white rounded-2xl shadow-lg" onSubmit={handleSubmit}>
          <div className="w-full mb-4">
            <label className="block mb-1 font-medium" htmlFor="name">Name</label>
            <input
              className="w-full p-2 border-2 rounded-md border-gray-300 focus:outline-none focus:border-gray-500 placeholder:text-gray-500 placeholder:italic"
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="w-full mb-4">
            <label className="block mb-1 font-medium" htmlFor="email">Email</label>
            <input
              className="w-full p-2 border-2 rounded-md border-gray-300 focus:outline-none focus:border-gray-500 placeholder:text-gray-500 placeholder:italic"
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
          </div>

          <div className="w-full mb-4">
            <label className="block mb-1 font-medium" htmlFor="password">Password</label>
            <input
              className="w-full p-2 border-2 rounded-md border-gray-300 focus:outline-none focus:border-gray-500 placeholder:text-gray-500 placeholder:italic"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
          </div>

          <div className="w-full mb-4">
            <label className="block mb-1 font-medium" htmlFor="role">Role</label>
            <select
              className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
              name="role"
              onChange={handleChange}
            >
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button className="w-full p-2 mt-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition">
            Register
          </button>
        </form>

      </div>
    </div>
  );
};

export default Register;
