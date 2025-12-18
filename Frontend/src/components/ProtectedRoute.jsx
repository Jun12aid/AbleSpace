import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return null; // or loader
  }

  // ❌ not logged in → go to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ✅ logged in & trying to access login/register → redirect
  if (
    user &&
    (location.pathname === "/login" ||
      location.pathname === "/register")
  ) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
