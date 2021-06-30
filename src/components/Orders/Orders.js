import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import NoOrdersFound from "../../assets/images/no-orders.webp";
import getOrders from "./getOrders";
import OrdersTable from "./OrdersTable";
import { useOrders, useOrdersUpdate } from "../../contexts/OrdersContext";
import CustomSnackbar from "../CustomSnackbar/CustomSnackbar";

const Orders = () => {
  const orders = useOrders();
  const updateOrders = useOrdersUpdate();
  const [loading, setLoading] = useState(true);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");

  useEffect(() => {
    getAllOrders();
    setTimeout(() => {
      setLoading(false);
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getAllOrders() {
    const orders = await getOrders();
    updateOrders(orders);
  }

  return (
    <div style={ordersPage}>
      {loading ? (
        <div style={loadingContainer}>
          <CircularProgress />
        </div>
      ) : orders ? (
        <OrdersTable
          setShowSnackbar={setShowSnackbar}
          setSnackbarMessage={setSnackbarMessage}
          setSnackbarSeverity={setSnackbarSeverity}
        />
      ) : (
        <div style={noOrdersFoundContainer}>
          <img src={NoOrdersFound} alt={"no orders found"} />
          <Typography variant="h6" component="h6">
            No orders found
          </Typography>
        </div>
      )}
      {showSnackbar && (
        <CustomSnackbar message={snackbarMessage} severity={snackbarSeverity} />
      )}
    </div>
  );
};

export default Orders;

const ordersPage = {
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
const noOrdersFoundContainer = {
  height: "80vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};
