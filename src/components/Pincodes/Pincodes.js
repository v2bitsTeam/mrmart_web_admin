import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import QueueIcon from "@material-ui/icons/Queue";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import NoPincodesFound from "../../assets/images/no-pincodes.webp";
import PincodesTable from "./PincodesTable";
import getPincodes from "./getPincodes";
import AddPincodeModal from "./AddPincodeModal";
import { usePincodes, usePincodesUpdate } from "../../contexts/PincodesContext";
import CustomSnackbar from "../CustomSnackbar/CustomSnackbar";

const Pincodes = () => {
  const pincodes = usePincodes();
  const updatePincodes = usePincodesUpdate();
  const [loading, setLoading] = useState(true);
  const [addPincodeOpen, setAddPincodeOpen] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");

  useEffect(() => {
    getAllPincodes();
    setTimeout(() => {
      setLoading(false);
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getAllPincodes() {
    const pincodes = await getPincodes();
    updatePincodes(pincodes);
  }

  return (
    <div style={pincodesPage}>
      {loading ? (
        <div style={loadingContainer}>
          <CircularProgress />
        </div>
      ) : pincodes ? (
        <PincodesTable
          setShowSnackbar={setShowSnackbar}
          setSnackbarMessage={setSnackbarMessage}
          setSnackbarSeverity={setSnackbarSeverity}
        />
      ) : (
        <div style={noPincodesFoundContainer}>
          <img src={NoPincodesFound} alt={"no pincodes found"} style={logo} />
          <Typography variant="h6" component="h6">
            No pincodes found
          </Typography>
          <Button
            color="primary"
            variant="contained"
            size="large"
            style={addButton}
            onClick={() => setAddPincodeOpen(true)}
            startIcon={<QueueIcon />}
          >
            Add
          </Button>
          <AddPincodeModal
            addPincodeOpen={addPincodeOpen}
            setAddPincodeOpen={setAddPincodeOpen}
            setShowSnackbar={setShowSnackbar}
            setSnackbarMessage={setSnackbarMessage}
            setSnackbarSeverity={setSnackbarSeverity}
          />
        </div>
      )}
      {showSnackbar && (
        <CustomSnackbar message={snackbarMessage} severity={snackbarSeverity} />
      )}
    </div>
  );
};

export default Pincodes;

const pincodesPage = {
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
const noPincodesFoundContainer = {
  marginTop: "6vh",
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
const logo = {
  height: "50vw",
  objectFit: "contain",
  borderRadius: "50%",
  marginBottom: "1rem",
};
