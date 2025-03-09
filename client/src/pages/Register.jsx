import React from 'react'
import { useState } from 'react';
import { registerUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "staff"
  })

  // State to store error message
  const [error, setError] = useState("");

  // useNavigate to redirect the users
  const navigate = useNavigate();

  // function to handle input changes in the form fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await registerUser(formData);
      alert("Registration successful! Please Login.");
      navigate("/login");
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  }

  return (

    <>
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/*Registration form */}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="text" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />

        {/* Dropdown to select user role (Staff or Admin) */}
        <select name="role" onChange={handleChange}>
          <option value="staff">Staff</option>
          <option value="admin">Admin</option>
        </select>

        <button type='submit'>Register</button>
      </form>
    </>
  )
}

export default Register