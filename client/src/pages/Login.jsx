import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { loginThunk } from "../reducers/authReducer";
// import { useContext } from "react";
const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  // Access Redux State
  const { user, loading, error, isAuthenticated } = useSelector((state) => state.auth)


  // For dispatching loginThunk
  const dispatch = useDispatch();

  // Navigation
  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginThunk(formData));
  };

  // Redirect user after successful login
  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(user.role === "admin" ? "/admin-dashboard" : "/dashboard");
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="form-container">
      <h2 className="login-heading">Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="form-layout" >
        <form className="form-login" onSubmit={handleSubmit} >
          <div className="form-items" >
            <label htmlFor="email">Email</label>
            <input className="input-box" type="email" name="email" placeholder="Email" onChange={handleChange} required />
          </div>
          <div className="form-items">
            <label htmlFor="Password">Password</label>
            <input className="input-box" type="password" name="password" placeholder="Password" onChange={handleChange} required />
          </div>
          <button className="login-button" type="submit" disabled={loading}>{loading ? "Logging in" : "Login"}</button>
          <p>
            Don't have an account?{" "}
            <span className="redirect"
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
