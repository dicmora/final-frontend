import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn, onAuthRequired, children }) => {
  useEffect(() => {
    if (!isLoggedIn) {
      onAuthRequired?.();
    }
  }, [isLoggedIn, onAuthRequired]);

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
