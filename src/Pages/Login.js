import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";
import { Button, Checkbox, Form, Input } from "antd";

export const Login = () => {
  const [user, setUser] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    auth.login(user);
    navigate("/", { replace: true });

    try {
      fetch(
        "https://paybevstagingapi.azurewebsites.net/api/Authenticate/Login",
        {
          method: "POST",
          body: JSON.stringify({
            userName: values.username,
            password: values.password,
            siteType: "BROOKLYN",
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      )
        .then((res) => res.json())
        .then(
          (response) => {
            if (response.responseStatus == 1) {
              navigate("/home");
              let usersDetails = response.result.userdetails;
              var userInfo = {
                firstName: usersDetails.firstName,
                lastName: usersDetails.lastName,
                userId: usersDetails.id,
                phoneNumber: usersDetails.phoneNumber,
                agency: usersDetails.agency,
                twoFactorEnabled: usersDetails.twoFactorEnabled,
                isForcePasswordChange: usersDetails.isForcePasswordChange,
                email: usersDetails.email,
              };
              localStorage.setItem("BearerToken", response.result.access_token);

              localStorage.setItem("UserInfo", JSON.stringify(userInfo));
              var PayBevModulesPermissions =
                response.result.userRoleDetails.permissions.filter(
                  (x) => x.moduleType == "Paybev"
                );
              localStorage.setItem(
                "RolePermissions",
                JSON.stringify(PayBevModulesPermissions)
              );
              localStorage.setItem("IsSiteSelected", JSON.stringify(false));
            } else {
              console.log("error");
            }

            //   setIsLoaded(true);
            //   setItems(result.entries);
          },
          (error) => {
            //   setIsLoaded(true);
            //   setError(error);
          }
        );
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600, padding: "50px" }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      {/* <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item> */}

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    // <div>
    //   <label>
    //     Email:{""}
    //     <input type="text" onChange={(e) => setUser(e.target.value)} />
    //   </label>
    //   <label>
    //     Password:{""}
    //     <input type="password" onChange={(e) => setUser(e.target.value)} />
    //   </label>
    //   <button onClick={handleLogin}>Login</button>
    // </div>
  );
};
