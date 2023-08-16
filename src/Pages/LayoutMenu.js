import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Breadcrumb, Layout, Menu, theme } from "antd";

import { useAuth } from "./Auth";

const { Header, Content, Sider } = Layout;
export const LayoutMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  return (
    <>
      <div>
        <div className="logo" />
        <Menu
          onClick={({ key }) => {
            if (key != "/logout") {
              navigate(key);
            } else {
              auth.logout();
              navigate("/", { replace: true });
            }
          }}
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[location.pathname]}
          items={[
            {
              key: "/home",
              label: "Home",
            },
            {
              key: "/users",
              label: "Users",
            },
            {
              key: "/logout",
              label: "logout",
            },
          ]}
        />
        <Content />
      </div>
      <Outlet />
    </>
  );
};
