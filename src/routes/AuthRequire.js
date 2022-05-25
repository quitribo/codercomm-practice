// Add logic to protect content , user need to login otw navigate to login page.
// AuthRequire only affects logic not UI

import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LoadingScreen from "../components/LoadingScreen";

function AuthRequire({ children }) {
  const { isInitialized, isAuthenticated } = useAuth();
  const location = useLocation(); // save the location where user wanna be at,

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    // return user to prev location check https://reactrouter.com/docs/en/v6/components/navigate

    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default AuthRequire;
