import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import QueueIcon from "@material-ui/icons/Queue";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import NoDeliveryBoysFound from "../../assets/images/no-delivery-boy.webp";
import DeliveryBoysTable from "./DeliveryBoysTable";
import getDeliveryBoys from "./getDeliveryBoys";
import AddDeliveryBoyModal from "./AddDeliveryBoyModal";
import {
  useDeliveryBoys,
  useDeliveryBoysUpdate,
} from "../../contexts/DeliveryBoysContext";
import CustomSnackbar from "../CustomSnackbar/CustomSnackbar";

const DeliveryBoys = ({ from }) => {
  const deliveryBoys = useDeliveryBoys();
  const updateDeliveryBoys = useDeliveryBoysUpdate();
  const [loading, setLoading] = useState(true);
  const [addDeliveryBoyOpen, setAddDeliveryBoyOpen] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");

  useEffect(() => {
    getAllDeliveryBoys();
    setTimeout(() => {
      setLoading(false);
    }, 500);

    async function getAllDeliveryBoys() {
      const deliveryBoys = await getDeliveryBoys();
      updateDeliveryBoys(deliveryBoys);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={deliveryBoysPage}>
      {loading ? (
        <div style={loadingContainer}>
          <CircularProgress />
        </div>
      ) : deliveryBoys ? (
        <DeliveryBoysTable
          setShowSnackbar={setShowSnackbar}
          setSnackbarMessage={setSnackbarMessage}
          setSnackbarSeverity={setSnackbarSeverity}
        />
      ) : (
        <div style={noDeliveryBoysFoundContainer}>
          <img src={NoDeliveryBoysFound} alt={"no delivery boys found"} />
          <Typography variant="h6" component="h6">
            No delivery boys found
          </Typography>
          <Button
            color="primary"
            variant="contained"
            size="large"
            style={addButton}
            onClick={() => setAddDeliveryBoyOpen(true)}
            startIcon={<QueueIcon />}
          >
            Add
          </Button>
          <AddDeliveryBoyModal
            addDeliveryBoyOpen={addDeliveryBoyOpen}
            setAddDeliveryBoyOpen={setAddDeliveryBoyOpen}
            setShowSnackbar={setShowSnackbar}
            setSnackbarMessage={setSnackbarMessage}
            setSnackbarSeverity={setSnackbarSeverity}
          />
        </div>
      )}

      {from === "delete" && (
        <CustomSnackbar
          message="Delivery boy deleted successfully"
          severity="success"
        />
      )}

      {showSnackbar && (
        <CustomSnackbar message={snackbarMessage} severity={snackbarSeverity} />
      )}
    </div>
  );
};

export default DeliveryBoys;

const deliveryBoysPage = {
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
const noDeliveryBoysFoundContainer = {
  height: "80vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};
const addButton = {
  width: "150px",
  marginTop: "1rem",
};
