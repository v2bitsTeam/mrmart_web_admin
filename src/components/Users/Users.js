import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import NoUsersFound from "../../assets/images/no-users.webp";
import UsersTable from "./UsersTable";
import getUsers from "./getUsers";
import { useUsers, useUsersUpdate } from "../../contexts/UsersContext";

const Users = () => {
  const users = useUsers();
  const updateUsers = useUsersUpdate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllUsers();
    setTimeout(() => {
      setLoading(false);
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getAllUsers() {
    const users = await getUsers();
    updateUsers(users);
  }

  return (
    <div style={usersPage}>
      {loading ? (
        <div style={loadingContainer}>
          <CircularProgress />
        </div>
      ) : users ? (
        <UsersTable />
      ) : (
        <div style={noUsersFoundContainer}>
          <img src={NoUsersFound} alt={"no users found"} />
          <Typography variant="h6" component="h6">
            No users found
          </Typography>
        </div>
      )}
    </div>
  );
};

export default Users;

const usersPage = {
  marginTop: "4rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};
const loadingContainer = {
  height: "80vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const noUsersFoundContainer = {
  height: "80vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};
