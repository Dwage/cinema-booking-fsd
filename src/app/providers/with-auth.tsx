import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { checkAuthStatus } from "@/shared/api/auth";

export const ProtectedRoute: React.FC = () => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    let isMounted = true;
    checkAuthStatus().then((result) => {
      console.log("Auth Check Result in ProtectedRoute:", result);
      if (isMounted) {
        setIsAuth(result.isAuthenticated);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  if (isAuth === null) {
    return <div>Loading authentication status...</div>;
  }

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
