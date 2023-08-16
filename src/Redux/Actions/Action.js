import { Item_CRUD } from "../actiontype";
import axios from "axios";
const token = localStorage.getItem("BearerToken");
const client = axios.create({
  baseURL: "https://paybevdevapi.azurewebsites.net/api/",
  headers: {
    Authorization: "Bearer " + token,
    // siteid: "1eac5e58-34cf-4117-b8e3-d1ebf33e0c15",
  },
});
const AddItemAction = () => {
  return {
    type: Item_CRUD.ADD_ITEM,
    payload: {
      id: "1",
      name: "Preksha",
    },
  };
};
const RemoveItemAction = () => {
  return {
    type: Item_CRUD.REMOVE_ITEM,
  };
};
function FetchDataAction() {
  return async (dispatch) => {
    const res = await client.get("User/GetRecords", {
      params: {
        searchText: "",
        sortField: "CreatedOn",
        sortBy: "desc",
        page: 1,
        pageSize: 10,
        filterByStatus: "All",
      },
    });
    dispatch({
      type: Item_CRUD.FETCH_DATA,
      payload: res.data,
    });
  };
}
function UpdateUser(requestbody) {
  return async (dispatch) => {
    const res = await client.post("User/UpdateUser", requestbody);
    dispatch({
      type: Item_CRUD.UPDATE_DATA,
      payload: res.data,
    });
  };
}
function DeleteUser(Id) {
  return async (dispatch) => {
    const res = await client.delete(`User/DeleteRecord/${Id}`);
    dispatch({
      type: Item_CRUD.DELETE_DATA,
      payload: Id,
    });
  };
}
async function AddUser(requestbody) {
  return async (dispatch) => {
    const res = await client.post("User/CreateUser", requestbody);
    dispatch({
      type: Item_CRUD.ADD_DATA,
      payload: res.data,
    });
  };
}

export {
  AddItemAction,
  RemoveItemAction,
  FetchDataAction,
  UpdateUser,
  AddUser,
  DeleteUser,
};
