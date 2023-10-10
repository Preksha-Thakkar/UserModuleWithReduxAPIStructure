export const userEndPoints = {
  // INSERT_PRODUCT: "todos",
  FETCH_DATA: (
    searchText,
    sortField,
    page,
    pageSize,
    sortBy,
    filterByStatus,
    siteId
  ) =>
    `User/GetRecords?searchText=${searchText}&sortField=${sortField}&page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&filterByStatus=${filterByStatus}&SiteId=${siteId}`,
  UPDATE_DATA: "User/UpdateUser",
  ADD_DATA: "User/CreateUser",
  DELETE_DATA: (userId) => `User/DeleteRecord/${userId}`,
  GET_PRODUCT: (limit) => `/Product?limit=${limit}`,
};
