import { Navigate } from "react-router-dom";
import { useAuth } from "./index";

export default function ProtectedRoute({ children }) {
  const { userLoggedIn, loading } = useAuth();

  // Wait for Firebase to finish checking auth state
  if (loading) return null;

  // If not logged in → redirect to /auth
  if (!userLoggedIn) {
    return <Navigate to="/auth" replace />;
  }

  // If logged in → show the page
  return children;
}