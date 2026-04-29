import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { isBoneyardCapture } from "../lib/isBoneyardCapture";
import RouteGateLoader from "./RouteGateLoader";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  // Only allow capture mode in non-production environments via secure build-time flag
  const captureMode = process.env.NODE_ENV === 'development' && isBoneyardCapture();

  if (captureMode) {
    return children;
  }

  if (loading) {
    return <RouteGateLoader subtitle="Checking your session..." />;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
