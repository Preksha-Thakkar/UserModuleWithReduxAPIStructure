import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Breadcrumb, Layout, Menu, theme } from "antd";

import { useAuth } from "./Auth";
import MenuItem from "antd/es/menu/MenuItem";

const { Header, Content, Sider } = Layout;
export const LayoutMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  return (
    <>
      <div>
        {/* <div className="logo" /> */}
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
        >
          <Menu.Item key="/home">Home</Menu.Item>
          <Menu.Item key="/users">Users</Menu.Item>
          <Menu.Item key="/logout" className="logout-btn">
            Logout
          </Menu.Item>
        </Menu>
        <Content />
      </div>
      <Outlet />
    </>
  );
};
