import React from "react";
import { Navigate } from "react-router-dom";

export function PrivateRoute({ children }: any) {
  const acess = localStorage.getItem("accessToken");
  console.log("accessToken", acess);

  return acess ? children : <Navigate to="/login" />;
}
