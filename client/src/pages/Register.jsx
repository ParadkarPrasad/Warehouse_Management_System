import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    console.log({ name, email, password })
    navigate('/login');
  }

  return (

    <>
      <div className="container">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input type="text" placeholder="Full Name" onChange={(e) => setName(e.target.value)} required />
          <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Register</button>
        </form>
      </div>
    </>
  )
}

export default Register