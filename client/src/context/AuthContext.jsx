import React, { createContext, useState, useEffect } from "react";
import itemApi from "../services/itemApi";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
      itemApi.setToken(storedToken);
    }
    setIsLoading(false);
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    setUser(userData);
    // console.log(userData);
    setIsAuthenticated(true);
    itemApi.setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
    itemApi.setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated, logout, login, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
