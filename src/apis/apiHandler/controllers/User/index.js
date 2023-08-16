import { userService } from "../../services/User/index";
import axios from "axios";
import { Item_CRUD } from "../../../../Redux/actiontype";

function getUsersData(object: any) {
  return async (dispatch) => {
    try {
      const res = await userService.getUsers(object);
      const success = res.data;
      if (res.status === 200 && success) {
        dispatch({
          type: Item_CRUD.FETCH_DATA,
          payload: res.data,
        });
      }
      if (res.status === 200 && !success) {
        const { error } = res.data;

        dispatch({
          type: Item_CRUD.FETCH_DATA,
          payload: { error },
        });
      }
    } catch (err) {
      console.log("error From controller::>", err);
    }
  };
}
function addUsersData(object: any) {
  return async (dispatch) => {
    try {
      const res = await userService.createUser(object);
      const success = res.data;
      if (res.status === 200 && success) {
        dispatch({
          type: Item_CRUD.ADD_DATA,
          payload: res.data,
        });
      }
      if (res.status === 200 && !success) {
        const { error } = res.data;

        dispatch({
          type: Item_CRUD.ADD_DATA,
          payload: { error },
        });
      }
    } catch (err) {
      console.log("error From controller::>", err);
    }
  };
}

export { getUsersData, addUsersData };
