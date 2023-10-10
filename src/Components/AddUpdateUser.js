import {
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  TreeSelect,
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { json } from "react-router-dom";
import {
  addUsersData,
  updateUsersData,
} from "../apis/apiHandler/controllers/User";
// import { UpdateUser, AddUser } from "../Redux/Actions/Action";
// const { Column, ColumnGroup } = Table;
const token = localStorage.getItem("BearerToken");

const client = axios.create({
  baseURL: "https://paybevdevapi.azurewebsites.net/api/",
  headers: {
    Authorization: "Bearer " + token,
    siteid: "3244057e-6972-452a-b62e-203a2c5e907a",
  },
});
export const AddUpdateUser = (props) => {
  let currentUserSites = [];
  const data = "This is data from Child Component to the Parent Component.";
  const [form] = Form.useForm();
  const [allSites, setAllSites] = useState([]);
  const [roles, setRoles] = useState([]);
  const [userData, setUserData] = useState();
  const dispatch = useDispatch();
  let currentUserData = {
    firstName: "",
    lastName: "",
    role: "",
    sites: [],
    email: "",
    phoneNumber: "",
  };
  let siteRecords = [];
  if (props.currentUserData) {
    currentUserData = props.currentUserData;
    if (props.currentUserData.sites.length) {
      currentUserSites = props.currentUserData.sites.map((site) => site.id);
    }
  }

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  //validations to inputs
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  // page gets loaded
  useEffect(() => {
    client
      .post("Sites/GetSite")
      .then((response) => {
        siteRecords = response.data.result;
        let treesiteParent = [
          {
            title: "All",
            value: "all",
            key: "all",
            children: response.data.result.map((site) => {
              return {
                title: site.parent,
                value: site.children[0].accountId,
                key: site.children[0].accountId,
                children: site.children.map((child) => {
                  return { title: child.name, key: child.id, value: child.id };
                }),
              };
            }),
          },
        ];
        setAllSites(treesiteParent);
      })
      .catch(() => {});

    client
      .get(`User/GetRoles`)
      .then((response) => {
        let paybevRoles = response.data.result.roleItems.filter(
          (x) => x.isPaybevRole == true
        );
        let roleItems = paybevRoles.map((role) => {
          if (role.isPaybevRole) {
            return {
              label: role.name,
              value: role.id,
            };
          }
        });
        setRoles(roleItems);
      })
      .catch((error) => {});
  }, []);

  //on click ok
  const onFinish = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        onCreate(values);
        props = props.close;
      })
      .catch((info) => {});
  };

  //on click cancel
  const cancelForm = () => {
    form.resetFields();
  };

  //to create new user through api
  const onCreate = async (values) => {
    let formValues = values.user;
    let selectedSites = [];
    var reqBody = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      role: formValues.role,
      agency: JSON.parse(localStorage.getItem("UserInfo")).agency,
      twoFactorEnabled: true,
      phoneNumber: formValues.phoneNumber,
      isForcePasswordChange: true,
      sites: [
        {
          id: "3244057e-6972-452a-b62e-203a2c5e907a",
          name: "Keurig",
        },
      ],
      accounts: [
        {
          id: "string",
          accountName: "string",
          isSelected: true,
        },
      ],
      isActive: true,
    };
    if (props.currentUserData) {
      reqBody["id"] = props.currentUserData.id;
      let updatedRecord = await dispatch(updateUsersData(reqBody));
      // onUpdate(values);
    } else {
      // let newAdddedRecord = await dispatch(await AddUser(reqBody));
      let newAdddedRecord = await dispatch(addUsersData(reqBody));
    }
    // setOpen(false);
  };

  //send data to GetUsers
  const sendDataToUsers = () => {
    props.formDataCallBack("newData");
  };

  //to update record in list
  const onUpdate = (values) => {
    let formValues = values.user;
    client
      .post("User/UpdateUser", {
        id: props.currentUserData.id,
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        email: formValues.email,
        role: formValues.role,
        agency: JSON.parse(localStorage.getItem("UserInfo")).agency,
        twoFactorEnabled: true,
        phoneNumber: formValues.phoneNumber,
        isForcePasswordChange: true,
        sites: formValues.sites.map((site) => {
          return {
            id: site,
          };
        }),
        accounts: [
          {
            id: "string",
            accountName: "string",
            isSelected: true,
          },
        ],
        isActive: true,
      })
      .then((response) => {
        setUserData(response.data.result);
        sendDataToUsers(response.data.result);
      });
  };

  return (
    <>
      <div>{props.parentToChild}</div>

      <div>
        <Button onClick={sendDataToUsers}>Click Child</Button>
      </div>

      <Modal
        title="Basic Modal"
        open={props.showModal}
        onOk={onFinish}
        onCancel={props.close}
      >
        <Form
          {...layout}
          form={form}
          name="nest-messages"
          style={{ maxWidth: 600 }}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={["user", "firstName"]}
            label="First Name"
            rules={[{ required: true }]}
            initialValue={currentUserData.firstName}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["user", "lastName"]}
            label="Last Name"
            rules={[{ required: true }]}
            initialValue={currentUserData.lastName}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["user", "email"]}
            label="Email Address"
            rules={[{ type: "email", required: true }]}
            initialValue={currentUserData.email}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["user", "phoneNumber"]}
            label="Mobile Number"
            initialValue={currentUserData.phoneNumber}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["user", "role"]}
            label="Role"
            rules={[{ required: true }]}
            initialValue={currentUserData.role}
          >
            <Select showSearch options={roles} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
