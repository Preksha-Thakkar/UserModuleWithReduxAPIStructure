import "./App.css";
import { Route, Routes, NavLink } from "react-router-dom";
import { Home } from "./Pages/Home";
import { NotFound } from "./Pages/NotFound";
import { useState } from "react";
import "./style.css";
import GuardedRoute from "./GuardedRoute";
import { AuthProvider, useAuth } from "./Pages/Auth";
import { Login } from "./Pages/Login";
import { RequiredAuth } from "./Pages/RequiredAuth";
import { LayoutMenu } from "./Pages/LayoutMenu";
import { GetUsers } from "./Pages/GetUsers";

function App() {
  const [isAutheticated, setisAutheticated] = useState(false);
  const auth = useAuth();
  return (
    <AuthProvider>
      <Routes>
        <Route element={<LayoutMenu />}>
          <Route
            path="/home"
            element={
              <RequiredAuth>
                <Home />
              </RequiredAuth>
            }
          />
          <Route
            path="/users"
            element={
              <RequiredAuth>
                <GetUsers />
              </RequiredAuth>
            }
          ></Route>
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
