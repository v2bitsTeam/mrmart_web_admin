import React, { useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import addPincode from "./addPincode";
import getPincodes from "./getPincodes";
import { usePincodesUpdate } from "../../contexts/PincodesContext";

const AddPincodeModal = ({
  addPincodeOpen,
  setAddPincodeOpen,
  setShowSnackbar,
  setSnackbarMessage,
  setSnackbarSeverity,
}) => {
  const updatePincodes = usePincodesUpdate();
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");

  const [pincodeError, setPincodeError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [uploading, setUploading] = useState(false);
  const classes = useStyles();

  const clearInputs = () => {
    setPincode("");
    setAddress("");
  };

  const clearErrors = () => {
    setPincodeError(null);
    setAddressError(null);
  };

  async function getAllPincodes() {
    const Pincodes = await getPincodes();
    updatePincodes(Pincodes);
  }

  function updateSnackbar(message, severity) {
    setShowSnackbar(true);
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
  }

  async function handleAddPincodeSubmit() {
    let validString = /^[a-zA-Z][a-zA-Z\s][a-zA-Z\s]*$/;
    if (pincode.length === 0) {
      setPincodeError("Pincode is required");
      return;
    }
    if (isNaN(pincode) || pincode.length !== 6) {
      setPincodeError("Invalid Pincode");
      return;
    }
    if (address.length === 0) {
      setAddressError("Address is required");
      return;
    }
    if (!address.match(validString)) {
      setAddressError("Invalid Address");
      return;
    }

    clearInputs();
    setUploading(true);

    const response = await addPincode(pincode, address);
    setUploading(false);
    setShowSnackbar(false);

    if (response.status) {
      getAllPincodes();
      setAddPincodeOpen(false);
      setTimeout(() => {
        updateSnackbar("Pincode added successfully", "success");
      }, 0);
      return;
    }
    setTimeout(() => {
      updateSnackbar(response.message, "error");
    }, 0);
  }
  return (
    <>
      <Dialog
        maxWidth="sm"
        fullWidth
        open={addPincodeOpen}
        onClose={() => setAddPincodeOpen(false)}
      >
        <DialogTitle id="form-dialog-title">
          <div className={classes.title}>
            <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
              Add New Pincode
            </Typography>
            <Button color="secondary" onClick={() => setAddPincodeOpen(false)}>
              <CloseIcon />
            </Button>
          </div>
        </DialogTitle>
        <DialogContent dividers>
          <Container className={classes.dialogContainer}>
            <TextField
              required
              label="Pincode"
              variant="outlined"
              value={pincode}
              size="medium"
              className={classes.flexgroup1}
              error={pincodeError ? true : false}
              helperText={pincodeError}
              onClick={clearErrors}
              fullWidth
              onChange={(e) => setPincode(e.target.value)}
            />
          </Container>
          <Container className={classes.dialogContainer}>
            <TextField
              required
              label="Address"
              variant="outlined"
              value={address}
              size="medium"
              className={classes.flexgroup1}
              error={addressError ? true : false}
              helperText={addressError}
              onClick={clearErrors}
              fullWidth
              onChange={(e) => setAddress(e.target.value)}
            />
          </Container>

          <div
            className="input-fields-arranger"
            style={uploading ? { display: "block" } : { display: "none" }}
          >
            <br />
            <LinearProgress />
            <br />
          </div>
          <Container className={classes.dialogContainer}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              disabled={uploading ? true : false}
              startIcon={<AddIcon />}
              onClick={handleAddPincodeSubmit}
            >
              Add
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => {
                clearInputs();
                clearErrors();
              }}
            >
              Clear
            </Button>
          </Container>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddPincodeModal;

const useStyles = makeStyles({
  dialogContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    gap: "2em",
    marginBottom: "2em",
  },
  title: {
    display: "flex",
  },
  flexgroup1: {
    flex: "auto",
  },
  addImage: {
    width: "100%",
  },
});
