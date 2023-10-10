import { loginService } from "../../services/Authentication/index";
import { Item_CRUD } from "../../../../Redux/actiontype";

function LoginAction(object: any) {
  return async (dispatch) => {
    try {
      const res = await loginService.Login(object);
      const success = res.data;
      return res.data;
    } catch (err) {
      console.log("error From controller::>", err);
    }
  };
}

export { LoginAction };
