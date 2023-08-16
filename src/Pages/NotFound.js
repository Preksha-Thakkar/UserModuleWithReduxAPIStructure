import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export function NotFound() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/", { state: "Error, no page!" });
    }, 1000);
  }, []);
  // navigate(-1)
  return (
    <>
      <h1>This is NotFound</h1>
      {/* <Navigate to="/">Go to home</Navigate> */}
    </>
  );
}
