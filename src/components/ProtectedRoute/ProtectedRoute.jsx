import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();

  // If the user is not authenticated, redirect to the sign‑in page.
  if (!currentUser) {
    return <Navigate to="/signin" />;
  }

  // Otherwise, render the children (protected components).
  return children;
};

export default ProtectedRoute;
