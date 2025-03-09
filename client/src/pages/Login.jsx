import React from 'react'
import { useState } from 'react'
import { loginUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await loginUser(formData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      alert("Login Successful");
      navigate("/dashboard");

    } catch (err) {
      setError(err.message || "Invalid credentials");
    }
  }
  return (
    <>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" name='email' placeholder='Email' onChange={handleChange} required />
        <input type="password" name='password' placeholder='Password' onChange={handleChange} required />
        <button type='submit'>Logn</button>
      </form>
    </>
  )
}

export default Login