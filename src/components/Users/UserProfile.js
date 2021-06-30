import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import UserDetails from "./UserDetails";
import UserOrdersTable from "./UserOrdersTable";
import getUserOrders from "./getUserOrders.js";
import {
  useUserOrders,
  useUserOrdersUpdate,
} from "../../contexts/UserOrdersContext";
import IconButton from "@material-ui/core/IconButton";
import GoBackIcon from "@material-ui/icons/KeyboardBackspace";
import { Link } from "react-router-dom";

const UserProfile = ({ userId }) => {
  const userOrders = useUserOrders();
  const updateUserOrders = useUserOrdersUpdate();
  let user = JSON.parse(localStorage.getItem("user"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllUserOrders();
    setTimeout(() => {
      setLoading(false);
    }, 200);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getAllUserOrders() {
    const userOrders = await getUserOrders(userId);
    updateUserOrders(userOrders);
  }

  return (
    <div style={userProfilePage}>
      {loading ? (
        <div style={loadingContainer}>
          <CircularProgress />
        </div>
      ) : (
        <div style={dataContainer}>
          <div style={goBack}>
            <IconButton
              aria-label="go back"
              size="small"
              component={Link}
              to={"/users"}
            >
              <GoBackIcon color="action" />
            </IconButton>
          </div>
          <UserDetails />
          {userOrders ? (
            <UserOrdersTable />
          ) : (
            <div style={noDataContainer}>
              <Typography variant="h6" component="h6">
                {user.name} hasn't placed any orders yet.{" "}
              </Typography>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfile;

const userProfilePage = {
  marginTop: "4rem",
};
const loadingContainer = {
  height: "80vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const noDataContainer = {
  height: "50vh",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};
const dataContainer = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};
const goBack = {
  width: "90vw",
  margin: "1rem auto 0.5rem",
  alignSelf: "flex-start",
};
