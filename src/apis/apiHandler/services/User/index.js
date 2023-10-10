import { requestMethod } from "../../../apiUtils/constants";
import { requestModel } from "../../../apiUtils/models/requestModel";
import { axiosRepository } from "../../repository/Axios/index";
import { userEndPoints } from "../../../apiEndPoints/User/index";
import axios from "axios";

export const userService = {
  getUsers: async (
    searchText,
    sortField,
    page,
    pageSize,
    sortBy,
    filterByStatus,
    siteId
  ) => {
    const reqestObj = new requestModel();
    try {
      reqestObj.method = requestMethod.GET;
      reqestObj.url = userEndPoints.FETCH_DATA(
        searchText,
        sortField,
        page,
        pageSize,
        sortBy,
        filterByStatus,
        siteId
      );
      return await callAPI(reqestObj);
    } catch (error) {
      console.log("error from services::>", error);
    }
  },
  createUser: async (body: any) => {
    const reqestObj = new requestModel();
    try {
      reqestObj.method = requestMethod.POST;
      reqestObj.url = userEndPoints.ADD_DATA;
      reqestObj.data = body;
      return await callAPI(reqestObj);
    } catch (error) {
      console.log("error from services::>", error);
    }
  },
  updateUser: async (body: any) => {
    const reqestObj = new requestModel();
    try {
      reqestObj.method = requestMethod.POST;
      reqestObj.url = userEndPoints.UPDATE_DATA;
      reqestObj.data = body;
      return await callAPI(reqestObj);
    } catch (error) {
      console.log("error from services::>", error);
    }
  },
  deleteUser: async (userId: any) => {
    const reqestObj = new requestModel();
    try {
      reqestObj.method = requestMethod.DELETE;
      reqestObj.url = userEndPoints.DELETE_DATA(userId);
      return await callAPI(reqestObj);
    } catch (error) {
      console.log("error from services::>", error);
    }
  },
};
function callAPI(requestObj) {
  return axiosRepository.request(requestObj);
}
