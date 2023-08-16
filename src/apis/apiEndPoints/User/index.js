export const userEndPoints = {
  // INSERT_PRODUCT: "todos",
  FETCH_DATA: "User/GetRecords",
  UPDATE_DATA: "User/UpdateUser",
  ADD_DATA: "User/CreateUser",
  DELETE_DATA: "User/DeleteRecord",
  GET_PRODUCT: (limit) => `/Product?limit=${limit}`,
};
