import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../UserContext";

const AuthGuard = ({ children, requiredRole }) => {
  const { user } = useUser();
  console.log(user)

  console.log(user.userId)
  console.log(user.id)

  if (!user.userId) {
    console.log("ui")
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default AuthGuard;
