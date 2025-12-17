import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { data, isLoading, isError } = useAuth();

  if (isLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (isError || !data) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
