import { requestMethod } from "../../../apiUtils/constants";
import { requestModel } from "../../../apiUtils/models/requestModel";
import { axiosRepository } from "../../repository/Axios/index";
import { loginEndPoints } from "../../../apiEndPoints/Authentication/index";

export const loginService = {
  Login: async (body: any) => {
    const reqestObj = new requestModel();
    try {
      reqestObj.method = requestMethod.POST;
      reqestObj.url = loginEndPoints.LOGIN;
      reqestObj.data = body;
      return await axiosRepository.request(reqestObj);
    } catch (error) {
      console.log("error from services::>", error);
    }
  },
};
