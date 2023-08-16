// import { useState } from "react";
//, useNavigate, useLocation
import { Navigate } from "react-router-dom";

export const RequiredAuth = ({ children }) => {
  // const location = useLocation();

  let token = localStorage.getItem("BearerToken");
  if (!token) {
    return (
      //state={{ path: location.pathname }}
      <Navigate to="/"></Navigate>
    );
  }
  return children;
};
