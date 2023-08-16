import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
// import { Redirect } from "react-router-dom";

const GuardedRoute = ({ component: Component, auth, ...rest }) => (
  <Routes>
    <Route
      {...rest}
      render={(props) =>
        auth === true ? <Component {...props} /> : <Navigate to="/" replace />
      }
    />
  </Routes>
);

export default GuardedRoute;
