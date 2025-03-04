import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log({ email, password })
    navigate('/dashboard')

  }
  return (
    <>
      <div className="container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          </div>
        </form>
      </div>
    </>
  )
}

export default Login