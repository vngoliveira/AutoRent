import React from "react";
import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("user");
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default AuthGuard;
