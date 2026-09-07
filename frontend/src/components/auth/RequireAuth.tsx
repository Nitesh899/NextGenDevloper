import {
  Navigate,
  useLocation,
} from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import AuthLoading from "../AuthLoading";

interface RequireAuthProps {
  children: React.ReactNode;
}

export default function RequireAuth({
  children,
}: RequireAuthProps) {
  const {
    isAuthenticated,
    isLoading,
  } = useAuth();

  const location = useLocation();

  // Authentication status check ho raha hai
  if (isLoading) {
    return <AuthLoading />;
  }

  // Login nahi hai → Login page
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  // Login hai → requested service/action
  return <>{children}</>;
}