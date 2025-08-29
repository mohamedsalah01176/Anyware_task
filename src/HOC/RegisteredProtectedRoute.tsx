import{ type ReactNode } from "react";
import { Navigate } from "react-router";
import { getToken } from "../util/getToken";

interface ProtectedRouteProps {
  children: ReactNode ;
}

const RegisteredProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = getToken();
  console.log("token")

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }


  return children; 
};

export default RegisteredProtectedRoute;
