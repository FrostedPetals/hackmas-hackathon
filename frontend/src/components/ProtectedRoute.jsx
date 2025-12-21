// ProtectedRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { loggedinContext } from "../contexts/LoggedinProvider.jsx";

export default function ProtectedRoute({ children }) {
  const { loggedin, loading } = useContext(loggedinContext);

  if (loading) {
    return <div>Checking session...</div>;
  }

  if (!loggedin) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

