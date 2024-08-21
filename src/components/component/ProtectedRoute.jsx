import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ element }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuthentication = () => {
      const token = localStorage.getItem("usersdatatoken");
      if (token) {
        // Here you might also want to verify the token with an API if needed
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []);

  if (isAuthenticated === null) {
    // While checking authentication, you can show a loading spinner or message
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return element;
}

export default ProtectedRoute;