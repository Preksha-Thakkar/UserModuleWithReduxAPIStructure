import { requestInterface } from "../../../apiUtils/interfacesAndTypes.js";
import { api } from "./interceptors";
import axios from "axios";

export const axiosRepository = {
  request: async (requestModal: requestInterface) =>
    await api.request(JSON.parse(JSON.stringify(requestModal))),
};
