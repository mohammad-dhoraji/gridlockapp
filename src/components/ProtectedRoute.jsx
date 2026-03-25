import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import Loader from "./Loader";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader fullScreen />;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
