import { requestMethod } from "../../../apiUtils/constants";
import { requestModel } from "../../../apiUtils/models/requestModel";
import { axiosRepository } from "../../repository/Axios/index";
import { userEndPoints } from "../../../apiEndPoints/User/index";
import axios from "axios";

export const userService = {
  getUsers: async (body: any) => {
    const reqestObj = new requestModel();
    try {
      reqestObj.method = requestMethod.GET;
      reqestObj.url = userEndPoints.FETCH_DATA;
      return await axiosRepository.request(reqestObj);
    } catch (error) {
      console.log("error from services::>", error);
    }
  },
  createUser: async (body: any) => {
    const reqestObj = new requestModel();
    try {
      console.log("body", body);
      reqestObj.method = requestMethod.POST;
      reqestObj.url = userEndPoints.ADD_DATA;
      reqestObj.data = body;
      return await axiosRepository.request(reqestObj);
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
      return await axiosRepository.request(reqestObj);
    } catch (error) {
      console.log("error from services::>", error);
    }
  },
  deleteUser: async (body: any) => {
    const reqestObj = new requestModel();
    try {
      reqestObj.method = requestMethod.DELETE;
      reqestObj.url = userEndPoints.DELETE_DATA;
      return await axiosRepository.request(reqestObj);
    } catch (error) {
      console.log("error from services::>", error);
    }
  },
};
