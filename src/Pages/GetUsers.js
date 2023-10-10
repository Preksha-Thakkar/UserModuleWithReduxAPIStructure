import axios from "axios";
import { useEffect, useState, Tooltip } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { AddUpdateUser } from "../Components/AddUpdateUser";
import {
  AddItemAction,
  RemoveItemAction,
  FetchDataAction,
  DeleteUser,
} from "../Redux/Actions/Action";
import { useDispatch, useSelector } from "react-redux";
import store from "../Redux/Store/Store";
import {
  deleteUsersData,
  getUsersData,
} from "../apis/apiHandler/controllers/User";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from "@mui/material";
import { Button } from "@mui/material";

export const GetUsers = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [items, setItems] = useState([]);
  const [sites, setSites] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedUserData, setClickedUserData] = useState();
  const [totalRecords, setTotalRecords] = useState(0);
  const [page, setPage] = useState(0);
  let searchText = "";
  let sortBy = "desc";
  let sortField = "CreatedOn";
  // let page = 1;
  let pageSize = 20;
  let filterByStatus = "All";
  let siteId = "3244057e-6972-452a-b62e-203a2c5e907a";

  useEffect(() => {
    // dispatch(FetchDataAction());
    dispatch(
      getUsersData(
        searchText,
        sortField,
        page,
        pageSize,
        sortBy,
        filterByStatus,
        siteId
      )
    );
  }, []);
  useEffect(() => {
    setIsLoaded(true);
    setIsModalOpen(false);
    setTotalRecords(state.fetchData?.result?.totalRecord);
  }, [state]);
  const addNewUser = () => {
    setClickedUserData(null);
    setIsModalOpen(true);
  };
  const formDataCallBack = (childdata) => {};
  const deleteUser = async (userId) => {
    let deletedela = await dispatch(deleteUsersData(userId));
  };
  const editUser = (user) => {
    setClickedUserData(user);
    setIsModalOpen(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        {isModalOpen ? (
          <AddUpdateUser
            showModal={isModalOpen}
            close={() => setIsModalOpen(false)}
            formDataCallBack={formDataCallBack}
            currentUserData={clickedUserData}
          />
        ) : (
          ""
        )}
        <div className="d-flex justify-space-between align-i-c mr-1">
          <h1>This is Users</h1>

          <Button onClick={addNewUser} variant="contained">
            Add New
          </Button>
        </div>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell className="text-left">Name</TableCell>
              <TableCell className="text-left">Role</TableCell>
              <TableCell className="text-left">Email</TableCell>
              <TableCell className="text-left">Sites</TableCell>
              <TableCell className="text-left">Status</TableCell>
              <TableCell className="text-left">Acion</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.fetchData?.result?.records.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.firstName + " " + item.lastName}</TableCell>
                <TableCell>{item.roles}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>
                  <span>
                    {item.sites.map((site) => (
                      <span key={site.id}>
                        {site.name}
                        {site.id != item.sites[item.sites.length - 1].id
                          ? ", "
                          : ""}
                      </span>
                    ))}
                  </span>
                </TableCell>

                <TableCell>
                  {item.invitationStatus == 1
                    ? "Invited"
                    : item.invitationStatus == 2
                    ? "Active"
                    : "Inactive"}
                </TableCell>
                <TableCell>
                  <a onClick={() => editUser(item)}>
                    <EditOutlined />
                  </a>
                  <a onClick={() => deleteUser(item.id)}>
                    <DeleteOutlined />
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={totalRecords ? totalRecords : 0}
          rowsPerPage={10}
          page={!totalRecords || totalRecords <= 0 ? 0 : page}
          onPageChange={handleChangePage}
        />
      </>
    );
  }
};
