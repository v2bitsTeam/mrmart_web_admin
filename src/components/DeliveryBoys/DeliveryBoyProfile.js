import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import DeliveryBoyDetails from "./DeliveryBoyDetails";
import DeliveryBoyOrdersTable from "./DeliveryBoyOrdersTable";
import getDeliveryBoyOrders from "./getDeliveryBoyOrders.js";
import {
  useDeliveryBoyOrders,
  useDeliveryBoyOrdersUpdate,
} from "../../contexts/DeliveryBoyOrdersContext";
import CustomSnackbar from "../CustomSnackbar/CustomSnackbar";
import IconButton from "@material-ui/core/IconButton";
import GoBackIcon from "@material-ui/icons/KeyboardBackspace";
import { Link } from "react-router-dom";

const DeliveryBoyProfile = ({ deliveryBoyId }) => {
  const deliveryBoyOrders = useDeliveryBoyOrders();
  const updateDeliveryBoyOrders = useDeliveryBoyOrdersUpdate();
  let deliveryBoy = JSON.parse(localStorage.getItem("deliveryBoy"));
  const [loading, setLoading] = useState(true);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");

  useEffect(() => {
    getAllDeliveryBoyOrders();
    setTimeout(() => {
      setLoading(false);
    }, 200);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getAllDeliveryBoyOrders() {
    const deliveryBoyOrders = await getDeliveryBoyOrders(deliveryBoyId);
    updateDeliveryBoyOrders(deliveryBoyOrders);
  }

  return (
    <div style={deliveryBoyProfilePage}>
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
              to={"/deliveryBoys"}
            >
              <GoBackIcon color="action" />
            </IconButton>
          </div>
          <DeliveryBoyDetails
            setShowSnackbar={setShowSnackbar}
            setSnackbarMessage={setSnackbarMessage}
            setSnackbarSeverity={setSnackbarSeverity}
          />
          {deliveryBoyOrders ? (
            <DeliveryBoyOrdersTable />
          ) : (
            <div style={noDataContainer}>
              <Typography variant="h6" component="h6">
                {deliveryBoy.name} haven't delivered any orders yet.{" "}
              </Typography>
            </div>
          )}
        </div>
      )}
      {showSnackbar && (
        <CustomSnackbar message={snackbarMessage} severity={snackbarSeverity} />
      )}
    </div>
  );
};

export default DeliveryBoyProfile;

const deliveryBoyProfilePage = {
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
