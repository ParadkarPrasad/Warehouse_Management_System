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
    <div className="pt-10">
      <h2 className="text-center">Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="flex justify-center px-4">
        <form onSubmit={handleSubmit} className="flex flex-col items-start mt-6 w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
          <div className="w-full mb-4">
            <label className="block mb-1 font-medium" htmlFor="email">Email</label>
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="w-full p-2 border-2 rounded-md border-gray-300 focus:outline-none focus:border-gray-500" />
          </div>
          <div className="w-full mb-4">
            <label className="block mb-1 font-medium" htmlFor="Password">Password</label>
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="w-full p-2 border-2 rounded-md border-gray-300 focus:outline-none focus:border-gray-500" />
          </div>
          <button className="w-full p-2 mt-2 bg-black text-white font-semibold rounded-md transition cursor-pointer" type="submit">Login</button>
          <p className="text-center mt-4 text-sm">
            Don't have an account?{" "}
            <span
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Register here
            </span>
          </p>
        </form>

      </div>
    </div>
  );
};

export default Login;
